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

TestFilter(["build", "postdeploy"], () => {
    context("plp - Search", function() {
        describe("when searching for a keyword that returns no results", () => {
            let noResultsHeader
            beforeEach(() => {
                cy.visit("/search?w=Red-NO-RESULTS", {
                    headers: amidoHeaders,
                })
                noResultsHeader = cy.get("#plp").get('[data-testid="plp-no-results-header"]')
                cy.injectAxe()
            })
            it("should show a no results page", () => {
                noResultsHeader.should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should show the search term in the warning message", () => {
                noResultsHeader.should("contain.text", "Red-NO-RESULTS")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not show the facets", () => {
                cy.get("[data-testid='plp-facets']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
