/// <reference types="cypress" />
var fixtures = require("@monorepo/cypress-fixtures")
fixtures.realmType = "next"

context(`MegaNav - ${fixtures.realmType} realm`, function () {
    //TODO: Change these to Visual Testing
    fixtures.devices.forEach(viewport => {
        describe(`${viewport.type} - ${viewport.device}`, () => {
            viewport.orientation.forEach(orientation => {
                describe(`when loaded with ${fixtures.realmType} headers on ${viewport.device} ${orientation}`, () => {
                    beforeEach(() => {
                        cy.viewport(viewport.device, orientation)
                    })
                    it(`should show the Main MegaNav on ${orientation} as left to right`, () => {
                        cy.visit("/meganavcontainer", {
                            headers: {
                                "x-monorepo-language": "en",
                                "x-monorepo-realm": fixtures.realmType,
                                "x-monorepo-territory": "gb",
                                "x-monorepo-siteurl": "http://localhost:3333",
                            },
                        })
                        cy.get("[data-testid='meganav']").should("be.visible")
                    })

                    it(`should show the Main MegaNav on ${orientation} as right to left`, () => {
                        cy.visit("/meganavcontainer", {
                            headers: {
                                "x-monorepo-language": "ar",
                                "x-monorepo-realm": fixtures.realmType,
                                "x-monorepo-territory": "sa",
                                "x-monorepo-siteurl": "http://localhost:3333",
                            },
                        })
                        cy.get("[data-testid='meganav']").should("be.visible")
                    })
                })
            })
        })
    })
})
