/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const disabledPageInFiltersHeaders = amidoHeaders
const enablePageInFiltersHeaders = {
    ...amidoHeaders,
    "x-monorepo-territory": "mx",
}
TestFilter(["build"], () => {
    context("plp - pageInFilters is enabled", () => {
        describe("when window size is below 768px", () => {
            beforeEach(() => {
                cy.viewport("iphone-7")
                cy.visit("/shop/test-category", {
                    headers: enablePageInFiltersHeaders,
                })
                cy.injectAxe()
            })
            it("should see sort button", () => {
                const button = cy.get("[data-testid='plp-menu-button-sort']")
                button.should("be.visible").contains("SORT", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should see filters button", () => {
                const button = cy.get("[data-testid='plp-filters-menu-btn']")
                button.should("be.visible").contains("FILTER", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should display the results title with total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96\u00a0Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a small viewport, there will be 2 items per row. So let's scroll to the 15th element because at this point,
                // the 19th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(15)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

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
                    .wait(1000)

                // Lets assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when window size is at 768px", () => {
            beforeEach(() => {
                cy.viewport("ipad-2")
                cy.visit("/shop/test-category", {
                    headers: enablePageInFiltersHeaders,
                })
                cy.injectAxe()
            })
            it("should see sort button", () => {
                const button = cy.get("#desktop-sort-select-input")
                button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the results title with no total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96\u00a0Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a 768px viewport, there will be 2 items per row. So let's scroll to the 8th element because at this point,
                // the 18th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(8)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

                // Lets assert that no fetch for the next page of items took place
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // Now Let's scroll to the 9th element because that will cause the 18th element to be the last item in the viewport,
                // which means that there are only 2 more rows remaining to enter the viewport. We expect the fetch to be triggered
                // by this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(17)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should see sort button", () => {
                const button = cy.get("#desktop-sort-select-input")
                button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should display the results title with no total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96\u00a0Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a small viewport, there will be 1 items per row. So let's scroll to the 8th element because at this point,
                // the 18th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(8)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

                // Lets assert that no fetch for the next page of items took place
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // Now Let's scroll to the 17th element because that will cause the 18th element to be the last item in the viewport,
                // which means that there are only 2 more rows remaining to enter the viewport. We expect the fetch to be triggered
                // by this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(17)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    describe("when window size is above 1024px", () => {
        beforeEach(() => {
            cy.viewport(1080, 1000)
            cy.visit("/shop/test-category", {
                headers: enablePageInFiltersHeaders,
            })
            cy.injectAxe()
        })
        it("should see sort button", () => {
            const button = cy.get("#desktop-sort-select-input")
            button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})
            // cy.checkA11y(null, null, terminalLog, true)
        })

        it("should display the results title with no total results count", () => {
            cy.get("[data-testid='plp-product-title']").should("contain.text", "96\u00a0Test")
            // cy.checkA11y(null, null, terminalLog, true)
        })

        it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
            // In a large viewport, there will be 4 items per row. So let's scroll to the 7th element because at this point,
            // the 15th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
            cy.get("#plp")
                .find('[data-testid="plp-product-grid-item"]')
                .eq(7)
                .scrollIntoView({duration: 500})
                .wait(1000)

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
                .wait(1000)

            // Let's assert that the next page of items was fetched
            cy.get("#plp")
                .find('[data-testid="plp-product-grid-item"]')
                .should("have.length", 48)
            // cy.checkA11y(null, null, terminalLog, true)
        })
    })
    describe("when window size is at 1280px", () => {
        beforeEach(() => {
            cy.viewport("macbook-13")
            cy.visit("/shop/test-category", {
                headers: enablePageInFiltersHeaders,
            })
            cy.injectAxe()
        })
        describe("when window size is at 1024px", () => {
            beforeEach(() => {
                cy.viewport("macbook-13")
                cy.visit("/shop/test-category", {
                    headers: enablePageInFiltersHeaders,
                })
            })
            it("should see sort button", () => {
                const button = cy.get("#desktop-sort-select-input")
                button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the results title with no total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96\u00a0Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a large viewport, there will be 4 items per row. So let's scroll to the 7th element because at this point,
                // the 15th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(7)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

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
                    .wait(1000)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    context("plp - pageInFilters is disabled", () => {
        describe("when window size is below 768px", () => {
            beforeEach(() => {
                cy.viewport("iphone-7")
                cy.visit("/shop/test-category", {
                    headers: disabledPageInFiltersHeaders,
                })
                cy.injectAxe()
            })
            it("should see sort button", () => {
                const button = cy.get("[data-testid='plp-menu-button-sort']")
                button.should("be.visible").contains("SORT", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should see filters button", () => {
                const button = cy.get("[data-testid='plp-filters-menu-btn']")
                button.should("be.visible").contains("FILTER", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the results title with total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96 Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a large viewport, there will be 4 items per row. So let's scroll to the 7th element because at this point,
                // the 15th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(15)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

                // Lets assert that no fetch for the next page of items took place
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 24)

                // Now Let's scroll to the 10th element because that will cause the 115th element to be the last item in the viewport,
                // which means that there are only 2 more rows remaining to enter the viewport. We expect the fetch to be triggered
                // by this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(17)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when window size is at 768px", () => {
            beforeEach(() => {
                cy.viewport("ipad-2")
                cy.visit("/shop/test-category", {
                    headers: disabledPageInFiltersHeaders,
                })
                cy.injectAxe()
            })
            it("should see sort button", () => {
                const button = cy.get("[data-testid='plp-menu-button-sort']")
                button.should("be.visible").contains("SORT", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should see filters button", () => {
                const button = cy.get("[data-testid='plp-filters-menu-btn']")
                button.should("be.visible").contains("FILTER", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the results title with total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96 Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a small viewport, there will be 3 items per row. So let's scroll to the 8th element because at this point,
                // the 18th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(8)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

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
                    .wait(1000)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when window size is above 1024px", () => {
            beforeEach(() => {
                cy.viewport("macbook-13")
                cy.visit("/shop/test-category", {
                    headers: disabledPageInFiltersHeaders,
                })
                cy.injectAxe()
            })
            it("should see sort button", () => {
                const button = cy.get("#desktop-sort-select-input")
                button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the results title with no total results count", () => {
                cy.get("[data-testid='plp-product-title']").should("contain.text", "96 Test")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should wait until there are only two rows of items remaining before fetching the next page of items", () => {
                // In a large viewport, there will be 4 items per row. So let's scroll to the 7th element because at this point,
                // the 15th element will not have yet entered the viewport and so no fetch should be triggered after this scroll
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .eq(7)
                    .scrollIntoView({duration: 500})
                    .wait(1000)

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
                    .wait(1000)

                // Let's assert that the next page of items was fetched
                cy.get("#plp")
                    .find('[data-testid="plp-product-grid-item"]')
                    .should("have.length", 48)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
