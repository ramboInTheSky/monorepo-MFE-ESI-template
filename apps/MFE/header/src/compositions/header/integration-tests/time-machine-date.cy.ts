/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
const headers = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
    "x-monorepo-siteurl": "http://localhost:3333",
    "test-with-local-esi": "true",
}
context("Time Machine", function () {
    beforeEach(() => {
        cy.clearCookie("time-machine-date")
    })

    describe("when loaded with time machine cookie", () => {
        it("should show the time machine date identifier with time machine date", () => {
            cy.viewport("macbook-13")
            cy.setCookie("time-machine-date", "2021-04-24T08:50")
            cy.visit("/headercontainer", {
                headers,
            })
            cy.get("[data-testid='time-machine-date']").should("be.visible")
        })
    })

    describe("when loaded without time machine cookie", () => {
        it("should not show the time machine date identifier", () => {
            cy.viewport("macbook-13")
            cy.visit("/headercontainer", {
                headers,
            })
            cy.get("[data-testid='time-machine-date']").should("not.be.visible")
        })
    })
})
