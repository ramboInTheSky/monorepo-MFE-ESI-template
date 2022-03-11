/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const fixtures = require("@monorepo/cypress-fixtures")

context("Given a plp - View all modal filter search", () => {
    describe("when I browse to PLP with a width of 1024, and access the View All modal", () => {
        const headers = amidoHeaders

        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.visit("/search?w=Red", {headers})
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
            cy.wait(1000)
            cy.get("[data-testid='plp-view-all-modal']").should("be.visible")
            cy.injectAxe()
        })

        it("should display the filter search", () => {
            cy.wait(225)

            cy.get("[data-testid='plp-facet-search']").should("be.visible")
            // cy.checkA11y(null, null, terminalLog, true)
        })
        TestFilter(["build"], () => {
            it("should search and add a filter", () => {
                cy.get("[data-testid='plp-facet-search']").type("34R{enter}")
                cy.get("[data-testid='facet-size:34r']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        it("should only match filters that start with the search string", () => {
            cy.get("[data-testid='plp-facet-search']").type("10{enter}")
            cy.get("[data-testid='facet-size:10']").should("be.visible")
            // cy.checkA11y(null, null, terminalLog, true)
        })

        it("should clear the search box once a filter is selected", () => {
            cy.get("[data-testid='plp-facet-search']").type("10{enter}")
            cy.get("[data-testid='facet-size:10']").should("be.visible")
            cy.get("[data-testid='plp-facet-search']").should("not.contain.text")
            // cy.checkA11y(null, null, terminalLog, true)
        })
        TestFilter(["build"], () => {
            it("should use arrow keys to navigate through the matching options", () => {
                cy.get("[data-testid='plp-facet-search']").type("10{downarrow}{enter}")
                cy.get("[data-testid='facet-size:10-tall']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should check the relevant box in the filterGrid once a filter has been selected in the filter search", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-size:10']").should("not.be.checked")
                cy.get("[data-testid='plp-facet-search']").type("10{enter}")
                cy.get("[data-testid='plp-facet-checkbox-modal-size:10']").should("be.checked")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When a filter is selected, it should track a GTM event", () => {
                cy.get("[data-testid='plp-facet-search']").type("10{enter}")
                cy.shouldTrackEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "popup",
                            label: "search",
                            option: "size:10",
                        },
                    },
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
