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

const headerAndFixture = [
    {header: amidoHeaders, fixtures: fixtures.realmTypeAmido},
]

import {ShoppingBag} from "../../../models/shoppingbag"
import {mockShoppingBag} from "../../../../__mocks__/mockStore"
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

const bag = mockShoppingBag.bag
const emptyBag = {
    ...bag,
    ItemCount: 0,
    Items: [],
} as ShoppingBag
const shoppingBagUrl = urls.shoppingBag.url

const secondItemDescription = bag.Items[1].Description

headerAndFixture.forEach(x => {
    context(`mini shopping Bag - ${x.fixtures} realm`, function () {
        desktop.forEach(viewport => {
            describe(`${viewport.type} - ${viewport.device}`, () => {
                viewport.orientation.forEach(orientation => {
                    context("Given a header - ", function () {
                        describe(`when loaded with ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(200)
                                cy.preserveConsentCookies()
                                cy.get("[data-testid='header-shopping-bag']").click()
                            })

                            it(`should show the mini shopping bag count`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should(
                                    "contain.text",
                                    "0 Items In Bag",
                                )
                            })

                            it(`should show the mini shopping bag empty bag text`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-empty']").should(
                                    "contain.text",
                                    "Your shopping bag is empty",
                                )
                            })
                        })

                        describe(`when loaded with ${x.fixtures} headers on ${viewport.device} ${orientation} with shopping items `, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(300)
                                cy.preserveConsentCookies()
                                cy.window().then((win: any) =>
                                    win.subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
                                        success: false,
                                        data: {...bag},
                                    }),
                                )
                                cy.wait(200)
                                cy.window().then((win: any) =>
                                    win.subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
                                        success: true,
                                        data: {ShoppingBag: {...bag}},
                                    }),
                                )
                                cy.get("[data-testid='header-shopping-bag']").click()
                            })

                            it(`should display the description for the first item`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-description']")
                                    .eq(0)
                                    .should("contain.text", `${secondItemDescription}`)
                            })

                            it(`should display the description for the second item`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-description']")
                                    .eq(1)
                                    .should("contain.text", `${bag.Items[1].Description}`)
                            })

                            it(`should  display the alternative description for the first item`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-description']")
                                    .eq(0)
                                    .should("contain.text", `${bag.Items[0].AlternativeDescription}`)
                            })

                            it(`should show the total amount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-total']").should(
                                    "contain.text",
                                    `${bag.FinalOrderValueFormatted}`,
                                )
                            })

                            it(`should show the multi-buy discount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-multibuy-discount']").should(
                                    "contain.text",
                                    `-${bag.MultiBuyDiscountFormatted}`,
                                )
                            })

                            it(`should show the welcome offer discount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-additional-incentive']").should(
                                    "contain.text",
                                    `${bag.ChargesAndIncentives[0].AdditionalAmountFormatted}`,
                                )
                            })

                            it("should not show the mini shopping bag empty bag text", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-empty']").should("not.exist")
                            })

                            it("should have the correct item url", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-image']")
                                    .should("have.attr", "src")
                                    .and(
                                        "match",
                                        /https:\/\/xcdn.amido.com\/content\/common\/items\/default\/default\/itemimages\/altitembag\/436441.jpg/,
                                    )
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
                        describe(`when loaded with ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.server()
                                cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(200)
                                cy.preserveConsentCookies()
                                cy.get("[data-testid='header-shopping-bag']").click()
                            })

                            it(`should show the mini shopping bag count`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should(
                                    "contain.text",
                                    "0 Items In Bag",
                                )
                            })

                            it(`should show the mini shopping bag empty bag text`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-empty']").should(
                                    "contain.text",
                                    "Your shopping bag is empty",
                                )
                            })
                        })

                        describe(`when loaded with ${x.fixtures} headers on ${viewport.device} ${orientation} with shopping items `, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(300)
                                cy.preserveConsentCookies()
                                cy.window().then((win: any) =>
                                    win.subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
                                        success: false,
                                        data: {ShoppingBag: {...bag}},
                                    }),
                                )
                                cy.wait(200)
                                cy.window().then((win: any) =>
                                    win.subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
                                        success: true,
                                        data: {ShoppingBag: {...bag}},
                                    }),
                                )

                                cy.get("[data-testid='header-shopping-bag']").click()
                            })

                            it(`should  show the mini shopping bag count`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should(
                                    "contain.text",
                                    `${bag.Items.length} Items In Bag`,
                                )
                            })

                            it(`should display the alternative description for the first item`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-description']")
                                    .eq(0)
                                    .should("contain.text", `${bag.Items[0].AlternativeDescription}`)
                            })

                            it(`should  display the description for the second item`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-description']")
                                    .eq(1)
                                    .should("contain.text", `${bag.Items[1].Description}`)
                            })

                            it(`should show the total amount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-total']").should(
                                    "contain.text",
                                    `${bag.FinalOrderValueFormatted}`,
                                )
                            })

                            it(`should how the total multi buy discount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-multibuy-discount']").should(
                                    "contain.text",
                                    `-${bag.MultiBuyDiscountFormatted}`,
                                )
                            })

                            it(`should show the total multi buy discount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-additional-incentive']").should(
                                    "contain.text",
                                    `${bag.ChargesAndIncentives[0].AdditionalAmountFormatted}`,
                                )
                            })

                            it(`should show the mini shopping bag empty bag text`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-empty']").should("not.exist")
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
                        describe(`when loaded with ${x.fixtures} headers on ${viewport.device} ${orientation}`, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.get("[data-testid='header-shopping-bag']").click()
                                cy.wait(200)
                                cy.preserveConsentCookies()
                            })

                            it("should not have the mini shopping bag count ", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should("not.exist")
                            })

                            it("should not have the mini shopping bag empty bag text ", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-empty']").should("not.exist")
                            })

                            it("should have current location to be shopping bag", () => {
                                cy.url().should("contains", shoppingBagUrl)
                            })
                        })

                        describe(`when loaded with ${x.fixtures} headers on ${viewport.device} ${orientation} with shopping items `, () => {
                            beforeEach(() => {
                                cy.viewport(viewport.device, orientation)
                                cy.visit("/headercontainer", {headers: x.header})
                                cy.wait(200)
                                cy.preserveConsentCookies()
                                cy.window().then((win: any) =>
                                    win.subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
                                        success: true,
                                        data: {ShoppingBag: {...bag}},
                                    }),
                                )
                                cy.wait(300)
                                cy.get("[data-testid='header-shopping-bag']").click()
                            })

                            it("should not have the mini shopping bag count ", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-count']").should(
                                    "not.exist",
                                    `${bag.Items.length} Items In Bag`,
                                )
                            })

                            it(`should not show the total amount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-total']").should("not.exist")
                            })

                            it(`should not show the multi buy discount`, () => {
                                cy.get("[data-testid='header-mini-shopping-bag-multibuy-discount']").should("not.exist")
                            })

                            it(`should not show the welcome offer discount`, () => {
                                cy.get("[ data-testid='header-mini-shopping-bag-additional-incentive']").should(
                                    "not.exist",
                                )
                            })

                            it("should not have the mini shopping bag empty bag text ", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-empty']").should("not.exist")
                            })
                            it("should not have the mini shopping bag item description", () => {
                                cy.get("[data-testid='header-mini-shopping-bag-item-description']").should("not.exist")
                            })

                            it("should have current location to be shopping bag", () => {
                                cy.url().should("contains", shoppingBagUrl)
                            })
                        })
                    })
                })
            })
        })
    })
})
