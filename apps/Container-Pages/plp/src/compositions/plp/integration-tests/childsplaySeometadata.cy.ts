/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"

const site = "amidoclothing.co.uk"
const size = "1X2022"

TestFilter(["build"], () => {
    const headers = {
        "x-monorepo-language": "en",
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
    }

    context("Amido PLP UK - keyword search - seo metadata", () => {
        const amidoUK = "Amido UK"
        const amidoClothingUK = "Amido Clothing UK"
        const searchTerm = "red"
        const keywords = "amidoclothing,amidoclothing.co.uk,childrens"
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit(`/search?w=${searchTerm}`, {headers})
            cy.injectAxe()
        })

        describe("When an uk keyword search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", `Buy ${searchTerm} from the ${amidoUK} online shop`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${searchTerm} at ${site}. Amido day delivery and free returns available. 1000s of products online. Buy ${searchTerm} now!`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get(`[data-testid="plp-facet-modal-count-label-size:1x2022-1"]`).click()
                cy.get("title").should(
                    "have.text",
                    `Buy ${searchTerm} in ${size} from the ${amidoClothingUK} online shop`,
                )
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${searchTerm} in ${size} at ${site}. Amido day delivery and free returns available. 1000s of products online. Buy ${searchTerm} now!`,
                )
            })
        })
    })
})
TestFilter(["build"], () => {
    const headers = {
        "x-monorepo-language": "en",
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
    }

    context("Amido PLP UK - category search - seo metadata", () => {
        const keywords = "kids designer clothes, luxury childrenswear, amido clothing"
        const womens = "Women's"
        const coatsAndJackets = "Coatsandjackets"
        const amidoUK = "Amido Clothing UK"

        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/shop/gender-women-productaffiliation-coatsandjackets", {headers})
            cy.injectAxe()
        })

        describe("When an uk category search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amidoUK}. Choose from 1000s of products here. Order ${womens} ${coatsAndJackets} now with express delivery.`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get(`[data-testid="plp-facet-modal-count-label-size:1x2022-1"]`).click()
                cy.get("title").should("have.text", `Buy ${womens} ${size} ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${size} ${coatsAndJackets} with ${amidoUK}. Choose from 1000s of products. Order ${womens} ${size} ${coatsAndJackets} now with express delivery.`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When filters are clicked and then cleared", () => {
            it("should have the correct seo metadata", () => {
                //Check the initial SEO info
                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amidoUK}. Choose from 1000s of products here. Order ${womens} ${coatsAndJackets} now with express delivery.`,
                )

                //Select a filter and check that the SEO info updated
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", `Buy ${womens} New In ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} New In ${coatsAndJackets} with ${amidoUK}. Choose from 1000s of products. Order ${womens} New In ${coatsAndJackets} now with express delivery.`,
                )

                //Clear the selected filter and check that the SEO info reverted to the original
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amidoUK}. Choose from 1000s of products here. Order ${womens} ${coatsAndJackets} now with express delivery.`,
                )
            })
        })
    })
})

TestFilter(["build"], () => {
    const headers = {
        "x-monorepo-language": "en",
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "us",
    }

    context("Amido PLP International USA - keyword search - seo metadata", () => {
        const amidoClothing = "Amido Clothing USA"
        const searchTerm = "red"
        const keywords = "kids designer clothes, luxury childrenswear, amido clothing"
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit(`/search?w=${searchTerm}`, {headers})
            cy.injectAxe()
        })

        describe("When an keyword search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", `Buy ${searchTerm} from | ${amidoClothing}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${searchTerm} at - ${amidoClothing}. International shipping and returns available. Buy now!`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get(`[data-testid="plp-facet-modal-count-label-size:1x2022-1"]`).click()
                cy.get("title").should("have.text", `Buy ${searchTerm} in ${size} from | ${amidoClothing}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${searchTerm} in ${size} at - ${amidoClothing}. International shipping and returns available. Buy ${searchTerm} in ${size} now!`,
                )
            })
        })
    })
})
TestFilter(["build"], () => {
    const headers = {
        "x-monorepo-language": "en",
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "us",
    }

    context("Amido PLP International USA - category search - seo metadata", () => {
        const keywords = "kids designer clothes, luxury childrenswear, amido clothing"
        const womens = "Women's"
        const coatsAndJackets = "Coatsandjackets"
        const amidoClothing = "Amido Clothing USA"

        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/shop/gender-women-productaffiliation-coatsandjackets", {headers})
            cy.injectAxe()
        })

        describe("When an uk category search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoClothing}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amidoClothing} now with express delivery.`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get(`[data-testid="plp-facet-modal-count-label-size:1x2022-1"]`).click()
                cy.get("title").should(
                    "have.text",
                    `Buy ${womens} ${size} ${coatsAndJackets} Online | ${amidoClothing}`,
                )
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${size} ${coatsAndJackets} with ${amidoClothing} now with express delivery.`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When filters are clicked and then cleared", () => {
            it("should have the correct seo metadata", () => {
                //Check the initial SEO info
                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoClothing}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amidoClothing} now with express delivery.`,
                )

                //Select a filter and check that the SEO info updated
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should(
                    "have.text",
                    `Buy ${womens} New In ${coatsAndJackets} Online | ${amidoClothing}`,
                )
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} New In ${coatsAndJackets} with ${amidoClothing} now with express delivery.`,
                )

                //Clear the selected filter and check that the SEO info reverted to the original
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoClothing}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amidoClothing} now with express delivery.`,
                )
            })
        })
    })
})
