/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const fixtures = require("@monorepo/cypress-fixtures")

const amidoHeaders = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "mx",
    "test-with-local-esi": "false",
}

TestFilter(["build"], () => {
    context("PLP - esi tags for items", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/search?w=red", {headers: amidoHeaders})
            cy.injectAxe()
        })

        describe("When an item has a type of suit", () => {
            it("Should indicate that the product has that type", () => {
                cy.get("#plp-product-summary-entrypoint-222819").should("exist")
                cy.get("#plp-product-summary-entrypoint-222819").should("contain.text", `SUIT {ESI:"ESI"} - 222819`)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When an item has a type of sofa", () => {
            it("Should indicate that the product has that type", () => {
                cy.get("#plp-product-summary-entrypoint-332757").should("exist")
                cy.get("#plp-product-summary-entrypoint-332757").should("contain.text", `SOFA {ESI:"ESI"} - 332757`)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When an item has a type of product", () => {
            it("Should indicate that the product has that type", () => {
                cy.get("#plp-product-summary-entrypoint-884721").should("exist")
                cy.get("#plp-product-summary-entrypoint-884721").should("contain.text", `PRODUCT {ESI:"ESI"} - 884721`)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When an item does not have a type of suit", () => {
            it("Should indicate that the product does not have that type", () => {
                cy.get("#plp-product-summary-entrypoint-217752").should("exist")
                cy.get("#plp-product-summary-entrypoint-217752").should("contain.text", `{ESI:"ESI"} - 217752`)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
