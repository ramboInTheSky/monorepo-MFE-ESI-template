/// <reference types="cypress" />
import internationalAcceptanceTestApiData from "../../../../__mocks__/internationalAcceptanceTestsApi"
import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const testPid = "1234"
const amidoHeaders = {
    "x-monorepo-language": "ar",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "ae",
}

TestFilter(["build"], () => {
    context("Given I am browsing on a international site a product summary tile at 1024", () => {
        describe("When I visit a url for a pid that exists", () => {
            beforeEach(() => {
                cy.viewport(1024, 500)
                cy.visit(`/productsummarycontainer/${internationalAcceptanceTestApiData.testProductItemNumber}`, {
                    headers: amidoHeaders,
                })
                cy.injectAxe()
            })

            it("should display the correct title", () => {
                cy.get(`[data-testid='product_summary_title']`).should("contain.text", `Matt Emulsion`)
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the star ratings", () => {
                cy.get("[data-testid='product_summary_star-rating']")
                    .should("be.visible")
                    .should("have.attr", "href")
                    .and("equal", "http://localhost:3333/g7190s5/962950#111111")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the colourway product image", () => {
                cy.get("[data-testid='product_summary_image_1111111']")
                    .should("be.visible")
                    .should("have.attr", "src")
                    .and(
                        "equal",
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/SearchAlt/224x336/1111111.jpg",
                    )
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
    context("Given I am browsing on a international site a product summary tile at 1024 with was and now pric", () => {
        describe("When I visit a url for a pid that exists", () => {
            beforeEach(() => {
                cy.viewport(1024, 500)
                cy.visit(`/productsummarycontainer/${internationalAcceptanceTestApiData.testProductItemNumber}`, {
                    headers: amidoHeaders,
                })
                cy.injectAxe()

                cy.get(`[data-testid='product_summary_colourchip_920427']`).trigger("mouseover")
            })

            it("should show a single was price and sale price", () => {
                cy.get(`[data-testid='product_summary_was_price']`).should("contain.text", "Was 5")

                cy.get(`[data-testid='product_summary_sale_price']`).should("contain.text", "Now 3")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the correct title", () => {
                cy.get(`[data-testid='product_summary_title']`).should("contain.text", `Matt Emulsion`)
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the star ratings", () => {
                cy.get("[data-testid='product_summary_star-rating']")
                    .should("be.visible")
                    .should("have.attr", "href")
                    .and("equal", "http://localhost:3333/g7190s5/962950#962950")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the colourway product image", () => {
                cy.get("[data-testid='product_summary_image_920427']")
                    .should("be.visible")
                    .should("have.attr", "src")
                    .and(
                        "equal",
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/SearchAlt/224x336/920427.jpg",
                    )
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
