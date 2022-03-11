/// <reference types="cypress" />

import wait from "../../../../__mocks__/wait"
import searchApiDataPageOne from "../../../../__mocks__/searchApi.page1.json"
import smartSearchApiData from "../../../../__mocks__/smartSearchApi.json"
import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const pageOne = {
    first: searchApiDataPageOne.items[0],
    last: searchApiDataPageOne.items[searchApiDataPageOne.items.length - 1],
}

TestFilter(["build"], () => {
    context("Given plp - Infinite Scroll - scroll down", function() {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.intercept("http://localhost:3009", req => {
                req.headers["test-with-local-esi"] = "true"
            })
            cy.injectAxe()
        })

        describe("By default", () => {
            beforeEach(() => {
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })
            it("should display the first page of items", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .first()
                    .should("include.text", pageOne.first.itemNumber)
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .last()
                    .should("include.text", pageOne.last.itemNumber)
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display any loading indicators", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-next-page-spinner"]')
                    .should("not.exist")
                cy.get("#plp")
                    .find('[data-testid="plp-previous-page-spinner"]')
                    .should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should have no previous page to load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                    .eq(5)
                    .scrollIntoView({duration: 500, easing: "swing"})
                cy.scrollTo("top", {duration: 1000, easing: "swing"}).wait(200)
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .wait(200)
                    .should("have.length", 24)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When loading the next page of items", () => {
            beforeEach(() => {
                cy.intercept({method: "GET", url: "/products-fragment"}, async req => {
                    // Lets wait a bit to allow the loading
                    // indicator to be shown for some time
                    await wait(750)
                    req.reply()
                })

                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })
            it("should display the next page loading indicator while loading", () => {
                cy.scrollTo("bottom", {duration: 1000, easing: "swing"})
                cy.get("#plp")
                    .find('[data-testid="plp-next-page-spinner"]')
                    .should("be.visible")
                cy.get("#plp")
                    .find('[data-testid="plp-next-page-spinner"]')
                    .should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When the next page fetch fails", () => {
            beforeEach(() => {
                cy.intercept({method: "GET", url: "/products-fragment"}, async req => {
                    // Lets wait a bit to allow the loading
                    // indicator to be shown for some time
                    await wait(500)
                    req.reply(500, "Something went wrong")
                })

                cy.visit("/search?w=Red", {
                    headers: amidoHeaders,
                    failOnStatusCode: false,
                })
            })
            it("should redirect to the /error page", () => {
                cy.scrollTo("bottom", {duration: 500})
                cy.get("#plp")
                    .find('[data-testid="plp-next-page-spinner"]')
                    .should("be.visible")
                cy.get("#plp")
                    .find('[data-testid="plp-next-page-spinner"]')
                    .should("not.exist")

                cy.location().should(loc => {
                    expect(loc.pathname).to.eq("/error")
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When scrolling down quickly in a viewport with a short height", () => {
            beforeEach(() => {
                cy.viewport(1280, 300)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })
            it("should still load the next page of items", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                cy.scrollTo("bottom", {duration: 200})
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When scrolling down in a small viewport", () => {
            beforeEach(() => {
                cy.viewport("iphone-7")
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a small viewport, there will be 2 items per row. So let's scroll to the 15th element because at this point,
                // the 19th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(15)
                    .scrollIntoView({duration: 500})
                    .wait(200)

                // Lets assert that no fetch for the next page of items took place
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // Now Lets scroll to the 17 element because that will cause the 19th element to be the last item in the viewport,
                // which means that there are only 2 more rows remaining to enter the viewport. We expect the fetch to be triggered
                // by this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(17)
                    .scrollIntoView({duration: 500})
                    .wait(200)

                // Lets assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When scrolling down in a medium sized viewport", () => {
            beforeEach(() => {
                cy.viewport("ipad-2")
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a small viewport, there will be 3 items per row. So let's scroll to the 8th element because at this point,
                // the 18th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(8)
                    .scrollIntoView({duration: 500})
                    .wait(200)

                // Lets assert that no fetch for the next page of items took place
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // Now Let's scroll to the 9th element because that will cause the 18th element to be the last item in the viewport,
                // which means that there are only 2 more rows remaining to enter the viewport. We expect the fetch to be triggered
                // by this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(9)
                    .scrollIntoView({duration: 500})
                    .wait(200)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When scrolling down in a large viewport", () => {
            beforeEach(() => {
                cy.viewport("macbook-13")
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a large viewport, there will be 4 items per row. So let's scroll to the 7th element because at this point,
                // the 15th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(7)
                    .scrollIntoView({duration: 500})
                    .wait(200)

                // Lets assert that no fetch for the next page of items took place
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // Now Let's scroll to the 10th element because that will cause the 115th element to be the last item in the viewport,
                // which means that there are only 2 more rows remaining to enter the viewport. We expect the fetch to be triggered
                // by this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(9)
                    .scrollIntoView({duration: 500})
                    .wait(200)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    context("Given - Infinite Scroll - Scroll Up", () => {
        beforeEach(() => {
            cy.viewport(1024, 500)
            cy.intercept("http://localhost:3009", req => {
                req.headers["test-with-local-esi"] = "true"
            })
            cy.injectAxe()
        })

        describe("When I request page 3 of PLP", () => {
            describe("By default", () => {
                beforeEach(() => {
                    cy.visit("/search?w=smart-search&p=3", {headers: amidoHeaders})
                    cy.wait(10)
                })

                it("should not display any loading indicators", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-next-page-spinner"]')
                        .should("not.exist")
                    cy.get("#plp")
                        .find('[data-testid="plp-previous-page-spinner"]')
                        .should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should load page 2 and 3", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 56)
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .should("include.text", smartSearchApiData.items[28].itemNumber)
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(55)
                        .should("include.text", smartSearchApiData.items[83].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should automatically scroll to the first item of the 3rd page", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .shouldNotBeInViewport()
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(55)
                        .shouldNotBeInViewport()
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(28)
                        .shouldBeInViewport()
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When I scroll up to load the previous page of items", () => {
                beforeEach(() => {
                    cy.intercept({method: "GET", url: "/products-fragment"}, async req => {
                        // Lets wait a bit to allow the loading
                        // indicator to be shown for some time
                        await wait(500)
                        req.reply()
                    })

                    cy.visit("/search?w=smart-search&p=3", {headers: amidoHeaders})
                })

                it("should display the previous page loading indicator", () => {
                    cy.scrollTo("top", {duration: 500})
                    cy.get("#plp")
                        .find('[data-testid="plp-previous-page-spinner"]')
                        .should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should load page 1 of items", () => {
                    cy.scrollTo("top", {duration: 500})
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 84)
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .should("include.text", smartSearchApiData.items[0].itemNumber)
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(83)
                        .should("include.text", smartSearchApiData.items[83].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should hide the loading indicator once loaded", () => {
                    cy.scrollTo("top", {duration: 500})
                    cy.wait(200)
                    cy.get("#plp")
                        .find('[data-testid="plp-previous-page-spinner"]')
                        .should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should keep the facets open", () => {
                    cy.scrollTo("top", {duration: 500})
                    cy.wait(500)
                    cy.get('[data-testid="plp-total-products"]').shouldBeInViewport()
                    cy.get('[data-testid="plp-facet-items"]').shouldBeInViewport()
                    cy.get('[data-testid="plp-facets-open-filters-btn"]').should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When the previous page fetch fails", () => {
                beforeEach(() => {
                    cy.intercept({method: "GET", url: "/products-fragment"}, async req => {
                        // Lets wait a bit to allow the loading
                        // indicator to be shown for some time
                        await wait(500)
                        req.reply(500, "Something went wrong")
                    })

                    cy.visit("/search?w=smart-search&p=3", {headers: amidoHeaders, failOnStatusCode: false})
                })
                it("should redirect to the /error page", () => {
                    cy.scrollTo("top", {duration: 500})
                    cy.get("#plp")
                        .find('[data-testid="plp-previous-page-spinner"]')
                        .should("be.visible")
                    cy.get("#plp")
                        .find('[data-testid="plp-previous-page-spinner"]')
                        .should("not.exist")
                    cy.location().should(loc => {
                        expect(loc.pathname).to.eq("/error")
                    })
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
    })

    context("Given - infinite scroll - position tracking", () => {
        beforeEach(() => {
            cy.viewport(1024, 500)
            cy.intercept("http://localhost:3009", req => {
                req.headers["test-with-local-esi"] = "true"
            })
            cy.injectAxe()
        })

        describe("When I scroll down to page 3 of items", () => {
            describe("and I visit whatever is the current url", () => {
                beforeEach(() => {
                    cy.visit("/search?w=smart-search&p=2", {headers: amidoHeaders})
                    cy.wait(10)
                })
                it("should reload the same page at exactly the same item I was viewing", () => {
                    cy.scrollTo("bottom", {duration: 500})

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 84)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(83)
                        .scrollIntoView({duration: 500})

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(83)
                        .should("include.text", smartSearchApiData.items[83].itemNumber)

                    cy.wait(100)

                    cy.url().then(url => {
                        // We need to visit the page at whatever the url is at this point
                        // in order to assert that the page loads at the current page and
                        // scroll position. Problem, however, is that cypress won't actually
                        // load a new page if the url is the same as the current page url. So
                        // we have to visit a different url before visiting the url we intended
                        // to visit in order to ensure that the browser actually starts a new
                        // browsing session
                        cy.visit("/search")
                        cy.visit(url, {headers: amidoHeaders})
                        cy.wait(10)
                    })

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 44)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(28)
                        .shouldBeInViewport()

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(43)
                        .should("include.text", smartSearchApiData.items[99].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When coming back to a specific page and scroll position using the back button", () => {
                beforeEach(() => {
                    cy.viewport(1024, 500)
                    cy.visit("/search?w=smart-search&p=2", {headers: amidoHeaders})
                })

                it("should open the facets", () => {
                    cy.scrollTo("bottom", {duration: 500})

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 84)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(83)
                        .scrollIntoView({duration: 500})

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(83)
                        .should("include.text", smartSearchApiData.items[83].itemNumber)

                    cy.wait(100)

                    cy.url().then(url => {
                        // We need to visit the page at whatever the url is at this point
                        // in order to assert that the page loads at the current page and
                        // scroll position. Problem, however, is that cypress won't actually
                        // load a new page if the url is the same as the current page url. So
                        // we have to visit a different url before visiting the url we intended
                        // to visit in order to ensure that the browser actually starts a new
                        // browsing session
                        cy.visit("/search")
                        cy.visit(url, {headers: amidoHeaders})
                    })

                    cy.get('[data-testid="plp-total-products"]').shouldBeInViewport()
                    cy.get('[data-testid="plp-facet-items"]').shouldBeInViewport()
                    cy.get('[data-testid="plp-facets-open-filters-btn"]').should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
    })
})
