/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
var fixtures = require("@monorepo/cypress-fixtures")
const headers = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "GB",
    "x-monorepo-siteurl": "http://localhost:3333",
    "test-with-local-esi": "true",
}

context("Given a header - Favourites", function () {
    describe("When I browse to header with a width of 1024 ", () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.visit("/headercontainer", {headers: headers})
            // cy.preserveConsentCookies()
        })

        it("should show the favourites alert notification", () => {
            cy.get("[data-testid='header-favourites']").should("not.have.class", "hasFavourites")
        })
    })
    describe("When I browse to header with a width of 1024 and the Get Favourites Event fires with items returned", () => {
        const favData = {ShoppingListItems: [{test: "test"}]}
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.visit("/headercontainer", {headers: headers})
            cy.wait(100)
            cy.window().then((win: any) =>
                win.subjects["$ FAVOURITES_GET_CALLBACK"].next({
                    success: true,
                    data: favData,
                    status: 200,
                    textStatus: "test",
                    eventId: "test",
                }),
            )
            // cy.preserveConsentCookies()
        })

        it("should show the favourites count", () => {
            cy.get("[data-testid='header-favourites']")
                .find("img")
                .should("have.attr", "src")
                .should("include", "icons/header/amido/default/favourites-active.svg")
        })

        it("should set the AmidoFavourites windows", () => {
            cy.window().its("AmidoFavourites.Data").should("equal", favData)
        })
    })
    describe("When I browse to header with a width of 1024 and the Get Favourites Event fires with no items returned", () => {
        const favData = {ShoppingListItems: []}
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.visit("/headercontainer", {headers: headers})
            cy.wait(100)
            cy.window().then((win: any) =>
                win.subjects["$ FAVOURITES_GET_CALLBACK"].next({
                    success: true,
                    data: favData,
                    status: 200,
                    textStatus: "test",
                    eventId: "test",
                }),
            )
            // cy.preserveConsentCookies()
        })

        it("should show the favourites count", () => {
            cy.get("[data-testid='header-favourites']")
                .find("img")
                .should("have.attr", "src")
                .should("include", "icons/header/amido/default/favourites-inactive.svg")
        })

        it("should default the window AmidoFavourites", () => {
            const defaultAmidoFavouritesObject = {}
            cy.window().its("AmidoFavourites").should("be", defaultAmidoFavouritesObject)
        })
    })
})
