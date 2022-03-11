context("mainSiteBagCookie", () => {
    describe("Add MainSiteBag cookie when bag/get ItemCount more than 0", () => {
        beforeEach(() => {
            cy.server()
            cy.route("GET", "/bag/get?*", "fixture:bag.json")
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
        it("should have cookie MainSiteBag", () => {
            cy.getCookie("MainSiteBag").should("have.property", "value", `Quantity=1&TotalValue=45&SaleSiteRead=False`)
        })
    })
    describe("No MainSiteBag cookie when bag/get ItemCount equals 0", () => {
        beforeEach(() => {
            cy.server()
            cy.route("GET", "/bag/get?*", "fixture:empty-bag.json")
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
        it("should not have cookie MainSiteBag", () => {
            cy.getCookie("MainSiteBag").should("not.exist")
        })
    })
})
