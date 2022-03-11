/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
var siteUrl = "http://localhost:3333"

const amidoHeadersFR = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "fr",
    "x-monorepo-siteurl": siteUrl,
    "test-with-local-esi": "true",
}

const amidoHeadersAM = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "am",
    "x-monorepo-siteurl": siteUrl,
    "test-with-local-esi": "true",
}

// TODO: Remove .skip and use territory to determine behaviour for Cy test.
// This is a temporary measure while Batch 1 Features aren't enabled in any territories in master, ahead of the release.
// PBI35206 - https://dev.azure.com/Amido-Ecommerce/Amido.Ecommerce.TeamModernisation/_workitems/edit/35206/

context.skip("Given a header - ", function () {
    describe("when user consent management is enabled", () => {
        beforeEach(() => {
            cy.server()
            cy.wait(200)
            cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
        })
        describe("and no previous cookie set", () => {
            beforeEach(() => {
                cy.visit("/headercontainer", {headers: amidoHeadersFR})
            })
            it("should show user consent management cookie pop up", () => {
                cy.get("#onetrust-banner-sdk").should("be.visible")
            })
        })

        describe("and consent cookie already set", () => {
            beforeEach(() => {
                cy.visit("/headercontainer", {headers: amidoHeadersFR})
                cy.setCookie("AmidoConsentCookie", "AllowCookiesFromAmido=True")
                cy.reload()
            })
            it("should not show pop up if existing cookie", () => {
                cy.get("#onetrust-banner-sdk").should("not.visible")
            })
        })
    })
    describe("when user consent management is disabled", () => {
        beforeEach(() => {
            cy.visit("/headercontainer", {headers: amidoHeadersAM})
        })
        describe("and no previous cookie set", () => {
            it("should show next cookie pop up", () => {
                cy.get("[data-testid='header-cookie-consent']").should("be.visible")
            })
        })
    })
})
