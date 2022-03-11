/// <reference types="cypress" />
import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const amidoHeaders = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
}

context("Given I am browsing a product summary tile at 1024", () => {
    TestFilter(["build"], () => {
        describe("When I visit a search path", () => {
            it("should add cache tag response headers", () => {
                cy.injectAxe()
                cy.request("http://localhost:3009/search?w=Red", {headers: amidoHeaders})
                    .as("request")
                    .wait(1000)
                cy.get("@request").should((response: any) => {
                    expect(response).to.have.property("headers")
                    expect(response.headers["cache-control"]).to.equal("public, no-transform, no-store")
                })

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When I visit a shop path", () => {
            it("should add cache tag response headers", () => {
                cy.injectAxe()
                cy.request("http://localhost:3009/shop/gender-women-productaffiliation-coatsandjackets", {
                    headers: amidoHeaders,
                })
                    .as("request")
                    .wait(333)
                cy.get("@request").should((response: any) => {
                    expect(response).to.have.property("headers")
                    expect(response.headers["cache-control"]).to.equal("public, no-transform, max-age=3600")
                })

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
