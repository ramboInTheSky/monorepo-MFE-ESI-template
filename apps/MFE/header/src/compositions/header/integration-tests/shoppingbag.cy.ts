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

import urls from "../../../config/urls"

const mobile = fixtures.devices.reduce((acc, next) => {
    return next.type === "mobile" ? acc.concat([next]) : acc
}, [])

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
                viewport.orientation.forEach(orientation => {
                    context("Given a header - ", function () {
                        describe(`when I browse to ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.preserveConsentCookies()
                            })

                            it("should show the shopping bag count", () => {
                                cy.get("[data-testid='header-shopping-bag']").should("contain.text", "")
                            })
                        })

                        describe(`When I browse to ${x.fixtures} header on ${viewport.device} ${orientation} and the Get Bag Event fires`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(300)
                                cy.preserveConsentCookies()
                            })

                            it("should navigate to the shopping bag page", () => {
                                cy.get("[data-testid='header-adaptive-checkout']").click()
                                cy.url().should("contains", urls.checkout.url)
                            })
                        })
                    })
                })
            })
        })

        tablet.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                viewport.orientation.forEach(orientation => {
                    context("Given a header - ", function () {
                        describe(`when I browse to ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.preserveConsentCookies()
                            })

                            it("should show the shopping bag count", () => {
                                cy.get("[data-testid='header-shopping-bag']").should("contain.text", "")
                            })
                        })

                        describe(`When I browse to ${x.fixtures} header on ${viewport.device} ${orientation} and the Get Bag Event fires`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(300)
                                cy.preserveConsentCookies()
                            })

                            it("should navigate to the shopping bag page", () => {
                                cy.get("[data-testid='header-adaptive-checkout']").click()
                                cy.url().should("contains", urls.checkout.url)
                            })
                        })
                    })
                })
            })
        })

        mobile.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                viewport.orientation.forEach(orientation => {
                    context("Given a header - ", function () {
                        describe(`when I browse to ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.preserveConsentCookies()
                            })

                            it("should show the shopping bag count", () => {
                                cy.get("[data-testid='header-shopping-bag']").should("contain.text", "")
                            })
                        })

                        describe(`When I browse to ${x.fixtures} header on ${viewport.device} ${orientation} and the Get Bag Event fires`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(100)
                                cy.preserveConsentCookies()
                            })

                            it("should navigate to the shopping bag page", () => {
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.url().should("contains", urls.shoppingBag.url)
                            })
                        })
                    })
                })
            })
        })
    })
})
