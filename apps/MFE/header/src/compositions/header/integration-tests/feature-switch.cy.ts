var searchBarTestId = {
    recentSearch: {
        enrich: {
            panel: "header-enrich-recent-searches",
        },
        simple: {
            panel: "header-simple-recent-searches",
        },
        clearButton: "header-recent-searches-clear-button",
        recentSearchLinkId: "header-recent-searches-sh",
        recentSearchLinkUrl: "http://localhost:3333/search?w=sh",
    },
    autocomplete: {
        enrich: {
            panel: "header-enrich-auto-complete",
        },
        simple: {
            seeAllResultsButton: "header-simple-autocomplete-see-all-results-link",
            panel: "header-simple-auto-complete",
            id: "header-autocomplete-shirt-dress",
        },
        products: {
            title: "header-autocomplete-products-title",
            url: "http://localhost:3333/style/st468131/289313?_br_psugg_q=shirt+dress#289313",
            id: "header-autocomplete-product-tan-ditsy-animal-midi-shirt-dress",
        },
        suggestion: {
            url: "http://localhost:3333/search?w=shirt",
            id: "header-autocomplete-shirt",
        },
        seeAllResultsButton: "header-autocomplete-product-button",
        seeAllResultsUrl: "http://localhost:3333/search?w=shirt",
    },
    searchBar: {
        largeScreenId: "header-big-screen-search",
        smallScreenId: "header-small-screen-search",
        searchBarTextInput: "header-search-bar-text-input",
        searchBarSearchButton: "header-search-bar-button",
        clearTextButton: "header-search-bar-clear-text-button",
    },
    mobileIconId: "header-adaptive-search",
}

context("Header - Feature Switch - Search Bar", function () {
    describe("when loading enriched autocomplete and recent searches (next, gb, en - settings)", () => {
        const realm = "amido"

        describe("Recent Search: LARGE SCREEN ", () => {
            const largeScreenId = searchBarTestId.searchBar.largeScreenId
            beforeEach(() => {
                cy.viewport(1024, 1000)
                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": "gb",
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })
                cy.preserveConsentCookies()
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).type("sh")
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarSearchButton}']`).click()
                })

                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": "gb",
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })

                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                })
            })
            it("should show the enriched recent searches", () => {
                cy.get(`[data-testid='${searchBarTestId.recentSearch.enrich.panel}']`).should("be.visible")
            })

            it("should clear the text from the search bar input text", () => {
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).type("ca")
                    cy.get(`[data-testid='${searchBarTestId.searchBar.clearTextButton}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).should("have.value", "")
                })
            })
            it(`should redirect to ${searchBarTestId.recentSearch.recentSearchLinkUrl}`, () => {
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.recentSearchLinkId}']`).click()
                })
                cy.url().should("eq", `${searchBarTestId.recentSearch.recentSearchLinkUrl}`)
            })
            it("should not show the recent search when clear button is clicked in the recent search panel", () => {
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.clearButton}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.enrich.panel}']`).should("not.be.visible")
                })
            })
        })

        describe("Recent Search: SMALL SCREEN ", () => {
            const smallScreenId = searchBarTestId.searchBar.smallScreenId
            beforeEach(() => {
                cy.viewport(420, 420)
                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": "gb",
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })
                cy.preserveConsentCookies()
                cy.get(`[data-testid='${searchBarTestId.mobileIconId}']`).click()
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).type("sh")
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarSearchButton}']`).click()
                })

                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": "gb",
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })

                cy.get(`[data-testid='${searchBarTestId.mobileIconId}']`).click()

                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                })
            })
            it("should show the enriched recent searches", () => {
                cy.get(`[data-testid='${searchBarTestId.recentSearch.enrich.panel}']`).should("be.visible")
            })
            it("should clear the text from the search bar input text", () => {
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).type("ca")
                    cy.get(`[data-testid='${searchBarTestId.searchBar.clearTextButton}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).should("have.value", "")
                })
            })
            it(`should redirect to ${searchBarTestId.recentSearch.recentSearchLinkUrl}`, () => {
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.recentSearchLinkId}']`).click()
                })
                cy.url().should("eq", `${searchBarTestId.recentSearch.recentSearchLinkUrl}`)
            })
            it(`should show the recent search when clear button is clicked in the recent search panel and should not show ${searchBarTestId.recentSearch.recentSearchLinkId}`, () => {
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.clearButton}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.enrich.panel}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.recentSearch.recentSearchLinkId}']`).should(
                        "not.be.visible",
                    )
                })
            })
        })

        describe("Autocomplete: LARGE SCREEN ", () => {
            const largeScreenId = searchBarTestId.searchBar.largeScreenId
            beforeEach(() => {
                cy.server()

                cy.route("GET", "/api/v1/suggest/*", "fixture:autocomplete.json")

                cy.viewport(1024, 1000)
                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": "gb",
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })
                cy.preserveConsentCookies()

                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).type("shirt")
                })
            })

            it("should show the enriched auto complete", () => {
                cy.get(`[data-testid='${searchBarTestId.autocomplete.enrich.panel}']`).should("be.visible")
            })
            it(`should redirect to ${searchBarTestId.autocomplete.suggestion.url} when clicking on suggestion`, () => {
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.suggestion.id}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.suggestion.id}']`).click()
                })

                cy.url().should("eq", `${searchBarTestId.autocomplete.suggestion.url}`)
            })
            it(`should redirect to ${searchBarTestId.autocomplete.products.url} when clicking on product`, () => {
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.products.id}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.products.id}']`).click()
                })

                cy.url().should("eq", `${searchBarTestId.autocomplete.products.url}`)
            })
            it(`should redirect to ${searchBarTestId.autocomplete.products.url} on see all results`, () => {
                cy.get(`[data-testid='${largeScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.products.id}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.seeAllResultsButton}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.seeAllResultsButton}']`).click()
                })

                cy.url().should("eq", `${searchBarTestId.autocomplete.seeAllResultsUrl}`)
            })
        })
        describe("Autocomplete: SMALL SCREEN ", () => {
            const smallScreenId = searchBarTestId.searchBar.smallScreenId
            beforeEach(() => {
                cy.server()

                cy.route("GET", "/api/v1/suggest/*", "fixture:autocomplete.json")

                cy.viewport(420, 420)
                cy.visit("/headercontainer", {
                    headers: {
                        "x-monorepo-language": "en",
                        "x-monorepo-realm": realm,
                        "x-monorepo-territory": "gb",
                        "x-monorepo-siteurl": "http://localhost:3333",
                        "test-with-local-esi": "true",
                    },
                })
                cy.preserveConsentCookies()

                cy.get(`[data-testid='${searchBarTestId.mobileIconId}']`).click()

                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).click()
                    cy.get(`[data-testid='${searchBarTestId.searchBar.searchBarTextInput}']`).type("shirt")
                })
            })

            it("should show the enriched auto complete", () => {
                cy.get(`[data-testid='${searchBarTestId.autocomplete.enrich.panel}']`).should("be.visible")
            })
            it(`should redirect to ${searchBarTestId.autocomplete.suggestion.url} when clicking on suggestion`, () => {
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.suggestion.id}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.suggestion.id}']`).trigger("click")
                })

                cy.url().should("eq", `${searchBarTestId.autocomplete.suggestion.url}`)
            })
            it(`should redirect to ${searchBarTestId.autocomplete.products.url} when clicking on product`, () => {
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.products.id}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.products.id}']`).click()
                })

                cy.url().should("eq", `${searchBarTestId.autocomplete.products.url}`)
            })
            it(`should redirect to ${searchBarTestId.autocomplete.seeAllResultsUrl} on see all results`, () => {
                cy.get(`[data-testid='${smallScreenId}']`).within(() => {
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.products.id}']`).should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.seeAllResultsButton}']`)
                        .scrollIntoView()
                        .should("be.visible")
                    cy.get(`[data-testid='${searchBarTestId.autocomplete.seeAllResultsButton}']`)
                        .scrollIntoView()
                        .click()
                })

                cy.url().should("eq", `${searchBarTestId.autocomplete.seeAllResultsUrl}`)
            })
        })
    })
})
