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
    context("plp - Search - Default", function() {
        describe("when loaded with wrong headers", () => {
            it("should show the Main error", () => {
                cy.injectAxe()
                cy.visit("/search", {
                    headers: {
                        ...amidoHeaders,
                        "x-monorepo-language": "batman",
                        "x-monorepo-realm": "Amido",
                        "x-monorepo-territory": "spiderman",
                    },
                })
                cy.get("[data-testid='error']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when loaded with NO headers", () => {
            it("should show the Main error", () => {
                cy.injectAxe()
                cy.visit("/search")
                cy.get("[data-testid='error']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
