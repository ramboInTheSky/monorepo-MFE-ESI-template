/// <reference types="cypress" />

import smartSearchApiData from "../../../../__mocks__/smartSearchApi.json"
import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

TestFilter(["build"], () => {
    context("Given plp - x-monorepo-viewport-size does exist in the headers", function() {
        describe("Mobile Viewport and x-monorepo-viewport-size is mobile", () => {
            const viewportSize = "mobile"
            beforeEach(() => {
                cy.viewport(375, 500)
                cy.intercept("http://localhost:3009", req => {
                    req.headers["test-with-local-esi"] = "true"
                })
                cy.injectAxe()
            })
            describe("By default", () => {
                it("should default to desktop config - load 8 items initial load", () => {
                    cy.visit("/search?w=smart-search", {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 8)
                        .eq(7)
                        .contains(smartSearchApiData.items[7].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
                it("should load 10 more items in total for next page and check if item 1st and item 8th ids are correct", () => {
                    cy.visit("/search?w=smart-search", {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(5)
                        .scrollIntoView({duration: 500})
                        .wait(500)

                    // Lets assert that no fetch for the next page of items took place
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[0].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 18)
                        .eq(17)
                        .contains(smartSearchApiData.items[17].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When loading at page 3", () => {
                it("should correctly load page 2 and 3 of items", () => {
                    cy.visit(`/search?w=smart-search&p=3`, {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 20)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[10].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(19)
                        .contains(smartSearchApiData.items[29].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should correctly load page 1 upon scrolling into page 1", () => {
                    cy.visit(`/search?w=smart-search&p=3`, {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.wait(10)
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(5)
                        .scrollIntoView({duration: 100})

                    cy.wait(100)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 30)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[0].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(23)
                        .contains(smartSearchApiData.items[23].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })

        describe("Tablet Viewport and x-monorepo-viewport-size is tablet", () => {
            const viewportSize = "tablet"
            beforeEach(() => {
                cy.viewport("ipad-2")
                cy.intercept("http://localhost:3009", req => {
                    req.headers["test-with-local-esi"] = "true"
                })
            })

            describe("By default", () => {
                it("should default to desktop config - load 12 items initial load", () => {
                    cy.visit("/search?w=smart-search", {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 12)
                        .eq(11)
                        .contains(smartSearchApiData.items[11].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should load 28 items in total for next page", () => {
                    cy.visit("/search?w=smart-search", {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(8)
                        .scrollIntoView({duration: 500})
                        .wait(500)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 28)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[0].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(27)
                        .contains(smartSearchApiData.items[27].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When loading at page 3", () => {
                it("should correct load page 2 and 3 of items", () => {
                    cy.visit(`/search?w=smart-search&p=3`, {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 32)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[16].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(31)
                        .contains(smartSearchApiData.items[47].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should correctly load page 1 of items when scrolling into page 1", () => {
                    it("should load 72 items in total when on page 2/3 and going to page 1 and check if item 1st and item 71th ids are correct", () => {
                        cy.visit(`/search?w=smart-search&p=3`, {
                            headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                        })

                        // Lets verify that page 2 and 3 have been correctly fetched

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .should("have.length", 24)

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .eq(0)
                            .contains(smartSearchApiData.items[12].itemNumber)

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .eq(23)
                            .contains(smartSearchApiData.items[35].itemNumber)

                        // Now let's scroll into page 1

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .eq(4)
                            .scrollIntoView({duration: 100})

                        // Now lets verify that the correct items have been fetched for page 1

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .should("have.length", 36)

                        cy.wait(100)

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .eq(0)
                            .contains(smartSearchApiData.items[0].itemNumber)

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .eq(11)
                            .contains(smartSearchApiData.items[11].itemNumber)

                        cy.get("#plp")
                            .find('[data-testid="plp-product-grid-item"]')
                            .eq(35)
                            .contains(smartSearchApiData.items[35].itemNumber)
                        // cy.checkA11y(null, null, terminalLog, true)
                    })
                })
            })
        })
        describe("desktop Viewport and x-monorepo-viewport-size is desktop", () => {
            const viewportSize = "desktop"
            beforeEach(() => {
                cy.viewport(1024, 500)
                cy.intercept("http://localhost:3009", req => {
                    req.headers["test-with-local-esi"] = "true"
                })
            })

            describe("By default", () => {
                it("should correctly load page 1", () => {
                    cy.visit("/search?w=smart-search", {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 24)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should correctly load page 2 upon scrolling to the next page", () => {
                    cy.visit("/search?w=smart-search", {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(20)
                        .scrollIntoView({duration: 500})
                        .wait(500)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 52)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[0].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(51)
                        .contains(smartSearchApiData.items[51].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When loading at page 3", () => {
                it("should correctly load page 2 and 3 of items", () => {
                    cy.visit(`/search?w=smart-search&p=3`, {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 56)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[28].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(55)
                        .contains(smartSearchApiData.items[83].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should correctly load page 1 upon scrolling into page 1", () => {
                    cy.visit(`/search?w=smart-search&p=3`, {
                        headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                    })
                    cy.wait(10)
                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(4)
                        .scrollIntoView({duration: 100})

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .should("have.length", 84)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(0)
                        .contains(smartSearchApiData.items[0].itemNumber)

                    cy.get("#plp")
                        .find('[data-testid="plp-product-grid-item"]')
                        .eq(83)
                        .contains(smartSearchApiData.items[83].itemNumber)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
    })

    context("Given plp - x-monorepo-viewport-size does not exist in the headers", function() {
        describe("Mobile Viewport", () => {
            beforeEach(() => {
                cy.viewport("iphone-7")
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })
            it("should default to desktop config - load 24 items initial load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("Tablet Viewport", () => {
            beforeEach(() => {
                cy.viewport("ipad-2")
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })
            it("should default to desktop config - load 24 items initial load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("Desktop Viewport", () => {
            beforeEach(() => {
                cy.viewport("macbook-13")
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })
            it("should default to desktop config - load 24 items initial load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    context("Given plp - x-monorepo-viewport-size value is not valid", function() {
        describe("Mobile Viewport", () => {
            beforeEach(() => {
                cy.viewport("iphone-7")
                cy.visit("/search?w=Red", {headers: {...amidoHeaders, "x-monorepo-viewport-size": "abc"}})
                cy.injectAxe()
            })
            it("should default to desktop config - load 24 items initial load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("Tablet Viewport", () => {
            beforeEach(() => {
                cy.viewport("ipad-2")
                cy.visit("/search?w=Red", {headers: {...amidoHeaders, "x-monorepo-viewport-size": "abc"}})
                cy.injectAxe()
            })
            it("should default to desktop config - load 24 items initial load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("Desktop Viewport", () => {
            beforeEach(() => {
                cy.viewport("macbook-13")
                cy.visit("/search?w=Red", {headers: {...amidoHeaders, "x-monorepo-viewport-size": "abc"}})
                cy.injectAxe()
            })
            it("should default to desktop config - load 24 items initial load", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    context("Given plp - filter interaction", () => {
        describe("Filter items by clicking jackets", () => {
            const viewportSize = "desktop"
            beforeEach(() => {
                cy.viewport(1280, 500)
                cy.intercept("http://localhost:3009", req => {
                    req.headers["test-with-local-esi"] = "true"
                })

                cy.visit("/search?w=smart-search", {
                    headers: {...amidoHeaders, "x-monorepo-viewport-size": viewportSize},
                })
                cy.injectAxe()
            })
            it("should load 24 items when filtering was applied", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // scroll to next page
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(20)
                    .scrollIntoView({duration: 500})
                    .wait(500)

                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 52)

                // trigger a filter
                cy.get("[data-testid='plp-f-f-gender']").click()
                cy.wait(100)
                cy.get("[data-testid='plp-facet-checkbox-label-gender:women']").click()

                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(0)
                    .contains(smartSearchApiData.items[0].itemNumber)

                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(23)
                    .contains(smartSearchApiData.items[23].itemNumber)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
