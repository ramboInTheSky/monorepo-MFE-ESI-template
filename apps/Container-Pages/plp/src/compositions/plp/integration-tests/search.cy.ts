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
    context("plp - Search", function() {
        describe("when searching for red products", () => {
            it("should a list of Pids", () => {
                cy.injectAxe()
                cy.visit("/search?w=Red", {
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
    context("plp - Search", function() {
        describe("when searching for red products", () => {
            it("should return a list of Products", () => {
                cy.injectAxe()
                cy.visit("/search?w=Red", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": "amido",
                        "x-monorepo-territory": "gb",
                        "test-with-local-esi": "true",
                    },
                })
                cy.get("[data-pid]")
                    .should("have.length.greaterThan", 1)
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
