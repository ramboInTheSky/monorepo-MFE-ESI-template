/// <reference types="cypress" />

import searchApiData from "../../../../__mocks__/searchApi.page1.json"
import TestFilter, {TestDataSwitcher} from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

TestFilter(["build"], () => {
    context("plp - autocorrected keyword search results header", function() {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.injectAxe()
        })

        describe("For initial server side search", () => {
            beforeEach(() => {
                cy.visit("/search?w=drass", {headers: amidoHeaders})
            })

            it("should display the autocorrected title in the h1 header", () => {
                cy.get('[data-testid="plp-results-title"]').should(
                    "have.text",
                    `Showing results for\u00a0"Dress"\u00a0(${searchApiData.totalResults})`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the `no results` text", () => {
                cy.get('[data-testid="plp-no-results-text"]').should("have.text", `0 results for "drass"`)
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When filters have been applied", () => {
            beforeEach(() => {
                cy.visit("/search?w=drass", {headers: amidoHeaders})
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get('[data-testid="plp-facet-modal-count-label-size:1x2022-1"]').click()
            })

            it("should display the default title text", () => {
                cy.get('[data-testid="plp-results-title"]').should(
                    "have.text",
                    `"Dress"\u00a0(${searchApiData.totalResults})`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not show the no results text", () => {
                cy.get('[data-testid="plp-no-results-text"]').should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
