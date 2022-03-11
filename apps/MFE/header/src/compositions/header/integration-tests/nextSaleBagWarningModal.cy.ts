context("nextSaleWarningModal", () => {
    describe("When cookie has AmidoSaleBagWarning - readOnMainSite=False", () => {
        beforeEach(() => {
            cy.setCookie("AmidoSaleBagWarning", "readOnMainSite=False&ABC123&happy=happyetc")
            cy.visit("/headercontainer", {
                headers: {
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-language": "en",
                    "x-monorepo-siteurl": "http://localhost:3333",
                    "test-with-local-esi": "true",
                },
            })
            cy.preserveConsentCookies()
        })
        describe("click on go to vip button", () => {
            it("should have the modal component", () => {
                cy.get("[data-testid='modal']").should("be.visible")
            })
            it("should not update the cookie", () => {
                cy.get("[data-testid='header_SaleBagWarningModal_goToVipButton']").click()

                cy.getCookie("AmidoSaleBagWarning").should(
                    "have.property",
                    "value",
                    `readOnMainSite=False&ABC123&happy=happyetc`,
                )
            })
            it("should go to http://localhost:3333/eoss", () => {
                cy.get("[data-testid='header_SaleBagWarningModal_goToVipButton']").click()

                cy.url().should("eq", "http://localhost:3333/eoss")
            })
        })

        describe("click on remain on main site button", () => {
            it("should have the modal component", () => {
                cy.get("[data-testid='modal']").should("be.visible")
            })
            it("should update the cookie", () => {
                cy.get("[data-testid='header_SaleBagWarningModal_stayMainSiteButton']").click()

                cy.getCookie("AmidoSaleBagWarning").should(
                    "have.property",
                    "value",
                    `readOnMainSite=True&ABC123&happy=happyetc`,
                )
            })
            it("should stay on main site", () => {
                cy.get("[data-testid='header_SaleBagWarningModal_stayMainSiteButton']").click()

                cy.url().should("eq", "http://localhost:3333/headercontainer")
            })
        })

        describe("click on back drop", () => {
            it("should have the modal component", () => {
                cy.get("[data-testid='modal']").should("be.visible")
            })
            it("should update the cookie", () => {
                cy.get("[data-testid='modal'] > div:first-child").click({force: true})

                cy.getCookie("AmidoSaleBagWarning").should(
                    "have.property",
                    "value",
                    `readOnMainSite=True&ABC123&happy=happyetc`,
                )
            })
            it("should stay on main site", () => {
                cy.get("[data-testid='modal']").click()

                cy.url().should("eq", "http://localhost:3333/headercontainer")
            })
        })
    })

    describe("When cookie has AmidoSaleBagWarning - readOnMainSite=True", () => {
        beforeEach(() => {
            cy.setCookie("AmidoSaleBagWarning", "readOnMainSite=True&ABC123&happy=happyetc")
            cy.visit("/headercontainer", {
                headers: {
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-language": "en",
                    "x-monorepo-siteurl": "http://localhost:3333",
                    "test-with-local-esi": "true",
                },
            })
            cy.preserveConsentCookies()
        })
        it("should not show the modal component", () => {
            cy.get("[data-testid='modal']").should("not.be.visible")
        })
    })
    describe("When cookie does not have AmidoSaleBagWarning", () => {
        beforeEach(() => {
            cy.visit("/headercontainer", {
                headers: {
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-language": "en",
                    "x-monorepo-siteurl": "http://localhost:3333",
                    "test-with-local-esi": "true",
                },
            })
            cy.preserveConsentCookies()
        })
        it("should not show the modal component", () => {
            cy.get("[data-testid='modal']").should("not.be.visible")
        })
    })
    describe("When cookie does have AmidoSaleBagWarning on Reiss site", () => {
        beforeEach(() => {
            cy.setCookie("AmidoSaleBagWarning", "readOnMainSite=False&ABC123&happy=happyetc")
            cy.visit("/headercontainer", {
                headers: {
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                    "x-monorepo-language": "en",
                    "x-monorepo-siteurl": "http://localhost:3333",
                    "test-with-local-esi": "true",
                },
            })
            cy.preserveConsentCookies()
        })
        it("should not show the modal component", () => {
            cy.get("[data-testid='modal']").should("not.be.visible")
        })
    })
})
