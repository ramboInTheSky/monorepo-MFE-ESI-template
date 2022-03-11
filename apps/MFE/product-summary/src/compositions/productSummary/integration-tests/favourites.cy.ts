/// <reference types="cypress" />
import acceptanceTestApiData from "../../../../__mocks__/acceptanceTestsApi"
import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

TestFilter(["build"], () => {
    context("Given I am browsing a product summary tile at 1024", () => {
        describe("When I visit a url for a pid that exists", () => {
            const amidoHeaders = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "amido",
                "x-monorepo-territory": "gb",
            }

            beforeEach(() => {
                cy.viewport(1024, 500)
                cy.visit(`/productsummarycontainer/${acceptanceTestApiData.testColourway1ItemNumber}`, {
                    headers: amidoHeaders,
                })
                cy.injectAxe()
            })

            it("should show the favourites button and being inactive", () => {
                cy.scrollTo("bottom", {duration: 1000, easing: "swing"})

                cy.get("[data-testid='product-summary-favourites-button-container']").should("be.visible")
                cy.get("[data-testid='product-inactive-favourite-icon']").should("be.visible")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should show anonymous tooltip", () => {
                cy.get("[data-testid='product-summary-favourites-button']").click()

                cy.window().then((win: any) => {
                    win.NextFavourites = {
                        Data: {
                            HardLogoutPromptDisplayed: false,
                            IdentifiedUser: false,
                            FavouriteLoginPromptDisplayed: false,
                            SoftLoginFirstname: null,
                        },
                    }
                    win.subjects["$ FAVOURITES_ADD"].subscribe(data => {
                        win.subjects["$ FAVOURITES_ADD_CALLBACK"].next({
                            success: true,
                            data: {ShoppingListItems: [{ItemNumber: "919461"}]},
                            status: 200,
                            textStatus: "test",
                            eventId: data.eventId,
                        })
                    })
                })

                cy.get("[data-testid='product-summary-favourite-anonymous-tooltip']").should("be.visible")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should show authenticated tooltip", () => {
                cy.get("[data-testid='product-summary-favourites-button']").click()

                cy.window().then((win: any) => {
                    win.NextFavourites = {
                        Data: {
                            HardLogoutPromptDisplayed: false,
                            IdentifiedUser: true,
                            FavouriteLoginPromptDisplayed: false,
                            SoftLoginFirstname: false,
                        },
                    }
                    win.subjects["$ FAVOURITES_ADD"].subscribe(data => {
                        win.subjects["$ FAVOURITES_ADD_CALLBACK"].next({
                            success: true,
                            data: {ShoppingListItems: [{ItemNumber: "919461"}]},
                            status: 200,
                            textStatus: "test",
                            eventId: data.eventId,
                        })
                    })
                })

                cy.get("[data-testid='product-summary-favourite-authenticated-tooltip']").should("be.visible")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should close tooltip when click to close button", () => {
                cy.get("[data-testid='product-summary-favourites-button']").click()

                cy.window().then((win: any) => {
                    win.NextFavourites = {
                        Data: {
                            HardLogoutPromptDisplayed: false,
                            IdentifiedUser: false,
                            FavouriteLoginPromptDisplayed: false,
                            SoftLoginFirstname: null,
                        },
                    }
                    win.subjects["$ FAVOURITES_ADD"].subscribe(data => {
                        win.subjects["$ FAVOURITES_ADD_CALLBACK"].next({
                            success: true,
                            data: {ShoppingListItems: [{ItemNumber: "919461"}]},
                            status: 200,
                            textStatus: "test",
                            eventId: data.eventId,
                        })
                    })
                })

                cy.get("[data-testid='product-summary-favourite-tooltip-close']").click()
                cy.get("[data-testid='product-summary-favourite-anonymous-tooltip']").should("not.exist")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should show maximum error tooltip when favourites reached maximum limit", () => {
                cy.get("[data-testid='product-summary-favourites-button']").click()
                cy.window().then((win: any) => {
                    win.NextFavourites = {
                        Data: {
                            HardLogoutPromptDisplayed: false,
                            IdentifiedUser: false,
                            FavouriteLoginPromptDisplayed: false,
                            SoftLoginFirstname: null,
                        },
                    }
                    win.subjects["$ FAVOURITES_ADD"].subscribe(data => {
                        win.subjects["$ FAVOURITES_ADD_CALLBACK"].next({
                            success: false,
                            data: null,
                            status: 200,
                            textStatus: "test",
                            eventId: data.eventId,
                            errorMessage: "MaximumLimitExceeded",
                        })
                    })
                })

                cy.get("[data-testid='product-summary-favourite-max-error-tooltip']").should("exist")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should show generic error tooltip when NextFavourites has errors", () => {
                cy.get("[data-testid='product-summary-favourites-button']").click()

                cy.window().then((win: any) => {
                    win.NextFavourites = {
                        Data: {
                            Success: false,
                            ErrorMessage: "something else",
                        },
                    }
                    win.subjects["$ FAVOURITES_ADD"].subscribe(data => {
                        win.subjects["$ FAVOURITES_ADD_CALLBACK"].next({
                            success: false,
                            data: null,
                            status: 200,
                            textStatus: "test",
                            eventId: data.eventId,
                            errorMessage: "something else",
                        })
                    })
                })

                cy.get("[data-testid='product-summary-favourite-error-tooltip']").should("exist")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When I visit a url for a pid that exists", () => {
            const amidoHeaders = {
                "x-monorepo-language": "en",
                "x-monorepo-realm": "amido",
                "x-monorepo-territory": "mx",
            }
            beforeEach(() => {
                cy.viewport(1024, 500)
                cy.visit(`/productsummarycontainer/${acceptanceTestApiData.testColourway1ItemNumber}`, {
                    headers: amidoHeaders,
                })
                cy.injectAxe()
            })

            it("should not show the favourites button", () => {
                cy.scrollTo("bottom", {duration: 1000, easing: "swing"})

                cy.get("[data-testid='product-summary-favourites-button-container']").should("not.exist")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
