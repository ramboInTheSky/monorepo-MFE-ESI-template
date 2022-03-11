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
    context("Given a plp - Grid Layout", function() {
        describe("When I browse to PLP with a width of 320 ", () => {
            beforeEach(() => {
                cy.viewport(320, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display a list of Pids", () => {
                cy.get("#plp")
                    .get('[data-pid="R39359"]')
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should hide the facets", () => {
                cy.get("[data-testid='plp-facets']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should display the results title with total results count", () => {
                cy.get("[data-testid='plp-results-title']").should("contain.text", '"Red"\u00a0(96)')
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When I browse to PLP with a width of 400 ", () => {
            beforeEach(() => {
                cy.viewport(400, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display a list of Pids", () => {
                cy.get("#plp")
                    .get('[data-pid="R39359"]')
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When I browse to PLP with a width of 768 ", () => {
            beforeEach(() => {
                cy.viewport(768, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display a list of Pids", () => {
                cy.get("#plp")
                    .get('[data-pid="R39359"]')
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should hide the facets", () => {
                cy.get("[data-testid='plp-facets']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When I browse to PLP with a width of 1024 ", () => {
            beforeEach(() => {
                cy.viewport(1024, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display a list of Pids", () => {
                cy.get("#plp")
                    .get('[data-pid="R39359"]')
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("When I browse to PLP with a width of 1280+ ", () => {
            beforeEach(() => {
                cy.viewport(1280, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display a list of Pids", () => {
                cy.get("#plp")
                    .get('[data-pid="R39359"]')
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
            it("should show the facets", () => {
                cy.get("[data-testid='plp-facets']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
