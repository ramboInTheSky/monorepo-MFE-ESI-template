/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders as headers} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const amidoUK = "Amido UK"
const amidocouk = "amido.com"
const size = "1X2022"

TestFilter(["build"], () => {
    context("PLP - keyword search - seo metadata", () => {
        const searchTerm = "red"
        const keywords =
            "Amido,amido.com,Amido Directory,Amido Flowers,Amido Electrics,fashion,clothes,womens,mens,childrens,home,furniture"
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit(`/search?w=${searchTerm}`, {headers})
            cy.injectAxe()
        })

        describe("When an uk keyword search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", `Buy ${searchTerm} from the ${amidoUK} online shop`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "noindex, nofollow")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${searchTerm} at amido.com. Amido day delivery and free returns available. 1000s of products online. Buy ${searchTerm} now!`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                const robots = "noindex, nofollow"

                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get(`[data-testid="plp-facet-modal-count-label-size:1x2022-1"]`).click()
                cy.get("title").should("have.text", `Buy ${searchTerm} in ${size} from the ${amidoUK} online shop`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", robots)
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${searchTerm} in ${size} at ${amidocouk}. Amido day delivery and free returns available. 1000s of products online. Buy ${searchTerm} now!`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    context("PLP - category search - seo metadata", () => {
        const keywords = "amido,amido sale,amido online,amido.com,amido directory,amido online shopping,amido store"
        const womens = "Women's"
        const coatsAndJackets = "Coatsandjackets"
        const amido = "Amido"

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
                    `Shop a wide range of ${womens} ${coatsAndJackets} with ${amido}. Choose from 1000s of products here. Order ${womens} ${coatsAndJackets} now with express delivery.`,
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
                    `Shop for ${womens} ${size} ${coatsAndJackets} with ${amido}. Choose from 1000s of products. Order ${coatsAndJackets} now with express delivery!`,
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
                    `Shop a wide range of ${womens} ${coatsAndJackets} with Amido. Choose from 1000s of products here. Order ${womens} ${coatsAndJackets} now with express delivery.`,
                )

                //Select a filter and check that the SEO info updated
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", `Buy ${womens} New In ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop for ${womens} New In ${coatsAndJackets} with Amido. Choose from 1000s of products. Order ${coatsAndJackets} now with express delivery!`,
                )

                //Clear the selected filter and check that the SEO info reverted to the original
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", `Buy ${womens} ${coatsAndJackets} Online | ${amidoUK}`)
                cy.get('meta[name="keywords"]').should("have.attr", "content", keywords)
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    `Shop a wide range of ${womens} ${coatsAndJackets} with Amido. Choose from 1000s of products here. Order ${womens} ${coatsAndJackets} now with express delivery.`,
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
