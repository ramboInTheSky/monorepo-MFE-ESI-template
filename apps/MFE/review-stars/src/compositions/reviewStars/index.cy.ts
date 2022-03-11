/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />

context("reviewstars", function () {
    describe("when loaded with wrong headers", () => {
        it("should show the Main error", () => {
            cy.visit("/reviewstarscontainer/1234", {
                headers: {
                    "x-monorepo-language": "batman",
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "spiderman",
                },
            })
            cy.get("[data-testid='error']").should("be.visible")
        })
    })
    describe("when loaded with NO headers", () => {
        it("should show the Main error", () => {
            cy.visit("/reviewstarscontainer/1234")
            cy.get("[data-testid='error']").should("be.visible")
        })
    })
})
