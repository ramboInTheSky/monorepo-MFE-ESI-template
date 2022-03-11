/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

TestFilter(["build"], () => {
    context("plp - Sort", function() {
        describe("when shopping for any category on a mobile", () => {
            it("should a sort menu", () => {
                cy.injectAxe()
                cy.viewport(768, 500)
                cy.visit("/shop/test-category", {
                    headers: amidoHeaders,
                })
                const button = cy.get("[data-testid='plp-menu-button-sort']")
                button.should("be.visible").contains("SORT", {matchCase: false})

                button.click()
                cy.wait(100)
                cy.get("[data-testid='plp-menu-options-sort']")
                    .should("be.visible")
                    .and("contain.text", "Price: Low - High")

                cy.get("[data-testid='plp-menu-options-sort']")
                    .contains("Price: Low - High")
                    .click()

                cy.location("href").should("contain", "/isort-price")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    context("plp - Sort", function() {
        describe("when shopping for any category on a desktop", () => {
            it("should a sort menu", () => {
                cy.injectAxe()
                cy.viewport(1280, 500)
                cy.visit("/shop/test-category", {
                    headers: amidoHeaders,
                })
                const button = cy.get("#desktop-sort-select-input")
                button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})

                button.click()
                cy.wait(100)
                cy.get("li")
                    .contains("Price: Low - High")
                    .should("be.visible")
                    .and("contain.text", "Price: Low - High")

                cy.get("li")
                    .contains("Price: Low - High")
                    // Component is a MUI Portal - detatched from DOM
                    .click({force: true})

                cy.location("href").should("contain", "/isort-price")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})

TestFilter(["postdeploy"], () => {
    context("plp - Sort", function() {
        describe("when shopping for any category on a mobile", () => {
            it("should a sort menu", () => {
                cy.injectAxe()
                cy.viewport(768, 500)
                cy.visit("/shop/department-homeware-productaffiliation-kitchen-0", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": "amido",
                        "x-monorepo-territory": "gb",
                        "test-with-local-esi": "true",
                    },
                })

                cy.wait(1000)

                cy.closeCountrySelectorAndCookies()

                const button = cy.get("[data-testid='plp-menu-button-sort']")
                button.should("be.visible").contains("SORT", {matchCase: false})

                button.click()
                cy.wait(100)
                cy.get("[data-testid='plp-menu-options-sort']")
                    .should("be.visible")
                    .and("contain.text", "Price: Low - High")

                cy.get("[data-testid='plp-menu-options-sort']")
                    .contains("Price: Low - High")
                    .click()

                cy.location("href").should("contain", "/isort-price")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["postdeploy"], () => {
    context("plp - Sort", function() {
        describe("when shopping for any category on a desktop", () => {
            it("should a sort menu", () => {
                cy.injectAxe()
                cy.viewport(1280, 500)
                cy.visit("/shop/department-homeware-productaffiliation-kitchen-0", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": "amido",
                        "x-monorepo-territory": "gb",
                        "test-with-local-esi": "true",
                    },
                })

                cy.wait(1000)

                cy.closeCountrySelectorAndCookies()

                const button = cy.get("#desktop-sort-select-input")
                button.should("be.visible").should("have.value", "Most Relevant", {matchCase: false})

                button.click({force: true})
                cy.wait(100)
                cy.get("li")
                    .contains("Price: Low - High")
                    .should("be.visible")
                    .and("contain.text", "Price: Low - High")

                cy.get("li")
                    .contains("Price: Low - High")
                    // Component is a MUI Portal - detatched from DOM
                    .click({force: true})

                cy.location("href").should("contain", "/isort-price")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
