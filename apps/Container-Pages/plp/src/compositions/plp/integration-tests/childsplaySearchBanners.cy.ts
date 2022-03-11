/// <reference types="cypress" />
import TestFilter from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const amidoHeaders = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
    "x-set-caching": "false",
    "test-with-local-esi": true,
}

const terminalLog = terminalLogFn

const viewportLength = 500

TestFilter(["build"], () => {
    context("Given PLP - Amido Search Banner", () => {
        describe("Image-CTAs Template", () => {
            describe("desktop view (<1024px)", () => {
                beforeEach(() => {
                    cy.viewport(1024, viewportLength)
                    cy.visit("/shop/brands", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-image-ctas-template']").should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("small desktop view (768px > 1024px)", () => {
                beforeEach(() => {
                    cy.viewport(768, viewportLength)
                    cy.visit("/shop/brands/", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-image-ctas-template']").should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("mobile view (>768px)", () => {
                beforeEach(() => {
                    cy.viewport(767, viewportLength)
                    cy.visit("/shop/brands/", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-image-ctas-template']").should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display banner small image", () => {
                    cy.get("[data-testid='plp-search-banner-small-image']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
        describe("SEO Template", () => {
            describe("desktop view (<1024px)", () => {
                beforeEach(() => {
                    cy.viewport(1024, viewportLength)
                    cy.visit("/shop/seo", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-seo-metadata-template']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the text element", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more element", () => {
                    cy.get("[data-testid='search-banner-read-more']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("small desktop view (768px > 1024px)", () => {
                beforeEach(() => {
                    cy.viewport(768, viewportLength)
                    cy.visit("/shop/seo", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-seo-metadata-template']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the text element", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more element", () => {
                    cy.get("[data-testid='search-banner-read-more']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("mobile view (>768px)", () => {
                beforeEach(() => {
                    cy.viewport(767, viewportLength)
                    cy.visit("/shop/seo", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-seo-metadata-template']").should("be.hidden")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display the text element if the read more chevron is not clicked", () => {
                    cy.get("[data-testid=search-banner-mobile-read-more-content]").should("not.be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more chevron", () => {
                    cy.get("[data-testid=plp-search-banner-chevron]").click()
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the text element after the read more chevron is clicked", () => {
                    cy.get("[data-testid=plp-search-banner-chevron]").click()
                    cy.wait(100)
                    cy.get("[data-testid=search-banner-mobile-read-more-content]").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display banner small image", () => {
                    cy.get("[data-testid='plp-search-banner-small-image']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
        describe("Image CTAs and Copy Template", () => {
            describe("desktop view (<1024px)", () => {
                beforeEach(() => {
                    cy.viewport(1024, viewportLength)
                    cy.visit("/shop/newbrands", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-image-ctas-copy-template']").should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display content", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should have readmore style class on load", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("have.class", "readmore")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more button", () => {
                    cy.get("#plp")
                        .find("[data-testid=search-banner-read-more]")
                        .should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display read more button with correct text and button text should be changed after clicking", () => {
                    cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read More")
                    cy.get('[data-testid="search-banner-read-more"]').click()
                    cy.get("[data-testid='search-banner-read-more']").contains("- Read Less", {matchCase: false}) // for the life of me, don't know why cypress is being booky with case here
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display search banner chevron", () => {
                    cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("small desktop view (768px > 1024px)", () => {
                beforeEach(() => {
                    cy.viewport(768, viewportLength)
                    cy.visit("/shop/newbrands/", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-image-ctas-copy-template']").should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display content", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should have readmore style class on load", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("have.class", "readmore")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more button", () => {
                    cy.get("#plp")
                        .find("[data-testid=search-banner-read-more]")
                        .should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display read more button with correct text and button text should be changed after clicking", () => {
                    cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read More")
                    cy.get('[data-testid="search-banner-read-more"]').click()
                    // for the life of me, don't know why cypress is being difficult with letter case below
                    cy.get("[data-testid='search-banner-read-more']").contains("- Read Less", {matchCase: false})
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display search banner chevron", () => {
                    cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("mobile view (>768px)", () => {
                beforeEach(() => {
                    cy.viewport(767, viewportLength)
                    cy.visit("/shop/newbrands/", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-image-ctas-copy-template']").should("exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display banner small image", () => {
                    cy.get("[data-testid='plp-search-banner-small-image']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
        describe("SEO Template", () => {
            describe("desktop view (<1024px)", () => {
                beforeEach(() => {
                    cy.viewport(1024, viewportLength)
                    cy.visit("/shop/seo", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-seo-metadata-template']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the text element", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more element", () => {
                    cy.get("[data-testid='search-banner-read-more']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("small desktop view (768px > 1024px)", () => {
                beforeEach(() => {
                    cy.viewport(768, viewportLength)
                    cy.visit("/shop/seo", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-seo-metadata-template']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the text element", () => {
                    cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more element", () => {
                    cy.get("[data-testid='search-banner-read-more']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display banner large image", () => {
                    cy.get("[data-testid='plp-search-banner-large-image']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
            describe("mobile view (>768px)", () => {
                beforeEach(() => {
                    cy.viewport(767, viewportLength)
                    cy.visit("/shop/seo", {headers: amidoHeaders})
                    cy.injectAxe()
                })

                it("should display search banner", () => {
                    cy.get("[data-testid='plp-seo-metadata-template']").should("be.hidden")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display the text element if the read more chevron is not clicked", () => {
                    cy.get("[data-testid=search-banner-mobile-read-more-content]").should("not.be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the read more chevron", () => {
                    cy.get("[data-testid=plp-search-banner-chevron]").click()
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display the text element after the read more chevron is clicked", () => {
                    cy.get("[data-testid=plp-search-banner-chevron]").click()
                    cy.wait(100)
                    cy.get("[data-testid=search-banner-mobile-read-more-content]").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display quick links", () => {
                    cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display banner small image", () => {
                    cy.get("[data-testid='plp-search-banner-small-image']").should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display search banner chevron", () => {
                    cy.get("[data-testid='plp-search-banner-chevron']").should("be.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display content", () => {
                    cy.get("[data-testid='search-banner-mobile-read-more-content']").should("be.not.visible")
                    // cy.checkA11y(null, null, terminalLog, true)
                })

                it("should display read more content on click chevron", () => {
                    cy.get("[data-testid='plp-search-banner-chevron']").click()
                    cy.get("[data-testid='search-banner-mobile-read-more-content']").should("be.visible")
                })
            })
        })
    })
})
