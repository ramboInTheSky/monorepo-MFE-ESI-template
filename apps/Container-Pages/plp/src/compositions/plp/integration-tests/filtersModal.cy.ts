/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

var fixtures = require("@monorepo/cypress-fixtures")

const viewportHeight = 1300
TestFilter(["build"], () => {
    context("Given a plp - Facets View All Modal", function() {
        describe("When I browse to PLP with a width of 1024 ", () => {
            beforeEach(() => {
                cy.viewport(1024, viewportHeight)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
                cy.get("[data-testid='plp-f-f-size']").click()
                cy.wait(100)
                cy.get("[data-testid='plp-view-all-button']").should("be.visible")
                cy.get("[data-testid='plp-view-all-button']").click()
                cy.wait(1000)
                cy.get("[data-testid='plp-view-all-modal']").should("be.visible")
                cy.injectAxe()
            })

            it("View All Modal should display filters and product counts", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").should("be.visible")
                cy.get("[data-testid='plp-facet-modal-count-label-size:1x2022-1']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When a filter is checked inside the View All modal, that filter should appear in the right hand column", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("[data-testid='facet-size:1x2022']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When a filter is checked inside the View All modal, should track a GTM event", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.shouldTrackEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "popup",
                            label: "select",
                            option: "size:1x2022",
                        },
                    },
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When a filter is unchecked inside the View All modal, should track a GTM event", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.shouldTrackEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "popup",
                            label: "remove",
                            option: "size:1x2022",
                        },
                    },
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When a filter is checked inside the View All modal and accepted, it should appear selected on the selected filters facets", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("button")
                    .contains("Confirm Size")
                    .click()
                cy.wait(100)
                cy.get("[data-testid='plp-facet-checkbox-size:1x2022']").should("be.checked")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("In the View All modal, I expect to see the All label at the top, all the alphabet letters and '0-9' as well", () => {
                cy.get("[data-testid='character-link-all']").should("be.visible")
                cy.get("[data-testid='character-link-a']").should("be.visible")
                cy.get("[data-testid='character-link-0-9']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("In the View All modal, I expect selected filters on the right to have a remove icon and when hovered over the word Remove to appear next to it, and when clicke dthe filter should be removed from the right hand column", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").should("be.visible")
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("[data-testid='facet-size:1x2022']").should("be.visible")
                cy.get("[data-testid='remove-button-size:1x2022']").should("be.visible")
                cy.get("[data-testid='remove-button-size:1x2022']").trigger("mouseover")
                cy.get("[data-testid='remove-text-size:1x2022']").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("In the View All modal, I expect when clicking on a selected filter on the right, the filter should disappear", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").should("be.visible")
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("[data-testid='facet-size:1x2022']").should("be.visible")
                cy.get("[data-testid='remove-button-size:1x2022']").should("be.visible")
                cy.get("[data-testid='remove-button-size:1x2022']").trigger("click")
                cy.get("[data-testid='remove-button-size:1x2022']").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When a filter is removed from the selected filters inside View ALl modal, it should track a GTM event", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("[data-testid='remove-button-size:1x2022']").trigger("click")
                cy.shouldTrackEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "popup",
                            label: "clear",
                            option: "size:1x2022",
                        },
                    },
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("In the View All modal, when clicking on the Clear button, all selected filters should disappear form the right", () => {
                cy.get("span")
                    .contains("Clear")
                    .should("not.exist")
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").should("be.visible")
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("[data-testid='facet-size:1x2022']").should("be.visible")
                cy.get("span")
                    .contains("Clear")
                    .should("be.visible")
                    .trigger("click")
                cy.wait(100)
                cy.get("[data-testid='facet-size:1x2022']").should("not.exist")
                cy.get("span")
                    .contains("Clear")
                    .should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("When clear all button is clicked inside View ALl modal, it should track a GTM event", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:1x2022']").click()
                cy.wait(100)
                cy.get("span")
                    .contains("Clear")
                    .trigger("click")

                cy.shouldTrackEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "popup",
                            label: "clear all",
                        },
                    },
                })
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("In the View All modal, the CONFIRM button should also contain the fact name that is being filtered by", () => {
                cy.get("span")
                    .contains("Confirm Size")
                    .should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("In the View All modal, I expect when clicking on a selected filter and confirm, the main plp page should show 30 items in the filter and the selected filter", () => {
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:12-tall']").should("be.visible")
                cy.get("[data-testid='plp-facet-checkbox-modal-label-size:12-tall']").click()
                cy.wait(100)

                cy.get("span")
                    .contains("Confirm Size")
                    .click()

                cy.get("#plp-f-c-size")
                    .find("label")
                    .should("have.length", 30)
                cy.get("[data-testid='plp-facet-checkbox-label-size:12-tall']")
                    .scrollIntoView()
                    .should("be.visible")
                cy.get("[data-testid='plp-facet-checkbox-size:12-tall']").should("be.checked")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
