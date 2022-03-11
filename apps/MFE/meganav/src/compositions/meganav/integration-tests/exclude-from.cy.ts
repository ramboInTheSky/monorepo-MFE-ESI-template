/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />

context("MegaNav - Exclude From", function () {
    describe("when on desktop", () => {
        it("it should hide wide excluded Primary nav items", () => {
            cy.viewport("macbook-13")
            cy.visit("/meganavcontainer", {
                headers: {
                    "x-monorepo-language": "en",
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-siteurl": "http://localhost:3333",
                },
            })
            cy.get("[data-testid='meganav']").should("be.visible")
            cy.get("[data-testid='meganav']").contains("Exclude Wide").should("not.be.visible")
            cy.get("[data-testid='meganav']").contains("Exclude Narrow").should("be.visible")

            cy.get("[data-testid='primary-meganav']").contains("Exclude Narrow").trigger("mouseover")
            cy.get("[data-testid='sec-nav-content']").should("contain.text", "The Mens Shop")
            cy.get("[data-testid='sec-nav-content']").should("not.contain.text", "Mens Exclude Wide")
        })
    })

    describe("when on mobile", () => {
        it("it should hide narrow excluded Primary nav items", () => {
            cy.viewport("iphone-6+")
            cy.visit("/meganavcontainer", {
                headers: {
                    "x-monorepo-language": "en",
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-siteurl": "http://localhost:3333",
                },
            })
            cy.get("[data-testid='meganav']").should("be.visible")
            cy.get("[data-testid='meganav']").contains("Exclude Wide").should("be.visible")
            cy.get("[data-testid='meganav']").contains("Exclude Narrow").should("not.be.visible")

            cy.get("[data-testid='primary-meganav']").contains("Exclude Wide").trigger("click")
            cy.get("[data-testid='sec-nav-content']").should("contain.text", "Mens Exclude Wide")
            cy.get("[data-testid='sec-nav-content']").should("not.contain.text", "Mens Exclude Narrow")
        })
    })
})
