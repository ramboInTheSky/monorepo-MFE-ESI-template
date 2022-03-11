/// <reference types="cypress" />

import {REALM_HEADER} from "../../../config/constants"
import quickLinksConfig from "../../../config/categoryQuickLinks.json"
import TestFilter, {TestDataSwitcher} from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

const amidoUkItems = quickLinksConfig.amido.uk
const internationalItems = quickLinksConfig.amido.international
const firstAmidoUkItemUrl = amidoUkItems[0].href.replace("{SITE_URL}", "http://localhost:3009")

context("Given category quick links on no results page", () => {
    const testId = TestDataSwitcher(["postdeploy"], "asdasdsadsasadasdasdasdasda", "NO-RESULTS")

    beforeEach(() => {
        cy.viewport(1280, 1000)
        cy.visit(`/search?w=${testId}`, {headers: amidoHeaders})
        cy.injectAxe()
    })
    describe("Given on the no results page", () => {
        describe("when there are configured items", () => {
            it("should display the quick link tiles", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .should("have.length", amidoUkItems.length)

                amidoUkItems.forEach((item, i) => {
                    cy.get("#plp")
                        .find('[data-testid="plp-category-quick-link-item"]')
                        .eq(i)
                        .should("include.text", item.title)
                        .should("include.text", item.description)
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        TestFilter(["build"], () => {
            describe("when territory is not `gb`", () => {
                beforeEach(() => {
                    cy.visit(`/search?w=${testId}`, {headers: {...amidoHeaders, "x-monorepo-territory": "mx"}})
                })
                it("should display the international items", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-category-quick-link-item"]')
                        .should("have.length", internationalItems.length)
                    internationalItems.forEach((item, i) => {
                        cy.get("#plp")
                            .find('[data-testid="plp-category-quick-link-item"]')
                            .eq(i)
                            .should("include.text", item.title)
                            .should("include.text", item.description)
                    })
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
        TestFilter(["build"], () => {
            describe("When there are no configured items", () => {
                beforeEach(() => {
                    cy.visit(`/search?w=${testId}`, {headers: {...amidoHeaders, [REALM_HEADER]: "amido"}})
                })
                it("should not display the category quick links", () => {
                    cy.wait(1000)
                    cy.get("#plp")
                        .find('[data-testid="plp-category-quick-links"]')
                        .should("not.exist")
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When a tile image is clicked", () => {
                it("should navigate to another page", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-category-quick-link-item-image"]')
                        .eq(0)
                        .click()
                        .url()
                        .should("eq", firstAmidoUkItemUrl)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When a tile title is clicked", () => {
                it("should navigate to another page", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-category-quick-link-item-title"]')
                        .eq(0)
                        .click()
                        .url()
                        .should("eq", firstAmidoUkItemUrl)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When a tile description is clicked", () => {
                it("should navigate to another page", () => {
                    cy.get("#plp")
                        .find('[data-testid="plp-category-quick-link-item-description"]')
                        .eq(0)
                        .click()
                        .url()
                        .should("eq", firstAmidoUkItemUrl)
                    // cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })
    })
    TestFilter(["build"], () => {
        describe("On a touch device", () => {
            beforeEach(() => {
                cy.viewport("iphone-x")
                cy.visit("/search?w=NO-RESULTS", {headers: amidoHeaders})
            })
            it("should be scrollable", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(0)
                    .shouldBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(2)
                    .trigger("pointerdown", {which: 1})
                    .trigger("pointermove", "left")
                    .trigger("pointerup", {force: true})

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(0)
                    .shouldNotBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(2)
                    .shouldBeInViewport()

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
    TestFilter(["build"], () => {
        describe("On a small device", () => {
            beforeEach(() => {
                cy.viewport("iphone-x")
                cy.visit(`/search?w=${testId}`, {headers: amidoHeaders})
            })
            it("should not display quick link descriptions", () => {
                cy.wait(1000)
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item-description"]')
                    .should("not.exist")

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
    TestFilter(["build"], () => {
        describe("On a click device", () => {
            it("should be scrollable", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(0)
                    .shouldBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(2)
                    .trigger("pointerdown", {which: 1})
                    .trigger("pointermove", "left")
                    .trigger("pointerup", {force: true})

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(0)
                    .shouldNotBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(1)
                    .shouldBeInViewport()
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the chevron on the right (but not on the left) when there are items to be scrolled into on the right", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-links"]')
                    .find(".swiper-button-next")
                    .should("be.visible")

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-links"]')
                    .find(".swiper-button-prev")
                    .should("not.be.visible")

                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display the chevron on the right (but should display the one on the left) when there are no items to be scrolled into on the right", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(2)
                    .trigger("pointerdown", {which: 1})
                    .trigger("pointermove", "left")
                    .trigger("pointermove", "left")
                    .trigger("pointermove", "left")
                    .trigger("pointermove", "left")
                    .trigger("pointermove", "left")
                    .trigger("pointerup", {force: true})

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-links"]')
                    .find(".swiper-button-next")
                    .should("not.be.visible")

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-links"]')
                    .find(".swiper-button-prev")
                    .should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should scroll to the right when the chevrons are clicked", () => {
                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(amidoUkItems.length - 1)
                    .shouldNotBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-links"]')
                    .find(".swiper-button-next")
                    .click()
                    .click()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(amidoUkItems.length - 1)
                    .shouldBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(0)
                    .shouldNotBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-links"]')
                    .find(".swiper-button-prev")
                    .click()
                    .click()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(0)
                    .shouldBeInViewport()

                cy.get("#plp")
                    .find('[data-testid="plp-category-quick-link-item"]')
                    .eq(amidoUkItems.length - 1)
                    .shouldNotBeInViewport()

                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
