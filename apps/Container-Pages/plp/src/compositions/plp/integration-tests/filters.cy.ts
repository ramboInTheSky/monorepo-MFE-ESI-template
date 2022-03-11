/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
import wait from "../../../../__mocks__/wait"
import TestFilter from "../../../../cypress/modules/filter"
import searchApiData from "../../../../__mocks__/searchApi.page1.json"
import searchApiFiltered from "../../../../__mocks__/searchApiFiltered.json"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

var fixtures = require("@monorepo/cypress-fixtures")

const viewportHeight = 1300
context("Given a plp - Facets", () => {
    TestFilter(["build"], () => {
        beforeEach(() => {
            cy.intercept("http://localhost:3009", req => {
                req.headers["test-with-local-esi"] = "true"
            })
        })
    })
    TestFilter(["postdeploy", "build"], () => {
        describe("When I browse to PLP with a width of 1024 ", () => {
            beforeEach(() => {
                cy.viewport(1024, viewportHeight)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            it("should show the facets", () => {
                cy.get("[data-testid='plp-facets']").should("be.visible")
            })

            TestFilter(["build"], () => {
                it("should display the filters when clicking a facet", () => {
                    cy.get("[data-testid='plp-f-f-size']").click()
                    cy.wait(100)

                    cy.get("[data-testid='plp-facet-checkbox-label-size:8-tall']").should("be.visible")
                })

                it("should track a GTM event", () => {
                    cy.get("[data-testid='plp-f-f-size']").click()
                    cy.wait(100)
                    cy.shouldTrackEvent({
                        event: "filter",
                        data: {
                            filter: {
                                category: "filter",
                                action: "expanded",
                                label: "size",
                            },
                        },
                    })
                })
            })
            TestFilter(["build"], () => {
                it("When clicking new in, it should disable back in stock ", () => {
                    cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()
                    cy.wait(100)
                    cy.get("[data-testid='plp-facet-checkbox-label-feat:backinstock']").should(
                        "have.css",
                        "opacity",
                        "0.3",
                    )
                })
            })
            TestFilter(["build"], () => {
                it("When clicking view more, it should show more than 8 filters ", () => {
                    cy.get("[data-testid='plp-f-f-category']").click()
                    cy.wait(100)
                    cy.get("[data-testid='plp-facet-checkbox-label-category:shirts']").should("not.be.visible")
                    cy.get("[data-testid='plp-view-more-button']").should("be.visible")
                    cy.get("[data-testid='plp-view-more-button']").click()
                    cy.wait(100)

                    cy.get("[data-testid='plp-facet-checkbox-label-category:shirts']").should("be.visible")
                })

                it("Should trigger the TrackIsViewMoreTriggeredFilter event when 'View More' is selected, and TrackIsViewLessTriggeredFilter 'View Less' is selected", () => {
                    cy.get("[data-testid='plp-f-f-category']").click()
                    cy.wait(100)
                    cy.get("[data-testid='plp-view-more-button']").click()
                    cy.wait(100)

                    cy.shouldTrackEvent({
                        event: "filter",
                        data: {
                            filter: {
                                category: "filter",
                                action: "expand more",
                                label: "category",
                            },
                        },
                    })

                    cy.get("[data-testid='plp-view-more-button']").click()
                    cy.wait(100)

                    cy.shouldTrackEvent({
                        event: "filter",
                        data: {
                            filter: {
                                category: "filter",
                                action: "expand less",
                                label: "category",
                            },
                        },
                    })
                })
            })
            it("When clicking view all, it should show the view all modal ", () => {
                cy.wait(500)
                const body = cy.get("body")
                body.then($body => {
                    if ($body.find("[data-testid=country-selector-close-button]").length > 0) {
                        cy.get("[data-testid=country-selector-close-button]")
                            .click()
                            .wait(300)
                    }
                })

                cy.get("[data-testid='plp-f-f-size']").click()
                cy.wait(100)
                cy.get("[data-testid='plp-view-all-button']").should("be.visible")
                cy.get("[data-testid='plp-view-all-button']").click()
                cy.wait(100)
                cy.get("[data-testid='plp-view-all-modal']").should("be.visible")
                cy.get("[data-testid='plp-view-all-close']").click()
                cy.get("[data-testid='plp-view-all-modal']").should("not.exist")
            })
            TestFilter(["build"], () => {
                it("When clicking a price facet, it should display the price filter ", () => {
                    cy.get("[data-testid='plp-f-f-price']").click({scrollBehavior: "bottom"})
                    cy.wait(100)

                    const slider = cy.get("[data-testid='plp-price-slider']").scrollIntoView()
                    slider.should("be.visible")

                    cy.get("#plp-price-slider").should("contain.text", "Price Range: £0 - £100")

                    slider
                        .get("span[role=slider]")
                        .first()
                        .trigger("mousedown", {which: 1, scrollBehavior: "bottom"})
                        .trigger("mousemove", {clientX: 100, clientY: 0, scrollBehavior: "bottom"})
                        .trigger("mouseup", {force: true})

                    cy.get("#plp-price-slider").should("contain.text", "Price Range: £30 - £100")

                    cy.location().should(loc => {
                        expect(loc.href).to.contain("search?w=Red&isort=score&range=price[3000,10000]")
                    })
                })
            })
            TestFilter(["build"], () => {
                describe("and I select a filter", () => {
                    beforeEach(() => {
                        cy.get("[data-testid='plp-f-f-gender']").click()
                        cy.wait(100)
                        cy.get("[data-testid='plp-facet-checkbox-label-gender:women']").click()
                    })

                    it("should not see any filters checked when the clear all filter is clicked", () => {
                        cy.get("[data-testid='plp-facet-checkbox-gender:women']").should("be.checked")

                        cy.get("[data-testid='plp-filter-clear-all-link']").click()

                        cy.get("[data-testid='plp-facet-checkbox-gender:women']").should("not.be.checked")
                    })
                    it("should not see gender women checked when the clear gender is clicked", () => {
                        cy.get("[data-testid='plp-facet-checkbox-gender:women']").should("be.checked")

                        cy.get("[data-testid='plp-filter-clear-link-gender']").click()
                        cy.wait(500)
                        cy.get("[data-testid='plp-facet-checkbox-label-gender:women']").should("not.be.checked")
                    })

                    it("should not see clear filters link when price filters are amended", () => {
                        cy.get("[data-testid='plp-filter-clear-link-gender']")
                            .click()
                            .wait(333)
                        cy.get("[data-testid='plp-filter-clear-all-link']").should("not.exist")

                        cy.get("[data-testid='plp-f-f-price']").click({scrollBehavior: "bottom"})
                        cy.wait(100)

                        const slider = cy.get("[data-testid='plp-price-slider']")
                        slider.should("be.visible")

                        cy.get("#plp-price-slider").should("contain.text", "Price Range: £0 - £100")

                        slider
                            .get("span[role=slider]")
                            .first()
                            .trigger("mousedown", {which: 1, scrollBehavior: "bottom"})
                            .trigger("mousemove", {clientX: 100, clientY: 0, scrollBehavior: "bottom"})
                            .trigger("mouseup", {force: true})

                        cy.get("#plp-price-slider").should("contain.text", "Price Range: £30 - £100")

                        cy.get("[data-testid='plp-filter-clear-all-link']").should("not.exist")
                    })

                    it("should add the filter to the URL", () => {
                        cy.location().should(loc => {
                            expect(loc.href).to.contain("search?w=Red&af=gender:women&isort=score")
                        })
                    })

                    it("should display results that match the new filter set", () => {
                        cy.get("div[data-pid='1111111']").should("be.visible")
                    })

                    it("should display the new products count", () => {
                        cy.get("h2[data-testid='plp-total-products']").should("contain.text", "15")
                    })

                    it("should display the new filters count", () => {
                        cy.get("label[data-testid='plp-facet-checkbox-label-gender:oldergirls']").should(
                            "contain.text",
                            "5",
                        )
                    })

                    it("should remove the filters that are no longer relevant", () => {
                        cy.get("div[data-testid='plp-facet-checkbox-label-gender:men']").should("not.exist")
                    })

                    it("should remove the facets that are no longer relevant", () => {
                        cy.get("[data-testid='plp-f-f-size']").should("not.exist")
                    })
                })
            })
            TestFilter(["build"], () => {
                describe("When user scrolls to bottom", () => {
                    beforeEach(() => {
                        cy.scrollTo("bottom")

                        // cy.injectAxe()
                    })

                    it("should not show the page facets", () => {
                        cy.wait(100)
                        cy.get("[data-testid='plp-facet-items']").shouldNotBeInViewport()
                        // cy.checkA11y(null, null, terminalLog, true)
                    })
                    it("should not show open filters button", () => {
                        cy.get("[data-testid='plp-facets-open-filters-btn']").should("not.exist")
                        // cy.checkA11y(null, null, terminalLog, true)
                    })
                    describe("When the open filters button is clicked", () => {
                        it("should show the facets filter", () => {
                            cy.scrollTo("bottom")

                            cy.get("[data-testid='plp-facets-open-filters-btn']")
                                .click()
                                .wait(1000)
                            cy.get("[data-testid='plp-facet-items']").should("be.visible")
                            // cy.checkA11y(null, null, terminalLog, true)
                        })
                    })
                    describe("When the collapsed filter area is clicked", () => {
                        it("should show the facets filter", () => {
                            cy.scrollTo("bottom")

                            cy.get("[data-testid='plp-facets-collapsed-container']")
                                .click()
                                .wait(1000)
                            cy.get("[data-testid='plp-facet-items']").should("be.visible")
                            // cy.checkA11y(null, null, terminalLog, true)
                        })
                    })
                    describe("The fixed sort and filter bar", () => {
                        it("should not disappear", () => {
                            cy.get("[data-testid='plp-results-title-container']").should("be.visible")
                            cy.get("[data-testid='plp-desktop-sort-button']").should("be.visible")
                            cy.get("[data-testid='plp-total-products']").should("be.visible")
                            // cy.checkA11y(null, null, terminalLog, true)
                        })
                    })
                })
                describe("When user scrolls to downwards", () => {
                    beforeEach(() => {
                        cy.scrollTo(0, 1700)
                    })

                    it("should not show the page facets", () => {
                        cy.wait(100)
                        cy.get("[data-testid='plp-facet-items']").should("not.be.visible")
                        // cy.checkA11y(null, null, terminalLog, true)
                    })
                    it("should show open filters button", () => {
                        cy.get("[data-testid='plp-facets-open-filters-btn']").should("exist")
                        // cy.checkA11y(null, null, terminalLog, true)
                    })
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When I browse to PLP with a width of 320 - 767", () => {
            const viewportWidth = 480
            const viewportHeight = 1000
            beforeEach(() => {
                cy.viewport(viewportWidth, viewportHeight)
                cy.visit("/search?w=Red", {headers: amidoHeaders})

                cy.intercept({method: "GET", url: "/products-fragment"}, async req => {
                    await wait(200)
                })
            })

            describe("When the filters button is selected", () => {
                beforeEach(() => {
                    cy.get("[data-testid='plp-filters-menu-btn'")
                        .click()
                        .wait(1000)
                })

                it("Should show the tabbed filters fullscreen", () => {
                    cy.get("[data-testid='plp-filters-drawer-content'")
                        .should("have.css", "width")
                        .and("eq", `${viewportWidth}px`)
                })

                it("should track a GTM event", () => {
                    cy.shouldTrackEvent({
                        event: "filter",
                        data: {
                            filter: {
                                category: "filter",
                                action: "open",
                            },
                        },
                    })
                })

                it("Should show the key filters", () => {
                    cy.get("[data-testid='plp-filters-drawer-content']").shouldBeInViewport()

                    cy.get("[data-testid='plp-filters-drawer-content']").should("contain.text", "New In")
                })

                describe("When a key filter is clicked", () => {
                    it("Should show a loading spinner", () => {
                        cy.get("[data-testid='plp-tabbed-key-filter-button-feat:newin'").click()

                        cy.get("[data-testid='plp-tabbed-filter-spinner']").should("be.visible")
                        cy.get("[data-testid='plp-tabbed-filter-tick']").should("not.exist")
                    })

                    it("Should show a tick after the request finishes", () => {
                        cy.get("[data-testid='plp-tabbed-key-filter-button-feat:newin'")
                            .click()
                            .wait(250)

                        cy.get("[data-testid='plp-tabbed-filter-tick']").should("be.visible")
                    })

                    it("Should show Clear All instead of Close", () => {
                        cy.get("[data-testid='plp-tabbed-key-filter-button-feat:newin'")
                            .click()
                            .wait(250)

                        cy.get("[data-testid='plp-filters-close-text-cta']").should("contain.text", "Clear All")
                    })

                    it("Should filter products and update the product count", () => {
                        cy.get("#plp-product-summary-entrypoint-222819").should("exist")

                        cy.get("[data-testid='plp-tabbed-key-filter-button-feat:newin'")
                            .click()
                            .wait(250)

                        cy.get("[data-testid='plp-filters-drawer-content']").should("contain.text", "View 15 Products")
                        cy.get("#plp-product-summary-entrypoint-222819").should("not.exist")
                        cy.get("#plp-product-summary-entrypoint-1111111").should("exist")
                    })

                    it("Should disable the incompatible filter", () => {
                        cy.get("[data-testid='plp-tabbed-key-filter-button-feat:newin'")
                            .click()
                            .wait(250)

                        cy.get("[data-testid='plp-tabbed-key-filter-button-feat:backinstock'").should("be.disabled")
                    })
                })

                describe("When a non key filter is clicked", () => {
                    beforeEach(() => {
                        cy.get("[data-testid='plp-tabbed-filter-button-gender'").click()
                    })

                    it("should show the facets", () => {
                        cy.get("[data-testid='plp-tabbed-facets-panel'").should("be.visible")
                        cy.get("[data-testid='plp-tabbed-facet-button-gender:women'").should("be.visible")
                    })

                    it("should track a GTM event", () => {
                        cy.shouldTrackEvent({
                            event: "filter",
                            data: {
                                filter: {
                                    category: "filter",
                                    action: "expanded",
                                    label: "gender",
                                },
                            },
                        })
                    })

                    describe("When a filter is clicked", () => {
                        it("Should update the product count and not update the products", () => {
                            cy.get("#plp-product-summary-entrypoint-222819").should("exist")

                            cy.get("[data-testid='plp-tabbed-facet-button-gender:women'")
                                .click()
                                .wait(250)

                            cy.get("[data-testid='plp-filters-drawer-content']").should(
                                "contain.text",
                                "View 15 Products",
                            )
                            cy.get("#plp-product-summary-entrypoint-222819").should("exist")
                        })
                    })

                    describe("When a key filter is clicked", () => {
                        it("should show a loading results text", () => {
                            cy.get("[data-testid='plp-tabbed-key-filter-button-feat:newin'").click()
                            cy.get("[data-testid='plp-filters-body-container'").contains("Loading results...")
                        })
                    })

                    describe("When price filter is clicked", () => {
                        it("should show price slider", () => {
                            cy.get("[data-testid='plp-tabbed-filter-button-Price'").click()
                            cy.get("#plp-price-slider").should("contain.text", "Price Range: £0 - £100")
                        })
                    })
                    describe("When brand filter is clicked", () => {
                        beforeEach(() => {
                            cy.get("[data-testid='plp-tabbed-filter-button-brand']").click()
                        })
                        it("should show brands search bar", () => {
                            cy.get("[data-testid='plp-tabbed-brand-search-bar']").should("be.visible")
                        })
                        it("should show 5 promoted brands", () => {
                            cy.get("[data-testid='plp-tabbed-facets-panel-promoted-brands']")
                                .children("button")
                                .should("have.length", 5)
                        })
                        it("should show multiple alphabet containers with the first being number", () => {
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-']")
                                .should("have.length.above", 1)
                                .eq(0)
                                .should("contain.text", "0-9")
                        })
                        it("entering a non-existant brand should show a blank screen", () => {
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-']")
                                .should("have.length.above", 1)
                                .eq(0)
                                .should("contain.text", "0-9")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:amido"]').should("be.visible")

                            cy.get("[data-testid=plp-tabbed-brand-search-bar]").type("Hello, World")

                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-']").should("not.exist")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:amido"]').should("not.exist")
                        })
                        it("entering a specific brand should show that specific brand", () => {
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-']")
                                .should("have.length.above", 1)
                                .eq(0)
                                .should("contain.text", "0-9")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:nike"]').should("be.visible")

                            cy.get("[data-testid=plp-tabbed-brand-search-bar]").type("Amido")

                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-']").should("not.exist")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:nike"]').should("not.exist")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:amido"]').should("be.visible")
                        })
                        it("entering a partial string should show a couple of brands that contain that string", () => {
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-']")
                                .should("have.length.above", 1)
                                .eq(0)
                                .should("contain.text", "0-9")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:amido"]').should("be.visible")

                            cy.get("[data-testid=plp-tabbed-brand-search-bar]").type("te")

                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-A']").should("not.exist")

                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-B']").should("be.visible")
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-H']").should("be.visible")
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-L']").should("be.visible")
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-S']").should("be.visible")
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-T']").should("be.visible")
                            cy.get("[data-testid^='plp-tabbed-brand-alphabet-title-W']").should("be.visible")

                            cy.get('[data-testid="plp-tabbed-facet-button-brand:amido"]').should("not.exist")

                            cy.get('[data-testid="plp-tabbed-facet-button-brand:barbour international"]').should(
                                "be.visible",
                            )
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:hollister"]').should("be.visible")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:live unlimited"]').should("be.visible")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:selected femme"]').should("be.visible")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:ted baker"]').should("be.visible")
                            cy.get('[data-testid="plp-tabbed-facet-button-brand:whitestuff"]').should("be.visible")
                        })
                    })
                })

                describe("When the close icon is clicked", () => {
                    it("Should close the tabbed filters", () => {
                        cy.get("[data-testid='plp-filters-close-button']")
                            .click()
                            .wait(1000)

                        cy.get("[data-testid='plp-filters-drawer-content']").should("not.exist")
                    })

                    it("should track a GTM event", () => {
                        cy.get("[data-testid='plp-filters-close-button']").click()
                        cy.shouldTrackEvent({
                            event: "filter",
                            data: {
                                filter: {
                                    category: "filter",
                                    action: "closed",
                                },
                            },
                        })
                    })
                })

                describe("When the close link is clicked", () => {
                    it("Should close the tabbed filters", () => {
                        cy.get("[data-testid='plp-filters-close-text-cta'")
                            .click()
                            .wait(1000)

                        cy.get("[data-testid='plp-filters-drawer-content'").should("not.exist")
                    })
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When I browse to PLP with a width of 768 - 1023", () => {
            const viewportWidth = 1000
            beforeEach(() => {
                cy.viewport(viewportWidth, 1000)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            describe("When the filters button is selected", () => {
                beforeEach(() => {
                    cy.get("[data-testid='plp-filters-menu-btn'")
                        .click()
                        .wait(1000)
                })

                it("Should show the tabbed filters in a drawer", () => {
                    cy.get("[data-testid='plp-filters-drawer-content'")
                        .children()
                        .should("have.length.above", 0)
                })

                it("Should not be fullscreen", () => {
                    cy.get("[data-testid='plp-filters-drawer-content'")
                        .should("have.css", "width")
                        .then(val => parseInt(val as any, 10))
                        .and("lessThan", viewportWidth)
                })

                describe("When the close icon is clicked", () => {
                    it("Should close the tabbed filters", () => {
                        cy.get("[data-testid='plp-filters-close-button'")
                            .click()
                            .wait(1000)

                        cy.get("[data-testid='plp-filters-drawer-content'").should("not.exist")
                    })
                })

                describe("When the close link is clicked", () => {
                    it("Should close the tabbed filters", () => {
                        cy.get("[data-testid='plp-filters-close-text-cta'")
                            .click()
                            .wait(1000)

                        cy.get("[data-testid='plp-filters-drawer-content'").should("not.exist")
                    })
                })

                describe("When the user clicks outside the drawer", () => {
                    it("Should close the tabbed filters", () => {
                        cy.get(".plp-filters-drawer-back-drop").click()

                        cy.get("[data-testid='plp-filters-drawer-content'").should("not.exist")
                    })
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When user selects a filter", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.get("[data-testid='plp-f-f-gender']").click()
                cy.wait(100)
                cy.get("[data-testid='plp-facet-checkbox-label-gender:women']").click()
            })

            it("should show the loading icon", () => {
                cy.get("[data-testid='plp-results-loading-page-spinner']").should("be.visible")
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When user spam clicks multiple filters", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.intercept("GET", "/products-fragment").as("getProducts")
                cy.get("[data-testid='plp-f-f-gender']").click()
                cy.wait(100)
                cy.get("[data-testid='plp-facet-checkbox-label-gender:women']").dblclick()
                cy.get("[data-testid='plp-facet-checkbox-label-gender:oldergirls']").dblclick()
            })

            it("should resolve to one api response", () => {
                cy.wait(1000)
                cy.get("@getProducts.all").should("have.length", 1)
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When on 1024px above, there was a selected filter from the API", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=FILTER_SELECTION", {headers: {...amidoHeaders}})
                cy.wait(10)
                cy.scrollTo("bottom")
            })

            it("should show the selected filters under the open filters button", () => {
                cy.get("[data-testid='plp-collasped-price-name']").shouldBeInViewport()
                cy.get("[data-testid='plp-collasped-price-info']").shouldBeInViewport()

                cy.get("[data-testid='plp-collasped-facet-style']").should("contain.text", "Style")
                cy.get("[data-testid='plp-collasped-facet-style-bbbbbbbbbb']").should("contain.text", "Bbbbbbbbbb")
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When on 1024px above, there was a selected price from the API", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=FILTER_SELECTION", {headers: amidoHeaders})
                cy.wait(10)
                cy.scrollTo("bottom")
            })

            it("should show the filtered price under the open filters button", () => {
                cy.get("[data-testid='plp-collasped-price-name']").shouldBeInViewport()
                cy.get("[data-testid='plp-collasped-price-info']").shouldBeInViewport()

                cy.get("[data-testid='plp-collasped-price-name']").should("contain.text", "Price")
                cy.get("[data-testid='plp-collasped-price-info']").should("contain.text", "£20 - £100")
            })
        })
        TestFilter(["build"], () => {
            describe("When on 1000px-1024px, there was a selected filter from the API", () => {
                beforeEach(() => {
                    cy.viewport(1000, 1100)
                    cy.visit("/search?w=FILTER_SELECTION", {headers: {...amidoHeaders, "x-monorepo-territory": "mx"}})
                    cy.wait(10)
                    cy.scrollTo("bottom")
                })

                it("should show the selected filters under the open filters button", () => {
                    cy.get("[data-testid='plp-collasped-price-name']").shouldBeInViewport()
                    cy.get("[data-testid='plp-collasped-price-info']").shouldBeInViewport()

                    cy.get("[data-testid='plp-collasped-facet-style']").should("contain.text", "Style")
                    cy.get("[data-testid='plp-collasped-facet-style-bbbbbbbbbb']").should("contain.text", "Bbbbbbbbbb")
                })
            })
        })
        TestFilter(["build"], () => {
            describe("When on 1000px-1024px, there was a selected price from the API", () => {
                beforeEach(() => {
                    cy.viewport(1000, 1100)
                    cy.visit("/search?w=FILTER_SELECTION", {headers: {...amidoHeaders, "x-monorepo-territory": "mx"}})
                    cy.wait(10)
                    cy.scrollTo("bottom")
                })

                it("should show the filtered price under the open filters button", () => {
                    cy.get("[data-testid='plp-collasped-price-name']").shouldBeInViewport()
                    cy.get("[data-testid='plp-collasped-price-info']").shouldBeInViewport()

                    cy.get("[data-testid='plp-collasped-price-name']").should("contain.text", "Price")
                    cy.get("[data-testid='plp-collasped-price-info']").should("contain.text", "From $20 - $100")
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When filtering", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            describe("When a filter category has one option and it is not selected", () => {
                it("should be displayed", () => {
                    cy.get("[data-testid='plp-f-f-sizetype']").click({scrollBehavior: false})
                    cy.wait(100)
                    cy.get("[data-testid='plp-facet-checkbox-label-sizetype:curve']").click()

                    cy.get("[data-testid='plp-f-f-gender']").click()
                    cy.wait(100)
                    cy.get("[data-testid='plp-facet-checkbox-label-gender:women']").should("exist")
                })
            })

            describe("When a filter category has one option and it is in the exception list", () => {
                it("should be displayed", () => {
                    cy.get("[data-testid='plp-f-f-gender']").click()

                    cy.wait(100)
                    cy.get("[data-testid='plp-facet-checkbox-label-gender:oldergirls']").click()

                    cy.get("[data-testid='plp-f-f-gender']").should("exist")
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When filter have a tooltip help icon (GB territory)", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            describe("When a filter facet/key filter has a tooltip associated with it", () => {
                it("should display the tooltip on icon click", () => {
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').should("exist")
                    cy.wait(100)
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').click()

                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should(
                        "have.text",
                        "Back in stock",
                    )

                    cy.get('[data-testid="plp-facet-tooltip-body-feat:backinstock"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-body-feat:backinstock"]').should(
                        "have.text",
                        "View best selling items that were previously out of stock but are now back in stock. ",
                    )
                })

                it("should display the Christmas tooltip on icon click", () => {
                    const currentYear = new Date().getFullYear()
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:deliveryby"]').should("exist")
                    cy.wait(100)
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:deliveryby"]').click()

                    cy.get('[data-testid="plp-facet-tooltip-title-feat:deliveryby"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:deliveryby"]').should(
                        "have.text",
                        "Deliver by Christmas",
                    )
                    cy.wait(100)
                    cy.get('[data-testid="plp-facet-tooltip-body-feat:deliveryby"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-body-feat:deliveryby"]').contains(
                        `View items that are available for delivery before Christmas (24th December ${currentYear}). Check our Terms & Conditions for full details.`,
                    )
                })

                it("should hide the tooltip on close icon click", () => {
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').should("exist")
                    cy.wait(100)
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').click()

                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should(
                        "have.text",
                        "Back in stock",
                    )

                    cy.get("[data-testid=plp-filters-close-button]").should("exist")
                    cy.get("[data-testid=plp-filters-close-button]").click()
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should("not.exist")
                })
                it("should hide the tooltip when a different tooltip is open", () => {
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').should("exist")
                    cy.wait(100)
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').click()

                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should(
                        "have.text",
                        "Back in stock",
                    )

                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:available"]').should("exist")
                    cy.wait(100)
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:available"]').click()

                    cy.get('[data-testid="plp-facet-tooltip-title-feat:available"]').should("exist")
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:available"]').should("have.text", "In Stock")
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:backinstock"]').should("not.exist")

                    cy.get("[data-testid=plp-filters-close-button]").should("exist")
                    cy.get("[data-testid=plp-filters-close-button]").click()
                    cy.get('[data-testid="plp-facet-tooltip-title-feat:available"]').should("not.exist")
                })
            })
        })
        describe("When filter have a tooltip help icon (MX territory)", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=Red", {headers: {...amidoHeaders, "x-monorepo-territory": "mx"}})
            })

            describe("When a filter facet/key filter has a tooltip associated with it", () => {
                it("should not display the tooltip on icon click", () => {
                    cy.get('[data-testid="plp-facet-tooltip-icon-feat:backinstock"]').should("not.exist")
                    cy.wait(100)
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When filtering", () => {
            beforeEach(() => {
                cy.viewport(1024, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            describe("the products fragment api fails", () => {
                it("should go to /error page", () => {
                    cy.get("[data-testid='plp-f-f-gender']").click()
                    cy.wait(100)
                    cy.get("[data-testid='plp-facet-checkbox-label-gender:oldergirls']").click()

                    cy.intercept({method: "GET", url: "/products-fragment"}, async req => {
                        // Lets wait a bit to allow the loading
                        // indicator to be shown for some time
                        await wait(1000)
                        req.reply(500, "Something went wrong")
                    })

                    cy.location().should(loc => {
                        expect(loc.pathname).to.eq("/error")
                    })
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("When I use the CTA button", () => {
            beforeEach(() => {
                cy.viewport(1023, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            it("selecting a filter and then closing right away should not update product selection", () => {
                //Check the initial results amount
                cy.get('[data-testid="plp-results-title"]').should(
                    "contain.text",
                    `\u00a0(${searchApiData.totalResults})`,
                )

                cy.get("[data-testid=plp-filters-menu-btn]").should("be.visible")
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.wait(100)

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-filters-close-button"]').click()

                //Check the results amount did not change
                cy.get('[data-testid="plp-results-title"]').should(
                    "contain.text",
                    `\u00a0(${searchApiData.totalResults})`,
                )
            })

            it("selecting a filter and then clicking the CTA button should update the product selection", () => {
                //Check the initial results amount
                cy.startTrackingEvents()
                cy.get('[data-testid="plp-results-title"]').should(
                    "contain.text",
                    `\u00a0(${searchApiData.totalResults})`,
                )

                cy.get("[data-testid=plp-filters-menu-btn]").should("be.visible")
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.wait(100)

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-filters-view-products-cta-button"]').click()

                cy.shouldHaveTrackedEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "popup",
                            label: "View Products",
                            option: "Category: jackets",
                        },
                    },
                })

                //Check the results amount did change
                cy.get('[data-testid="plp-results-title"]').should(
                    "contain.text",
                    `\u00a0(${searchApiFiltered.totalResults})`,
                )

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.wait(100)
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains("Jackets")
            })
        })

        describe("When tabbed filters are visible", () => {
            beforeEach(() => {
                cy.viewport(1000, 1000)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.get("[data-testid='plp-filters-menu-btn'")
                    .click()
                    .wait(1000)
            })

            it("should close the tabbed filters on screen resize to 1024", () => {
                cy.viewport(1028, 1000).wait(333)
                cy.get("[data-testid='plp-filters-drawer-content'").should("not.exist")
            })
        })
    })

    TestFilter(["postdeploy", "build"], () => {
        describe("When I browse to PLP with a width of 1024 ", () => {
            TestFilter(["build"], () => {
                describe("and there is a relaxedQuery result", () => {
                    beforeEach(() => {
                        cy.viewport(1024, 1100)
                        cy.visit("/search?w=mens%20old%20jeans%20red", {headers: amidoHeaders})

                        cy.intercept({method: "GET", url: "http://localhost:3009/"}, async req => {
                            await wait(200)
                        })
                    })

                    it("should show the correct text", () => {
                        cy.wait(100)
                        cy.get("[data-testid='plp-results-title']").shouldBeInViewport()
                        cy.get("[data-testid='plp-results-title']").should(
                            "contain.text",
                            "Showing results for nearest matches",
                        )

                        cy.get("[data-testid=plp-no-results-text]").shouldBeInViewport()
                        cy.get("[data-testid=plp-no-results-text]").should(
                            "contain.text",
                            `0 results for "mens old jeans red"`,
                        )
                        // cy.checkA11y(null, null, terminalLog, true)
                    })

                    it("should show the new title after filter click", () => {
                        cy.get("[data-testid=plp-f-f-category]").shouldBeInViewport()
                        cy.get("[data-testid=plp-f-f-category]").click()

                        //cy.scrollTo("top")

                        cy.get('[data-testid="plp-facet-checkbox-label-category:jackets"]').shouldBeInViewport()
                        cy.get('[data-testid="plp-facet-checkbox-label-category:jackets"]').click()

                        const title = cy.get("[data-testid='plp-results-title']")
                        console.log({title})
                        cy.get("[data-testid='plp-results-title']").shouldBeInViewport()
                        cy.get("[data-testid='plp-results-title']").should("include.text", `JEANS`)
                        cy.get("[data-testid='plp-results-title']").should("not.include.text", `Jackets`)

                        cy.get("[data-testid=plp-no-results-text]").should("not.exist")
                        // cy.checkA11y(null, null, terminalLog, true)
                    })
                })
            })
        })
    })
})
