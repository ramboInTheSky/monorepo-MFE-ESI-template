/// <reference types="cypress" />
import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const viewportLength = 500

TestFilter(["build"], () => {
    context("Given plp - Search banner", () => {
        describe("Search banner - Image-CTAs-Copy Template - desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/men/", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
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

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display banner large image", () => {
                cy.get("[data-testid='plp-search-banner-large-image']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the read more button", () => {
                cy.get("#plp")
                    .find("[data-testid=search-banner-read-more]")
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display read more button with correct text and button text should be changed after clicking", () => {
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - Image-CTAs-Copy Template - mobile view", () => {
            beforeEach(() => {
                cy.viewport(700, viewportLength)
                cy.visit("/shop/men/", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner content on load", () => {
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner content when chevron clicked", () => {
                cy.get('[data-testid="plp-search-banner-chevron"]').click()
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("have.class", "show")
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - CTAs-Copy Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/boots", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-ctas-copy-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
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

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the read more button", () => {
                cy.get("#plp")
                    .find("[data-testid=search-banner-read-more]")
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display read more button with correct text and button text should be changed after clicking", () => {
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - CTAs-Copy Template mobile view", () => {
            beforeEach(() => {
                cy.viewport(700, viewportLength)
                cy.visit("/shop/boots", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-ctas-copy-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner content on load", () => {
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner content when chevron clicked", () => {
                cy.get('[data-testid="plp-search-banner-chevron"]').click()
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("have.class", "show")
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - Roundels Template desktop view", () => {
            const roundelsItemText = [
                "Amido",
                "Brands",
                "Coats",
                "& Jackets",
                "Jumpers",
                "& Cardigans",
                "Tops",
                "Dresses",
                "Sportswear",
                "Lingerie",
                "Shoes",
                "Accessories",
            ]

            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/gender-women/", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display roundels template", () => {
                cy.get("[data-testid='plp-roundels-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display roundels", () => {
                cy.get("[data-testid='plp-roundels-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display correct number of children", () => {
                const children = cy.get("[data-testid='plp-roundels-template']").children()
                children.should("have.length", 10)
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should have correct class name for anchor element", () => {
                cy.get("[data-testid='plp-roundels-template']")
                    .find("a")
                    .then($a => {
                        const className = $a.attr("class")
                        expect(className).to.equal("roundelsItem link")
                    })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should have correct class name for image element", () => {
                cy.get("[data-testid='plp-roundels-template']")
                    .find("a")
                    .then($a => {
                        const image = $a.find("img")
                        expect(image.attr("class")).to.equal("roundelsItem image")
                    })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should have correct class name for text element", () => {
                cy.get("[data-testid='plp-roundels-template']")
                    .find("a")
                    .then($a => {
                        const span = $a.find("span")
                        expect(span.attr("class")).to.equal("roundelsItem text")
                    })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should have correct text for elements", () => {
                cy.get("[data-testid='plp-roundels-template']")
                    .find("a")
                    .then($a => {
                        $a.find("div.span").each((index, element) => {
                            expect(element.innerText).to.equal(roundelsItemText[index])
                        })
                    })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should navigate to another page", () => {
                cy.get("[data-testid='plp-roundels-template']")
                    .find('[data-testid="plp-roundels-template-amido"]')
                    .eq(0)
                    .click()
                    .url()
                    .should("include", "shop/gender-women/brand-amido-feat-newin")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - CTAs-Copy-Strip Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/department-homeware", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-ctas-copy-strip-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
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

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the read more button", () => {
                cy.get("#plp")
                    .find("[data-testid=search-banner-read-more]")
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display read more button with correct text and button text should be changed after clicking", () => {
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display strip", () => {
                cy.get("[data-testid='plp-search-banner-strip']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - CTAs Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/search?w=sportswear", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-ctas-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - Schoolwear-CTAs-Copy-Strip Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/schoolwear", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-sw-ctas-copy-strip-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display title", () => {
                cy.get("[data-testid='plp-search-banner-title']").should("be.visible")
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

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the read more button", () => {
                cy.get("#plp")
                    .find("[data-testid=search-banner-read-more]")
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display read more button with correct text and button text should be changed after clicking", () => {
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display strip", () => {
                cy.get("[data-testid='plp-search-banner-strip']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - Image-Copy Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/beauty", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-image-copy-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display content", () => {
                cy.get("[data-testid='search-banner-read-more-content']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the read more button", () => {
                cy.get("#plp")
                    .find("[data-testid=search-banner-read-more]")
                    .should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display read more button with correct text and button text should be changed after clicking", () => {
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - Lingerie Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/lingerie", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-lingerie-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
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
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display roundels", () => {
                cy.get("[data-testid='plp-search-banner-roundels']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display strip", () => {
                cy.get("[data-testid='plp-search-banner-strip']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner - Roundels-Copy Template desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/shop/productaffiliation-footwear", {headers: amidoHeaders})
                cy.injectAxe()
            })

            it("should display right template", () => {
                cy.get("[data-testid='plp-roundels-copy-template']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("be.visible")
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
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "+ Read more")
                cy.get('[data-testid="search-banner-read-more"]').click()
                cy.get("[data-testid='search-banner-read-more']").should("contain.text", "- Read less")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display roundels", () => {
                cy.get("[data-testid='plp-search-banner-roundels']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})

const amidoHeadersNoEsi = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
    "test-with-local-esi": "false",
    "x-monorepo-siteurl": "http://localhost:3009",
    "x-monorepo-banner-format": "html",
}

TestFilter(["build"], () => {
    context("Given plp - Search banner", () => {
        describe("Search banner content desktop view", () => {
            beforeEach(() => {
                cy.viewport(1280, viewportLength)
                cy.visit("/search?w=NO_ESI", {headers: amidoHeadersNoEsi})
                cy.injectAxe()
            })
            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display content", () => {
                cy.get("[data-testid='search-banner-read-more-content']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display banner large image", () => {
                cy.get("[data-testid='plp-search-banner-large-image']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the read more button", () => {
                cy.get("#plp")
                    .find("[data-testid=search-banner-read-more]")
                    .should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("Search banner content mobile view", () => {
            beforeEach(() => {
                cy.viewport(700, viewportLength)
                cy.visit("/search?w=NO_ESI", {headers: amidoHeadersNoEsi})
                cy.injectAxe()
            })

            it("should display search banner", () => {
                cy.get("[data-testid='plp-search-banner']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display quick links", () => {
                cy.get("[data-testid='plp-search-banner-quick-links']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display search banner chevron", () => {
                cy.get("[data-testid='plp-search-banner-chevron']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display search banner content on load", () => {
                cy.get("[data-testid='search-banner-mobile-read-more-content']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
