/// <reference types="cypress" />
import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

function openViewAllModal(headers) {
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

    cy.get("[data-testid='plp-f-f-size']")
        .click()
        .wait(100)
    cy.get("[data-testid='plp-view-all-button']")
        .click()
        .wait(100)
    cy.get("[data-testid='plp-view-all-modal']").should("be.visible")
}

TestFilter(["build"], () => {
    context("Given a plp - Facets", () => {
        describe("When territory and language is for direction ltr", () => {
            it("should show the filter search and filter characters", () => {
                cy.injectAxe()
                openViewAllModal({
                    "x-monorepo-language": "en",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-realm": "amido",
                })

                cy.get("[data-testid='plp-view-all-characters']").should("exist")
                cy.get("[data-testid='plp-facet-search']").should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When territory and language is for direction rtl", () => {
            it("should show the filter search and filter characters", () => {
                cy.injectAxe()
                openViewAllModal({
                    "x-monorepo-language": "ar",
                    "x-monorepo-territory": "bh",
                    "x-monorepo-realm": "amido",
                })

                cy.get("[data-testid='plp-view-all-characters']").should("not.exist")
                cy.get("[data-testid='plp-facet-search']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
