/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"

import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const viewportWidth = 500
const largeScreenBreakPoint = 1024
const mediumScreenBreakPoint = 768
TestFilter(["build", "postdeploy"], () => {
    context("Given plp - Pinned tabs", function() {
        describe("When viewport width is less than medium screen break point", () => {
            beforeEach(() => {
                cy.viewport(mediumScreenBreakPoint - 1, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should show fixed pinned tabs", () => {
                cy.get("#plp")
                    .find("[data-testid='plp-mobile-header']")
                    .children()
                    .eq(0)
                    .invoke("css", "position")
                    .should("equal", "fixed")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When viewport width is less than large screen break point", () => {
            beforeEach(() => {
                cy.viewport(largeScreenBreakPoint - 1, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should show fixed pinned tabs", () => {
                cy.get("#plp")
                    .find("[data-testid='plp-mobile-header']")
                    .children()
                    .eq(0)
                    .invoke("css", "position")
                    .should("equal", "fixed")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When viewport width is more than large screen break point", () => {
            beforeEach(() => {
                cy.viewport(largeScreenBreakPoint + 1, 500)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should show not display pinned tabs", () => {
                cy.get("[data-testid='plp-mobile-header']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
