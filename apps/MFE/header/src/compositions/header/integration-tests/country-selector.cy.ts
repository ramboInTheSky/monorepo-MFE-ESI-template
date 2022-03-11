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

const amidoHeadersFR = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "fr",
    "x-monorepo-siteurl": siteUrl,
    "test-with-local-esi": "true",
}


import {mockShoppingBag} from "../../../../__mocks__/mockStore"
import {ShoppingBag} from "../../../models/shoppingbag"
import urls from "../../../config/urls"

const bag = mockShoppingBag.bag
const emptyBag = {
    ...bag,
    ItemCount: 0,
    Items: [],
} as ShoppingBag
const shoppingBagUrl = urls.shoppingBag.url

fixtures.realmTypeAmido = "amido"

const mobile = fixtures.devices.reduce((acc, next) => {
    return next.type === "mobile" ? acc.concat([next]) : acc
}, [])

const tablet = fixtures.devices.reduce((acc, next) => {
    return next.type === "tablet" ? acc.concat([next]) : acc
}, [])

const desktop = fixtures.devices.reduce((acc, next) => {
    return next.type === "desktop" ? acc.concat([next]) : acc
}, [])

context("Given a header - country language selector", function () {
    desktop.forEach(viewport => {
        describe(`${viewport.type} - ${viewport.device}`, () => {
            beforeEach(() => {
                cy.server()
                cy.route("GET", "/ChannelSelector/GetCountrySelection", "fixture:get-country-selection.json")
            })
            viewport.orientation.forEach(orientation => {
                context("Given a header - ", function () {
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device}`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersGB})
                            cy.preserveConsentCookies()
                        })

                        it(`should have link to countryselect page for ROW countries`, () => {
                            cy.get("[data-testid='header-country-lang-flag']").click()
                            cy.wait(100)
                            cy.get("[data-testid='country-selector-ROWLink']").should(
                                "have.attr",
                                "href",
                                "http://localhost:3333/countryselect",
                            )
                        })
                    })
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device}`, () => {
                        it(`should only show English language button for Mexico`, () => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersMX})
                            cy.get("[data-testid='header-country-lang-flag']").click()
                            cy.wait(100)
                            cy.get("[data-testid='country-selector-language-button-0']").should("exist")
                            cy.get("[data-testid='country-selector-language-button-0']").should("have.text", "English")
                            cy.get("[data-testid='country-selector-language-button-1']").should("not.exist")
                        })
                    })
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device}`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersGB})
                            cy.preserveConsentCookies()
                        })

                        it(`should show the UK flag image`, () => {
                            cy.get("[data-testid='header-country-lang-flag']")
                                .should("have.attr", "src")
                                .and("match", /\/icons\/shared\/countryflags\/gb.png/)
                        })
                    })
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device} and clicked on the country selector`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersGB})
                            cy.preserveConsentCookies()
                            cy.get("[data-testid='header-country-lang-flag']").click()
                        })
                        it(`should show the drawer`, () => {
                            cy.get("[data-testid='header-drawer-country-selector']").should("exist")
                        })
                    })
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device}`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersFR})
                            cy.preserveConsentCookies()
                        })

                        it(`should show the FR flag image`, () => {
                            cy.get("[data-testid='header-country-lang-flag']")
                                .should("have.attr", "src")
                                .and("match", /\/icons\/shared\/countryflags\/fr.png/)
                        })
                    })
                })
            })
        })
    })
    tablet.forEach(viewport => {
        describe(`${viewport.type} - ${viewport.device}`, () => {
            viewport.orientation.forEach(orientation => {
                const isPortrait = orientation === "portrait"
                const not = orientation === "portrait" ? "" : "not"
                context("Given a header - ", function () {
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device} ${orientation}`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersGB})
                            cy.preserveConsentCookies()
                        })

                        it(`should ${not} show the UK flag image`, () => {
                            isPortrait
                                ? cy

                                      .get("[data-testid='header-country-lang-flag']")
                                      .should("have.attr", "src")
                                      .and("match", /\/icons\/shared\/countryflags\/gb.png/)
                                : cy
                                      .get("[data-testid='header-country-lang-flag']")
                                      .should("have.attr", "src")
                                      .and("match", /\/icons\/shared\/countryflags\/gb.png/)
                        })
                    })

                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device} and clicked on the country selector`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersGB})
                            cy.preserveConsentCookies()
                            cy.get("[data-testid='header-country-lang-flag']").click()
                        })
                        it(`should show the drawer`, () => {
                            cy.get("[data-testid='header-drawer-country-selector']").should("exist")
                        })
                    })

                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device}`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersFR})
                            cy.preserveConsentCookies()
                        })

                        it(`should show the FR flag image`, () => {
                            cy.get("[data-testid='header-country-lang-flag']")
                                .should("have.attr", "src")
                                .and("match", /\/icons\/shared\/countryflags\/fr.png/)
                        })
                    })
                })
            })
        })
    })
    mobile.forEach(viewport => {
        describe(`${viewport.type} - ${viewport.device}`, () => {
            viewport.orientation.forEach(orientation => {
                const isPortrait = orientation === "portrait"
                const not = orientation === "portrait" ? "" : "not"
                context("Given a header - ", function () {
                    describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device} ${orientation}`, () => {
                        beforeEach(() => {
                            cy.viewport(viewport.device, orientation)
                            cy.visit("/headercontainer", {headers: amidoHeadersGB})
                            cy.preserveConsentCookies()
                        })

                        it(`should ${not} show the UK flag image`, () => {
                            isPortrait
                                ? cy

                                      .get("[data-testid='header-country-lang-flag']")
                                      .should("have.attr", "src")
                                      .and("match", /\/icons\/shared\/countryflags\/gb.png/)
                                : cy
                                      .get("[data-testid='header-country-lang-flag']")
                                      .should("have.attr", "src")
                                      .and("match", /\/icons\/shared\/countryflags\/gb.png/)
                        })

                        describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device} and clicked on the country selector`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: amidoHeadersGB})
                                cy.preserveConsentCookies()
                                cy.get("[data-testid='header-country-lang-flag']").click()
                            })
                            it(`should show the drawer`, () => {
                                cy.get("[data-testid='header-drawer-country-selector']").should("exist")
                            })
                        })

                        describe(`when loaded with ${fixtures.realmTypeAmido} headers on ${viewport.device}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: amidoHeadersFR})
                                cy.preserveConsentCookies()
                            })

                            it(`should show the FR flag image`, () => {
                                cy.get("[data-testid='header-country-lang-flag']")
                                    .should("have.attr", "src")
                                    .and("match", /\/icons\/shared\/countryflags\/fr.png/)
                            })
                        })
                    })
                })
            })
        })
    })

    describe(`When the page loads and a country redirect event is triggered`, () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.server()
            cy.route("GET", "/ChannelSelector/GetCountrySelection", "fixture:get-country-selection.json")

            cy.visit("/headercontainer", {headers: amidoHeadersGB})
            cy.preserveConsentCookies()
            cy.wait(100)
            cy.window().then((win: any) =>
                win.subjects["$ COUNTRY_SELECTOR_OPEN"].next({
                    isoCountryCode: "SA",
                }),
            )
        })

        it(`should show the drawer`, () => {
            cy.get("[data-testid='header-drawer-country-selector']").should("exist")
        })

        it("should default to Saudi Arabi", () => {
            cy.get("#mui-component-select-country-selector-select").should("contain.text", "Saudi Arabia")
        })

        it(`should open the confirmation modal if the "Shop Now" button is clicked`, () => {
            cy.get("[data-testid=country-selector-CTA-button]").should("exist")
            cy.get("[data-testid=country-selector-CTA-button]").should("contain.text", "Shop now")

            cy.get("[data-testid=country-selector-CTA-button]").click()

            cy.get("[data-testid=header-country-change-modal-wrapper]").should("exist")
            cy.get("[data-testid=header-country-change-modal-cancel]").should("exist")
            cy.get("[data-testid=header-country-change-modal-confirm]").should("exist")
        })

        it(`should close the confirmation modal if the "Cancel" button is clicked`, () => {
            cy.get("[data-testid=country-selector-CTA-button]").should("exist")

            cy.get("[data-testid=country-selector-CTA-button]").click()

            cy.get("[data-testid=header-country-change-modal-cancel]").should("exist")
            cy.get("[data-testid=header-country-change-modal-cancel]").click()

            cy.wait(500)
            cy.get("[data-testid=header-country-lang-flag]").should("exist")
        })

        it(`should redirect if the "Continue" button is clicked`, () => {
            cy.get("[data-testid=country-selector-CTA-button]").should("exist")

            cy.get("[data-testid=country-selector-CTA-button]").click()

            cy.get("[data-testid=header-country-change-modal-confirm]").should("exist")
            cy.get("[data-testid=header-country-change-modal-confirm]").click()

            cy.wait(500)
            cy.get("[data-testid=header-country-lang-flag]").should("not.exist")
        })
    })

    describe(`When the page loads and a the user wishes to change languages`, () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.server()
            cy.route("GET", "/ChannelSelector/GetCountrySelection", "fixture:get-country-selection.json")

            cy.visit("/headercontainer", {headers: amidoHeadersFR})
            cy.preserveConsentCookies()
            cy.wait(100)
            cy.window().then((win: any) =>
                win.subjects["$ COUNTRY_SELECTOR_OPEN"].next({
                    isoCountryCode: "FR",
                }),
            )
        })

        it(`should not trigger the modal if just the language has been changed`, () => {
            cy.wait(500)
            cy.get("[data-testid=country-selector-language-button-0]").should("exist")
            cy.get("[data-testid=country-selector-language-button-0]").click()

            cy.get("[data-testid=country-selector-CTA-button]").should("exist")

            cy.get("[data-testid=country-selector-CTA-button]").click()

            cy.wait(500)
            cy.get("[data-testid=header-country-lang-flag]").should("not.exist")
        })

        it(`should not trigger a redirect if the user just gets back to the initial lanugage`, () => {
            cy.wait(500)
            cy.get("[data-testid=country-selector-language-button-1]").should("exist")
            cy.get("[data-testid=country-selector-language-button-1]").click()

            cy.get("[data-testid=country-selector-CTA-button]").should("exist")

            cy.get("[data-testid=country-selector-CTA-button]").click()

            cy.wait(500)
            cy.get("[data-testid=header-country-lang-flag]").should("exist")
        })
    })

    describe(`When the shopping bag is empty`, () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.visit("/headercontainer", {headers: amidoHeadersGB})
            cy.preserveConsentCookies()
            cy.wait(300)
            cy.window().then((win: any) =>
                win.subjects["$ COUNTRY_SELECTOR_OPEN"].next({
                    isoCountryCode: "SA",
                }),
            )
            cy.window().then((win: any) =>
                win.subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
                    success: false,
                    data: {ShoppingBag: {...bag}},
                    isoCountryCode: "SA",
                }),
            )
        })

        it(`should not show the confirmation modal if there is nothing in the bag`, () => {
            cy.wait(500)
            cy.get("[data-testid=country-selector-CTA-button]").should("exist")

            cy.get("[data-testid=country-selector-CTA-button]").click()
            cy.wait(300)
            cy.get("[data-testid=header-country-lang-flag]").should("not.exist")
        })
    })

    describe(`When the page loads with an ipadress different to the current territory`, () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.server()
            cy.route("GET", "/ChannelSelector/GetCountrySelection", "fixture:get-country-selection.json")
            cy.visit("/headercontainer?ipaddress=SAUDI_ARABIA", {headers: amidoHeadersGB})
        })

        it(`should show the drawer`, () => {
            cy.get("[data-testid='header-drawer-country-selector']").should("exist")
        })

        it("should default to Saudi Arabi", () => {
            cy.get("#mui-component-select-country-selector-select").should("contain.text", "Saudi Arabia")
        })
    })

    describe(`When the page loads and a country alternative language redirect event is triggered`, () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.server()
            cy.route("GET", "/ChannelSelector/GetCountrySelection", "fixture:get-country-selection.json")

            cy.visit("/headercontainer", {headers: amidoHeadersFR})
            cy.preserveConsentCookies()
            cy.wait(100)
            cy.window().then((win: any) => win.subjects["$ COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE"].next())
        })

        it("should redirect to the french language site", () => {
            cy.url().should("eq", "http://localhost:3333/fr/fr")
        })
    })
})
