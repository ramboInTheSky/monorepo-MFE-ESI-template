/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const amidoMxHeaders = {...amidoHeaders, "x-monorepo-territory": "mx", "x-monorepo-language": "en"}
TestFilter(["build"], () => {
    context("PLP - keyword search - seo metadata", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/search?w=red", {headers: amidoMxHeaders})
            cy.injectAxe()
        })

        describe("When an international keyword search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", "Buy red from | Amido Mexico")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "noindex, nofollow")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Shop for red at - Amido Mexico. International shipping and returns available. Buy now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get('[data-testid="plp-facet-modal-count-label-size:1x2022-1"]').click()
                cy.get("title").should("have.text", "Buy red in 1X2022 from | Amido Mexico")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "noindex, nofollow")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Shop for red in 1X2022 at - Amido Mexico. International shipping and returns available. Buy red in 1X2022 now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    context("PLP - category search - seo metadata - english site", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/shop/gender-women-productaffiliation-coatsandjackets", {headers: amidoMxHeaders})
            cy.injectAxe()
        })

        describe("When an international category search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", "Women's Coatsandjackets | Amido Mexico")
                cy.get('meta[name="keywords"]').should(
                    "have.attr",
                    "content",
                    "amido,amido sale,amido online,amido directory,amido online shopping,amido store,amido direct",
                )
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's Coatsandjackets at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get('[data-testid="plp-facet-modal-count-label-size:1x2022-1"]').click()
                cy.get("title").should("have.text", "Women's 1X2022 Coatsandjackets | Amido Mexico")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's 1X2022 Coatsandjackets at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When filters are clicked and then cleared", () => {
            it("should have the correct seo metadata", () => {
                //Check the initial SEO info
                cy.get("title").should("have.text", "Women's Coatsandjackets | Amido Mexico")
                cy.get('meta[name="keywords"]').should(
                    "have.attr",
                    "content",
                    "amido,amido sale,amido online,amido directory,amido online shopping,amido store,amido direct",
                )
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's Coatsandjackets at Amido Mexico. Delivery options & returns available. Order now!",
                )

                //Select a filter and check that the SEO info updated
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", "Women's New In Coatsandjackets | Amido Mexico")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's New In Coatsandjackets at Amido Mexico. Delivery options & returns available. Order now!",
                )

                //Clear the selected filter and check that the SEO info reverted to the original
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", "Women's Coatsandjackets | Amido Mexico")
                cy.get('meta[name="keywords"]').should(
                    "have.attr",
                    "content",
                    "amido,amido sale,amido online,amido directory,amido online shopping,amido store,amido direct",
                )
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's Coatsandjackets at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When there are more than 3 categories in the category search without filters", () => {
            it("should have the correct seo metadata", () => {
                cy.viewport(1280, 800)
                cy.visit("/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls", {
                    headers: amidoMxHeaders,
                })

                cy.get("title").should("have.text", "Girls' | Amido Mexico")
                cy.get('meta[name="keywords"]').should(
                    "have.attr",
                    "content",
                    "amido,amido sale,amido online,amido directory,amido online shopping,amido store,amido direct",
                )
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Girls' at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When there are more than 3 categories in the category search with filters", () => {
            it("should have the correct seo metadata", () => {
                cy.viewport(1280, 800)
                cy.visit("/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls", {
                    headers: amidoMxHeaders,
                })

                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.wait(100)
                cy.get('[data-testid="plp-facet-checkbox-label-size:1x2022"]').click()

                cy.get("title").should("have.text", "Girls' 1X2022 | Amido Mexico")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Girls' 1X2022 at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    context("PLP - category search - seo metadata - non-english site - long", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/shop/gender-women-category-dresses/colour-black-designfeature-hooded-length-short", {
                headers: {...amidoHeaders, "x-monorepo-language": "fr", "x-monorepo-territory": "fr"},
            })
            cy.injectAxe()
        })

        describe("When an international category search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", "Women's, Black, Hooded, Short, Dresses | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's, Black, Hooded, Short, Dresses at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get('[data-testid="plp-facet-modal-count-label-size:1x2022-1"]').click()
                cy.get("title").should("have.text", "Women's, 1X2022, Black, Hooded, Short, Dresses | Amido France")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's, 1X2022, Black, Hooded, Short, Dresses at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When filters are clicked and then cleared", () => {
            it("should have the correct seo metadata", () => {
                //Check the initial SEO info
                cy.get("title").should("have.text", "Women's, Black, Hooded, Short, Dresses | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's, Black, Hooded, Short, Dresses at Amido France. Delivery options & returns available. Order now!",
                )

                //Select a filter and check that the SEO info updated
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", "Women's, New In, Black, Hooded, Short, Dresses | Amido France")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's, New In, Black, Hooded, Short, Dresses at Amido France. Delivery options & returns available. Order now!",
                )

                //Clear the selected filter and check that the SEO info reverted to the original
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", "Women's, Dresses | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's, Dresses at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When there are more than 3 categories in the category search without filters", () => {
            it("should have the correct seo metadata", () => {
                cy.viewport(1280, 800)
                cy.visit("/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls", {
                    headers: amidoMxHeaders,
                })

                cy.get("title").should("have.text", "Girls' | Amido Mexico")
                cy.get('meta[name="keywords"]').should(
                    "have.attr",
                    "content",
                    "amido,amido sale,amido online,amido directory,amido online shopping,amido store,amido direct",
                )
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Girls' at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When there are more than 3 categories in the category search with filters", () => {
            it("should have the correct seo metadata", () => {
                cy.viewport(1280, 800)
                cy.visit("/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls", {
                    headers: amidoMxHeaders,
                })

                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.wait(100)
                cy.get('[data-testid="plp-facet-checkbox-label-size:1x2022"]').click()

                cy.get("title").should("have.text", "Girls' 1X2022 | Amido Mexico")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Girls' 1X2022 at Amido Mexico. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    context("PLP - category search - seo metadata - non-english site - short", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/shop/department-homeware-category-shelves", {
                headers: {...amidoHeaders, "x-monorepo-language": "fr", "x-monorepo-territory": "fr"},
            })
            cy.injectAxe()
        })

        describe("When an international category search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", "Shelves | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Shelves at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When a filter is clicked", () => {
            it("should have the correct seo metadata", () => {
                cy.get('[data-testid="plp-f-f-size"]').click()
                cy.get('[data-testid="plp-facet-modal-count-label-size:1x2022-1"]').click()
                cy.get("title").should("have.text", "1X2022, Shelves | Amido France")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse 1X2022, Shelves at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When filters are clicked and then cleared", () => {
            it("should have the correct seo metadata", () => {
                //Check the initial SEO info
                cy.get("title").should("have.text", "Shelves | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Shelves at Amido France. Delivery options & returns available. Order now!",
                )

                //Select a filter and check that the SEO info updated
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", "New In, Shelves | Amido France")
                cy.get('meta[name="keywords"]').should("have.attr", "content", "")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse New In, Shelves at Amido France. Delivery options & returns available. Order now!",
                )

                //Clear the selected filter and check that the SEO info reverted to the original
                cy.get("[data-testid='plp-facet-checkbox-label-feat:newin']").click()

                cy.get("title").should("have.text", "Shelves | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Shelves at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    context("PLP - category search - seo metadata - non-english site - NO FILTERS, gender + category", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.visit("/shop/gender-women-productaffiliation-coatsandjackets-0", {
                headers: {...amidoHeaders, "x-monorepo-language": "fr", "x-monorepo-territory": "fr"},
            })
            cy.injectAxe()
        })

        describe("When an international category search without filters is performed", () => {
            it("should have the correct seo metadata", () => {
                cy.get("title").should("have.text", "Women's, Coatsandjackets | Amido France")
                cy.get('meta[name="robots"]').should("have.attr", "content", "")
                cy.get('meta[name="description"]').should(
                    "have.attr",
                    "content",
                    "Browse Women's, Coatsandjackets at Amido France. Delivery options & returns available. Order now!",
                )
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
