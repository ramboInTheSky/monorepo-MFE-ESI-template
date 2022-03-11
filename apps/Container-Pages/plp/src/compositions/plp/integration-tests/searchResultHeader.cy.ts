/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

context("plp - search results header", function() {
    beforeEach(() => {
        cy.viewport(1280, 800)
        cy.injectAxe()
    })

    describe("For keyword search", () => {
        beforeEach(() => {
            cy.visit("/search?w=Dresses", {headers: amidoHeaders})
        })

        it("should be wrapped with quotation marks", () => {
            cy.get('[data-testid="plp-product-title-text"]').should("have.text", '"Dresses"')
            // cy.checkA11y(null, null, terminalLog, true)
        })
    })
    TestFilter(["build"], () => {
        describe("For category search", () => {
            beforeEach(() => {
                cy.visit("/shop/gender-women-productaffiliation-coatsandjackets", {headers: amidoHeaders})
            })

            it("should not be wrapped with quotation marks", () => {
                cy.get('[data-testid="plp-product-title"]')
                    .should("have.text", "96 Women")
                    .should("not.have.text", '"Women"')
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
