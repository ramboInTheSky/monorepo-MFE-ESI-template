/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
var fixtures = require("@monorepo/cypress-fixtures")
var siteUrl = "http://localhost:3333"

const amidoHeadersGB = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
    "x-monorepo-siteurl": siteUrl,
    "test-with-local-esi": "true",
}

const amidoHeadersMX = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "mx",
    "x-monorepo-siteurl": siteUrl,
    "test-with-local-esi": "true",
}

fixtures.realmTypeamido = "amido"

const mobile = fixtures.devices.reduce((acc, next) => {
    return next.type === "mobile" ? acc.concat([next]) : acc
}, [])

const tablet = fixtures.devices.reduce((acc, next) => {
    return next.type === "tablet" ? acc.concat([next]) : acc
}, [])

const desktop = fixtures.devices.reduce((acc, next) => {
    return next.type === "desktop" ? acc.concat([next]) : acc
}, [])

const devices = [desktop, tablet, mobile]
const amidoHeaders = [amidoHeadersGB, amidoHeadersMX]

context("Given a header - ", function () {
    devices.forEach(device => {
        device.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                beforeEach(() => {
                    cy.clearCookies()
                    cy.server()
                    cy.wait(200)
                    cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
                })
                viewport.orientation.forEach(orientation => {
                    amidoHeaders.forEach(headers => {
                        const territory = headers["x-monorepo-territory"]
                        const cookieName = territory === "gb" ? "AmidoConsentCookie" : "AmidoDirectConsentCookie"
                        const privacyUrl = territory === "gb" ? "/privacy" : "/privacypolicy"

                        context("Given a header - ", function () {
                            describe(`when loaded with ${fixtures.realmTypeamido} headers and territory ${territory} on ${viewport.device} ${orientation}`, () => {
                                beforeEach(() => {
                                    cy.viewport(viewport.device, orientation)
                                    cy.visit("/headercontainer", {headers: headers})
                                })

                                it("should show cookie pop up", () => {
                                    cy.get("[data-testid='header-cookie-consent']").should("be.visible")
                                })

                                it("should close pop up on icon click", () => {
                                    cy.get("[data-testid='header-cookie-consent-close']").click()
                                    cy.get("[data-testid='header-cookie-consent']").should("not.visible")
                                })

                                it("should generate cookie", () => {
                                    cy.get("[data-testid='header-cookie-consent']").should("be.visible")
                                    cy.getCookie(cookieName).should(
                                        "have.property",
                                        "value",
                                        "AllowCookiesFromAmido=True",
                                    )
                                })

                                it("should navigate to /privacy", () => {
                                    cy.get("[data-testid='header-cookie-consent-privacy-link']").click()
                                    cy.location("pathname").should("eq", privacyUrl)
                                })
                            })

                            describe("Existing cookie", () => {
                                beforeEach(() => {
                                    cy.setCookie(cookieName, "AllowCookiesFromAmido=True")
                                    cy.viewport(viewport.device, orientation)
                                    cy.visit("/headercontainer", {headers: headers})
                                })
                                it("should not show pop up if existing cookie", () => {
                                    cy.get("[data-testid='header-cookie-consent']").should("not.visible")
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
