/// <reference types="cypress" />

import {TestDataSwitcher} from "../../../../cypress/modules/filter"

import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const viewportLength = 500
context("Given plp - Back to top button", () => {
    beforeEach(() => {
        cy.viewport(1280, viewportLength)
        cy.visit("/shop/gender-women-productaffiliation-coatsandjackets?ipaddress=2.91.255.255", {
            headers: amidoHeaders,
        })
        cy.injectAxe()
    })

    describe("By default", () => {
        it("should not display the back to top button", () => {
            cy.get("#plp")
                .find("[data-testid=plp-back-to-top-btn]")
                .should("not.exist")
            // cy.checkA11y(null, null, terminalLog, true)
        })
    })

    describe("When user scrolls down but does not pass viewport", () => {
        it("should not display the back to top button", () => {
            cy.scrollTo(0, viewportLength - 10)
            cy.get("#plp")
                .find("[data-testid=plp-back-to-top-btn]")
                .should("not.exist")
            // cy.checkA11y(null, null, terminalLog, true)
        })
    })

    describe("When user scrolls beyond viewport length", () => {
        it("should display the back to top button", () => {
            cy.scrollTo(0, viewportLength + 10).wait(1000)

            const body = cy.get("body")
            body.then($body => {
                if ($body.find("[data-testid=country-selector-close-button]").length > 0) {
                    cy.get("[data-testid=country-selector-close-button]")
                        .click()
                        .wait(300)
                }

                if ($body.find("header").length > 0 && $body.find("[data-testid=header-cookie-consent]").length > 0) {
                    cy.get("[data-testid=header-cookie-consent]")
                        .find("[data-testid=header-cookie-consent-close]")
                        .click()
                        .wait(300)
                }
            })

            cy.get("#plp")
                .find("[data-testid=plp-back-to-top-btn]")
                .should("be.visible")

            // cy.checkA11y(null, null, terminalLog, true)
        })

        it("should scroll to top on back to top button click", () => {
            cy.scrollTo(0, viewportLength + 10).wait(1000)

            const body = cy.get("body")
            body.then($body => {
                if ($body.find("[data-testid=country-selector-close-button]").length > 0) {
                    cy.get("[data-testid=country-selector-close-button]")
                        .click()
                        .wait(300)
                }

                if ($body.find("header").length > 0 && $body.find("[data-testid=header-cookie-consent]").length > 0) {
                    cy.get("[data-testid=header-cookie-consent]")
                        .find("[data-testid=header-cookie-consent-close]")
                        .click()
                        .wait(300)
                }
            })

            cy.get("#plp")
                .find("[data-testid=plp-back-to-top-btn]")
                .click()
                .wait(1000)
            cy.get("#plp")
                .find("[data-testid=plp-back-to-top-btn]")
                .should("not.exist")

            // cy.checkA11y(null, null, terminalLog, true)
        })

        describe("and When user scrolls back to top", () => {
            it("should not display the back to top button", () => {
                cy.scrollTo(0, viewportLength + 10).wait(1000)
                cy.scrollTo(0, 0)
                cy.get("#plp")
                    .find("[data-testid=plp-back-to-top-btn]")
                    .should("not.exist")

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
