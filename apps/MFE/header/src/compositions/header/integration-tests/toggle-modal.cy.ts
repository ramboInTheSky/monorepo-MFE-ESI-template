// tablets => landscape, desktop
/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
var fixtures = require("@monorepo/cypress-fixtures")
const amidoHeaders = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "GB",
    "x-monorepo-siteurl": "http://localhost:3333",
    "test-with-local-esi": "true",
}

fixtures.realmTypeAmido = "amido"

const headerAndFixture = [{header: amidoHeaders, fixtures: fixtures.realmTypeAmido}]

const tablet = fixtures.devices.reduce((acc, next) => {
    return next.type === "tablet" ? acc.concat([next]) : acc
}, [])

const desktop = fixtures.devices.reduce((acc, next) => {
    return next.type === "desktop" ? acc.concat([next]) : acc
}, [])

headerAndFixture.forEach(x => {
    context(`Given a header - Shopping bag - ${x.fixtures} realm`, function () {
        desktop.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                const portrait = viewport.orientation.filter(x => x === "portrait")
                portrait.forEach(orientation => {
                    context("Given a header - ", function () {
                        describe(`when I browse to ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:bag.json")
                                cy.route(
                                    "GET",
                                    "/ChannelSelector/GetCountrySelection",
                                    "fixture:get-country-selection.json",
                                )
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(300)
                                cy.preserveConsentCookies()
                            })

                            // country selector with shopping bag a
                            it("should not show the mini shopping modal when country selector is clicked", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.wait(300)
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("be.visible")

                                cy.get("[data-testid='header-country-lang-flag']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.visible")
                            })

                            // my account with shopping bag and searchbox
                            it("should not show shopping bag modal when country selector is clicked", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.wait(300)
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("be.visible")

                                cy.get("[data-testid='header-adaptive-my-account']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.visible")
                            })

                            it("should not show my recent search overlay when my account is clicked", () => {
                                cy.get("[data-testid='header-big-screen-search']").click()
                                cy.get('input[id="header-big-screen-search-box"]').type("dress")
                                cy.get("[data-testid='searchBar-suggestions']").should("be.visible")

                                cy.get("[data-testid='header-adaptive-my-account']").click()
                                cy.get("[data-testid='searchBar-suggestions']").should("not.visible")
                            })

                            // shopping bag with my account and search box
                            it("should not show search box overlay when shopping bag is clicked", () => {
                                cy.get("[data-testid='header-big-screen-search']").click()
                                cy.get('input[id="header-big-screen-search-box"]').type("dress")
                                cy.get("[data-testid='searchBar-suggestions']").should("be.visible")

                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.get("[data-testid='searchBar-suggestions']").should("not.visible")
                            })

                            // searchbox with shopping bag and my account
                            it("should not show shopping bag modal when search box is clicked", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("be.visible")

                                cy.get("[data-testid='header-big-screen-search']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.visible")
                            })
                        })
                    })
                })
            })
        })

        tablet.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                const landscape = viewport.orientation.filter(x => x === "landscape")
                landscape.forEach(orientation => {
                    context("Given a header - ", function () {
                        describe(`when I browse to ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:bag.json")
                                cy.route(
                                    "GET",
                                    "/ChannelSelector/GetCountrySelection",
                                    "fixture:get-country-selection.json",
                                )
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(300)
                                cy.preserveConsentCookies()
                            })

                            // country selector with shopping bag
                            it("should not show the mini shopping modal when country selector is clicked", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.wait(300)
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("be.visible")

                                cy.get("[data-testid='header-country-lang-flag']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.visible")
                            })

                            // my account with shopping bag and searchbox
                            it("should not show shopping bag modal when country selector is clicked", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.wait(300)
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("be.visible")

                                cy.get("[data-testid='header-adaptive-my-account']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.visible")
                            })

                            it("should not show my recent search overlay when my account is clicked", () => {
                                cy.get("[data-testid='header-big-screen-search']").click()
                                cy.get('input[id="header-big-screen-search-box"]').type("dress")
                                cy.get("[data-testid='searchBar-suggestions']").should("be.visible")

                                cy.get("[data-testid='header-adaptive-my-account']").click()
                                cy.get("[data-testid='searchBar-suggestions']").should("not.visible")
                            })

                            // shopping bag with my account and search box
                            it("should not show search box overlay when shopping bag is clicked", () => {
                                cy.get("[data-testid='header-big-screen-search']").click()
                                cy.get('input[id="header-big-screen-search-box"]').type("dress")
                                cy.get("[data-testid='searchBar-suggestions']").should("be.visible")

                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.get("[data-testid='searchBar-suggestions']").should("not.visible")
                            })

                            // searchbox with shopping bag
                            it("should not show shopping bag modal when search box is clicked", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("be.visible")

                                cy.get("[data-testid='header-big-screen-search']").click()
                                cy.get('input[id="header-big-screen-search-box"]').type("dress")
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.visible")
                            })
                        })
                    })
                })
            })
        })
    })
})
