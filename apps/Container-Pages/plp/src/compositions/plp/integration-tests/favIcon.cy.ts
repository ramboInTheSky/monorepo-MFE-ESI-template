/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />

var fixtures = require("@monorepo/cypress-fixtures")
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

context("plp - Search - favIcon", () => {
    TestFilter(["build", "postdeploy"], () => {
        describe("when loaded with amido headers", () => {
            const realm = "amido"
            it("should show amido fav icon", () => {
                cy.injectAxe()
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.get("head")
                    .find("link[type='image/x-icon']")
                    .should("have.attr", "href")
                    .should("include", `/static-content/icons/favicon/${realm}.ico`)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build", "postdeploy"], () => {
    describe("when loaded with amido headers", () => {
        const realm = "amido"
        it("should show amido fav icon", () => {
            cy.injectAxe()
            cy.visit("/search?w=Red", {headers: {...amidoHeaders, "x-monorepo-realm": realm}})
            cy.get("head")
                .find("link[type='image/x-icon']")
                .should("have.attr", "href")
                .should("include", `/static-content/icons/favicon/${realm}.ico`)
            // cy.checkA11y(null, null, terminalLog, true)
        })
    })
})
