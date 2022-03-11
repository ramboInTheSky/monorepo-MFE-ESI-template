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

TestFilter(["build"], () => {
    context("plp - Shop", function() {
        describe("when shopping for any category", () => {
            it("should a list of Pids", () => {
                cy.injectAxe()
                cy.visit("/shop/test-category", {
                    headers: amidoHeaders,
                })
                cy.get("#plp")
                    .get('[data-pid="R39359"]')
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})

TestFilter(["postdeploy"], () => {
    context("plp - Shop", function() {
        describe("when shopping for any category", () => {
            it("should see a list of Pids", () => {
                cy.injectAxe()
                cy.visit("/shop/gender-women-productaffiliation-coatsandjackets-0", {
                    headers: amidoHeaders,
                })
                cy.get("#plp")
                    .get('[data-testid="plp-product-grid-item"]')
                    .should("have.length.greaterThan", 1)
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
