/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
const fixtures = require("@monorepo/cypress-fixtures")

const generalRegions = [
    {
        testid: "header-adaptive-brand",
        title: "Brand",
    },
    {
        testid: "header-adaptive-search",
        title: "Search box",
    },
    {
        testid: "header-adaptive-my-account",
        title: "Quick link my account",
    },
    {
        testid: "header-adaptive-checkout",
        title: "Checkout",
    },
    {
        testid: "header-favourites",
        title: "Favourites",
    },
    {
        testid: "header-shopping-bag",
        title: "Shopping bag",
    },
    {
        testid: "header-country-lang-selector",
        title: "Country Lang Selector",
    },
    {
        testid: "header-meganav",
        title: "MegaNav",
    },
]
const regions = [
    {realm: "amido", regions: generalRegions, hasRtl: true}
]
const rtlRealms = ["amido"]

context("Header - Default", function () {
    describe("when loaded with wrong headers", () => {
        it("should show the Main error", () => {
            cy.visit("/headercontainer", {
                headers: {
                    "x-monorepo-language": "batman",
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "spiderman",
                    "x-monorepo-siteurl": "http://localhost:3333",
                    "test-with-local-esi": "true",
                },
            })
            cy.get("[data-testid='header-upperheader']").should("not.be.visible")
        })
    })
    describe("when loaded with NO headers", () => {
        it("should show the Main error", () => {
            cy.visit("/headercontainer", {
                headers: {
                    "test-with-local-esi": "true",
                },
            })
            cy.get("[data-testid='header-upperheader']").should("not.be.visible")
        })
    })
})

regions.forEach(({realm, regions, hasRtl}) => {
    context(`Header - ${realm} realm`, () => {
        //TODO: Change these to Visual Testing
        fixtures.devices.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                viewport.orientation.forEach(orientation => {
                    beforeEach(() => {
                        cy.viewport(viewport.device, orientation)
                    })
                    it(`should show the header on ${orientation} as left to right`, () => {
                        cy.visit("/headercontainer", {
                            headers: {
                                "x-monorepo-language": fixtures.settings.gb.language,
                                "x-monorepo-realm": realm,
                                "x-monorepo-territory": fixtures.settings.gb.territory,
                                "x-monorepo-siteurl": "http://localhost:3333",
                                "test-with-local-esi": "true",
                            },
                        })
                        cy.preserveConsentCookies()
                        cy.get("[data-testid='header-upperheader']").should("be.visible")
                    })
                    if (hasRtl) {
                        it(`should show the header on ${orientation} as right to left`, () => {
                            cy.visit("/headercontainer", {
                                headers: {
                                    "x-monorepo-language": fixtures.settings.saRTL.language,
                                    "x-monorepo-realm": realm,
                                    "x-monorepo-territory": fixtures.settings.saRTL.territory,
                                    "x-monorepo-siteurl": "http://localhost:3333",
                                    "test-with-local-esi": "true",
                                },
                            })
                            cy.preserveConsentCookies()
                            cy.get("[data-testid='header-upperheader']").should("be.visible")
                        })
                    }
                })
            })
        })

        describe(`when loaded with ${realm} Header and LTR headers`, () => {
            beforeEach(() => {
                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": fixtures.settings.gb.language,
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": fixtures.settings.gb.territory,
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })
                cy.preserveConsentCookies()
            })
            it("should show the dir='ltr'", () => {
                cy.get("[dir='ltr']").should("be.visible")
            })
            regions.forEach(({testid, title}) => {
                it(`should show the ${title} section`, () => {
                    cy.get(`[data-testid='${testid}']`).should("be.visible")
                })
            })
        })

        if (hasRtl) {
            describe(`when loaded with ${realm} Header and RTL headers`, () => {
                beforeEach(() => {
                    cy.visit("/headercontainer", {
                        headers: {
                            "x-monorepo-language": fixtures.settings.saRTL.language,
                            "x-monorepo-realm": realm,
                            "x-monorepo-territory": fixtures.settings.saRTL.territory,
                            "x-monorepo-siteurl": "http://localhost:3333",
                            "test-with-local-esi": "true",
                        },
                    })
                    cy.preserveConsentCookies()
                })
                it("should show the dir='rtl'", () => {
                    cy.get("[dir='rtl']").should("be.visible")
                })
                regions.forEach(({testid, title}) => {
                    it(`should show the ${title} section`, () => {
                        cy.get(`[data-testid='${testid}']`).should("be.visible")
                    })
                })
            })
        }
    })
})
