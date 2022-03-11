/// <reference types="cypress" />
import getWithDynamicYear from "../../utils/getWithDynamicYear"

var fixtures = require("@monorepo/cypress-fixtures")
fixtures.realmType = "amido"

context(`Footer - ${fixtures.realmType} realm`, function () {
    //TODO: Change these to Visual Testing
    fixtures.devices.forEach(viewport => {
        describe(`${viewport.type} - ${viewport.device}`, () => {
            viewport.orientation.forEach(orientation => {
                describe(`when loaded with ${fixtures.realmType} headers on ${viewport.device} ${orientation}`, () => {
                    beforeEach(() => {
                        cy.viewport(viewport.device, orientation)
                    })
                    it(`should show the Main Footer on ${orientation} as left to right`, () => {
                        cy.visit("/footercontainer", {
                            headers: {
                                "x-monorepo-language": "en",
                                "x-monorepo-realm": fixtures.realmType,
                                "x-monorepo-territory": "gb",
                                "x-monorepo-siteurl": "http://localhost:3333",
                            },
                        })
                        cy.get("[data-testid='footer-container']").should("be.visible")
                    })

                    it(`should show the Main Footer on ${orientation} as right to left`, () => {
                        cy.visit("/footercontainer", {
                            headers: {
                                "x-monorepo-language": "ar",
                                "x-monorepo-realm": fixtures.realmType,
                                "x-monorepo-territory": "sa",
                                "x-monorepo-siteurl": "http://localhost:3333",
                            },
                        })
                        cy.get("[data-testid='footer-container']").should("be.visible")
                    })
                })
            })
        })
    })

    describe(`- when the device width is mobile size and I go to main links`, () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": fixtures.realmType,
            "x-monorepo-territory": "gb",
            "x-monorepo-siteurl": "http://localhost:3333",
        }
        beforeEach(() => {
            cy.viewport("iphone-6+")
            cy.visit("/footercontainer", {
                headers,
            })
        })
        it("should able to see on Frequently Asked Questions after the Help accordion is clicked", () => {
            cy.get("[data-testid='footer-main-links-accordions-help']").click()
            cy.get("[data-testid='footer-main-links-frequently-asked-questions']").should("be.visible")
        })

        it("should able to see on Cookies & Privacy Policy after the Privacy & Legal accordion is clicked", () => {
            cy.get("[data-testid='footer-main-links-accordions-privacy-&-legal']").click()
            cy.get("[data-testid='footer-main-links-cookies-&-privacy-policy']").should("be.visible")
        })
    })

    describe(` Realm Type: ${fixtures.realmType}, language: en  and territory: gb`, () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": fixtures.realmType,
            "x-monorepo-territory": "gb",
            "x-monorepo-siteurl": "http://localhost:3333",
        }
        beforeEach(() => {
            cy.visit("/footercontainer", {
                headers,
            })
        })
        describe(` - when I go to social media region`, () => {
            it("should not show social media region", () => {
                cy.get("[data-testid='footer-region-socialmedia']").should("be.visible")
            })

            it("should show the Facebook link", () => {
                cy.get("[data-testid='footer-social-media-facebook']").should("be.visible")
            })
            it("should show the Twitter link", () => {
                cy.get("[data-testid='footer-social-media-twitter']").should("be.visible")
            })
            it("should show the Instagram link", () => {
                cy.get("[data-testid='footer-social-media-instagram']").should("be.visible")
            })
            it("should show the pinterest link", () => {
                cy.get("[data-testid='footer-social-media-pinterest']").should("be.visible")
            })
            it("should show the youtube link", () => {
                cy.get("[data-testid='footer-social-media-youtube']").should("be.visible")
            })
        })

        describe(` - when I go to quick links region `, () => {
            it("should show My account link", () => {
                cy.get("[data-testid='footer-quick-links-myaccountloggedout-my-account']").should("be.visible")
            })
            it("should not show quick shop", () => {
                cy.get("[data-testid='footer-quick-links-link-quickshop']").should("not.visible")
            })
            it("should show Store Locator link", () => {
                cy.get("[data-testid='footer-quick-links-link-store-locator']").should("be.visible")
            })
            it("should show Start A Chat", () => {
                cy.get("[data-testid='footer-quick-links-link-start-a-chat']").should("be.visible")
            })
        })

        describe(` - when I go to main links region`, () => {
            it("should show the Help sub region along with children", () => {
                cy.get("[data-testid='footer-main-links-title-help']").should("be.visible")
                cy.get("[data-testid='footer-main-links-frequently-asked-questions']").should("be.visible")
            })
            it("should show the Privacy & Legal sub region", () => {
                cy.get("[data-testid='footer-main-links-title-privacy-&-legal']").should("be.visible")
                cy.get("[data-testid='footer-main-links-cookies-&-privacy-policy']").should("be.visible")
            })
            it("should show the Other Services sub region", () => {
                cy.get("[data-testid='footer-main-links-title-shopping-with-us']").should("be.visible")
                cy.get("[data-testid='footer-main-links-flowers,-plants-&-wine']").should("be.visible")
            })
        })

        describe(` - when I go to copyright region without AmidoDeviceType cookie`, () => {
            it("should not show the toggle ", () => {
                cy.get("[data-testid='`footer-copyright-switcher-mobiletoggle']").should("not.be.visible")
                cy.get("[data-testid='`footer-copyright-switcher-desktoptoggle']").should("not.be.visible")
            })
            it("should the copyright text", () => {
                var copyrightText = "© <yyyy> Amido Retail Ltd. All rights reserved."
                var copyrightTextWithDynamicYear = getWithDynamicYear(copyrightText)

                cy.get("[data-testid='footer-copyright-text']").should("be.visible")
                cy.get("h3[data-testid='footer-copyright-text']").should("be.visible")
                cy.get("[data-testid='footer-copyright-text']").contains(copyrightTextWithDynamicYear)
            })
        })
        describe(` - when I go to copyright region`, () => {
            afterEach(() => {
                cy.setCookie("AmidoDeviceType", "")
            })

            beforeEach(() => {
                cy.setCookie("AmidoDeviceType", "Mobile")
                cy.visit("/footercontainer", {
                    headers,
                })
            })
            it("should show the desktop link switcher", () => {
                cy.get("[data-testid='footer-copyright-switcher-desktoptoggle']").should("be.visible")
                cy.get("[data-testid='footer-copyright-switcher-mobiletoggle']").should("not.be.visible")
            })
        })
        describe(` - when I go to copyright region with AmidoDeviceType cookie as Desktop`, () => {
            afterEach(() => {
                cy.setCookie("AmidoDeviceType", "")
            })

            beforeEach(() => {
                cy.setCookie("AmidoDeviceType", "Desktop")
                cy.visit("/footercontainer", {
                    headers,
                })
            })
            it("should show the mobile link switcher", () => {
                cy.get("[data-testid='footer-copyright-switcher-desktoptoggle']").should("not.be.visible")
                cy.get("[data-testid='footer-copyright-switcher-mobiletoggle']").should("be.visible")
            })
        })
    })

    describe(` Realm Type: ${fixtures.realmType}, language: en, and territory: sa`, () => {
        const headers = {
            "x-monorepo-language": "en",
            "x-monorepo-realm": fixtures.realmType,
            "x-monorepo-territory": "sa",
            "x-monorepo-siteurl": "http://localhost:3333/en",
        }
        beforeEach(() => {
            cy.visit("footer", {
                headers,
            })
        })
        describe(` - when I go to social media region`, () => {
            it("should not show social media region", () => {
                cy.get("[data-testid='footer-region-socialmedia']").should("be.visible")
            })

            it("should show the Facebook link", () => {
                cy.get("[data-testid='footer-social-media-facebook']").should("be.visible")
            })
            it("should show the Twitter link", () => {
                cy.get("[data-testid='footer-social-media-twitter']").should("be.visible")
            })
            it("should show the Instagram link", () => {
                cy.get("[data-testid='footer-social-media-instagram']").should("be.visible")
            })
            it("should show the pinterest link", () => {
                cy.get("[data-testid='footer-social-media-pinterest']").should("be.visible")
            })
            it("should show the youtube link", () => {
                cy.get("[data-testid='footer-social-media-youtube']").should("be.visible")
            })
        })

        describe(` - when I go to quick links region `, () => {
            it("should show My account link", () => {
                cy.get("[data-testid='footer-quick-links-myaccountloggedout-my-account']").should("be.visible")
            })
            it("should not show quick shop", () => {
                cy.get("[data-testid='footer-quick-links-link-quickshop']").should("not.visible")
            })
            it("should show the language selector with an alternative link", () => {
                cy.get("[data-testid='footer-quick-links-language-selector']").should("be.visible")
                cy.get("[data-testid='footer-quick-links-alt-language-link']")
                    .should("be.visible")
                    .and("have.attr", "href", "http://localhost:3333/ar")
            })
        })

        describe(` - when I go to main links region`, () => {
            it("should show the Help sub region along with children", () => {
                cy.get("[data-testid='footer-main-links-title-help']").should("be.visible")
                cy.get("[data-testid='footer-main-links-contact-us']").should("be.visible")
            })
            it("should show the Privacy & Legal sub region", () => {
                cy.get("[data-testid='footer-main-links-title-privacy-&-legal']").should("be.visible")
                cy.get("[data-testid='footer-main-links-privacy-policy']").should("be.visible")
            })
            it("should show the Other Services sub region", () => {
                cy.get("[data-testid='footer-main-links-title-other-services']").should("be.visible")
                cy.get("[data-testid='footer-main-links-media-&-press']").should("be.visible")
            })
        })

        describe(` - when I go to copyright region without AmidoDeviceType cookie`, () => {
            it("should the copyright text", () => {
                var copyrightText = "© <yyyy> Amido Retail Ltd. All rights reserved."
                var copyrightTextWithDynamicYear = getWithDynamicYear(copyrightText)

                cy.get("[data-testid='footer-copyright-text']").should("be.visible")
                cy.get("h3[data-testid='footer-copyright-text']").should("be.visible")
                cy.get("[data-testid='footer-copyright-text']").contains(copyrightTextWithDynamicYear)
            })
        })
    })

    describe(` Realm Type: ${fixtures.realmType}, language: ar, and territory: sa`, () => {
        const headers = {
            "x-monorepo-language": "ar",
            "x-monorepo-realm": fixtures.realmType,
            "x-monorepo-territory": "sa",
            "x-monorepo-siteurl": "http://localhost:3333",
        }
        beforeEach(() => {
            cy.visit("/footercontainer", {
                headers,
            })
        })
        describe(` - when I go to social media region`, () => {
            it("should not show social media region", () => {
                cy.get("[data-testid='footer-region-socialmedia']").should("be.visible")
            })

            it("should show the Facebook link", () => {
                cy.get("[data-testid='footer-social-media-facebook']").should("be.visible")
            })
            it("should show the Twitter link", () => {
                cy.get("[data-testid='footer-social-media-twitter']").should("be.visible")
            })
            it("should show the Instagram link", () => {
                cy.get("[data-testid='footer-social-media-instagram']").should("be.visible")
            })
            it("should show the pinterest link", () => {
                cy.get("[data-testid='footer-social-media-pinterest']").should("be.visible")
            })
            it("should show the youtube link", () => {
                cy.get("[data-testid='footer-social-media-youtube']").should("be.visible")
            })
        })

        describe(` - when I go to quick links region `, () => {
            it("should show My account link", () => {
                cy.get("[data-testid='footer-quick-links-myaccountloggedout-my-account']").should("be.visible")
            })
            it("should not show quick shop", () => {
                cy.get("[data-testid='footer-quick-links-link-quickshop']").should("not.visible")
            })
            it("should show the language selector with an alternative link", () => {
                cy.get("[data-testid='footer-quick-links-language-selector']").should("be.visible")
                cy.get("[data-testid='footer-quick-links-alt-language-link']")
                    .should("be.visible")
                    .and("have.attr", "href", "http://localhost:3333")
            })
        })

        describe(` - when I go to main links region`, () => {
            it("should show the Help sub region along with children", () => {
                cy.get("[data-testid='footer-main-links-title-help']").should("be.visible")
                cy.get("[data-testid='footer-main-links-contact-us']").should("be.visible")
            })
            it("should show the Privacy & Legal sub region", () => {
                cy.get("[data-testid='footer-main-links-title-privacy-&-legal']").should("be.visible")
                cy.get("[data-testid='footer-main-links-privacy-policy']").should("be.visible")
            })
            it("should show the Other Services sub region", () => {
                cy.get("[data-testid='footer-main-links-title-other-services']").should("be.visible")
                cy.get("[data-testid='footer-main-links-media-&-press']").should("be.visible")
            })
        })

        describe(` - when I go to copyright region without AmidoDeviceType cookie`, () => {
            it("should not show the toggle ", () => {
                cy.get("[data-testid='`footer-copyright-switcher-mobiletoggle']").should("not.be.visible")
                cy.get("[data-testid='`footer-copyright-switcher-desktoptoggle']").should("not.be.visible")
            })
            it("should the copyright text", () => {
                var copyrightText = "© <yyyy> Amido Retail Ltd. All rights reserved."
                var copyrightTextWithDynamicYear = getWithDynamicYear(copyrightText)

                cy.get("[data-testid='footer-copyright-text']").should("be.visible")
                cy.get("h3[data-testid='footer-copyright-text']").should("be.visible")
                cy.get("[data-testid='footer-copyright-text']").contains(copyrightTextWithDynamicYear)
            })
        })
        describe(` - when I go to copyright region`, () => {
            afterEach(() => {
                cy.setCookie("AmidoDeviceType", "")
            })

            beforeEach(() => {
                cy.setCookie("AmidoDeviceType", "Mobile")
                cy.visit("/footercontainer", {
                    headers,
                })
            })
            it("should show the desktop link switcher", () => {
                cy.get("[data-testid='footer-copyright-switcher-desktoptoggle']").should("be.visible")
                cy.get("[data-testid='footer-copyright-switcher-mobiletoggle']").should("not.be.visible")
            })
        })
        describe(` - when I go to copyright region with AmidoDeviceType cookie as Desktop`, () => {
            afterEach(() => {
                cy.setCookie("AmidoDeviceType", "")
            })

            beforeEach(() => {
                cy.setCookie("AmidoDeviceType", "Desktop")
                cy.visit("/footercontainer", {
                    headers,
                })
            })
            it("should show the mobile link switcher", () => {
                cy.get("[data-testid='footer-copyright-switcher-desktoptoggle']").should("not.be.visible")
                cy.get("[data-testid='footer-copyright-switcher-mobiletoggle']").should("be.visible")
            })
        })
    })
})
