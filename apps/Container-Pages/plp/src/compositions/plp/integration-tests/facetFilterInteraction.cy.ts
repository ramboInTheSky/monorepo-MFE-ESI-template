/* istanbul ignore file */
/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.

❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/

/// <reference types="cypress" />
import wait from "../../../../__mocks__/wait"
import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

var fixtures = require("@monorepo/cypress-fixtures")

context("Given a plp - Filter and Facet interaction", () => {
    TestFilter(["build"], () => {
        beforeEach(() => {
            cy.intercept("http://localhost:3009", req => {
                req.headers["test-with-local-esi"] = "true"
            })
            cy.injectAxe()
        })
        describe("When I browse to PLP with a width of smaller than 1024", () => {
            beforeEach(() => {
                cy.viewport(1023, 1100)
                cy.visit("/search?w=Red", {headers: amidoHeaders})
            })

            it("should show the facets button", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the filters available if facet is clicked", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-gender]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-gender:women"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-gender:men"]').should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should change the filters if a different facet is selected", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()

                cy.get("[data-testid=plp-tabbed-filter-button-gender]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-gender:women"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-gender:men"]').should("be.visible")

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-gender:women"]').should("not.exist")
                cy.get('[data-testid="plp-tabbed-facet-button-category:capes"]').should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("facets should not get removed on initial filter selection", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-personalised]").should("be.visible")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("some facets should disable if filter is selected and a different facet is selected", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()

                cy.get("[data-testid=plp-tabbed-filter-button-personalised]").click()

                cy.get("[data-testid=plp-tabbed-facets-no-options]")
                    .should("be.visible")
                    .contains("This option isn't available with your current selection(s)")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("one green indicator should appear if facet filter is selected and view is changed to different facet", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-personalised]").click()

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]')
                    .should("be.visible")
                    .should("have.length", 1)
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should have multiple green indicators if filters in multiple facets have been selected", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-gender]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-gender:men"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-gender:men"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-brand]").click()

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]')
                    .should("be.visible")
                    .should("have.length", 2)
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("if a facet filters is selected, the dialogue box is closed and reopened, the selected filter should appear below its facet", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-brand]").click()
                cy.wait(100)

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.wait(1000)

                cy.get("[data-testid=plp-tabbed-filter-button-brand]").click()

                cy.get('[data-testid="plp-filters-close-button"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-personalised"]').should("not.exist")

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.wait(100)
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains("Jackets")

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]').should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            // Fails atm because of an API bug. This bug is noted here:
            // https://dev.azure.com/Amido.Ecommerce.TeamModernisation/_workitems/edit/21533
            it.skip("if facet filters are selected, the dialogue box is closed and reopened, the selected filters should appear below their facets, and stay there on feat selection", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-gender]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-gender:women"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-gender:women"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-gender:men"]').click()

                cy.get('[data-testid="plp-tabbed-filter-button-category"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-category:coats"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-brand]").click()

                cy.get('[data-testid="plp-filters-close-button"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-gender"]').should("not.exist")

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-gender"]')
                    .should("be.visible")
                    .contains(" Women, Men")
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains(" Coats")

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]').should("not.exist")

                cy.get('[data-testid="plp-tabbed-key-filter-button-feat:newin"]').click()
                cy.wait(200)

                cy.get('[data-testid="plp-tabbed-facets-selected-filter-gender"]')
                    .should("be.visible")
                    .contains(" Women, Men")
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains(" Coats")
            })

            it("if facet filters are selected, the dialogue box is closed and reopened, the selected filters should appear below their facets, and the green indicator only shows when facets are opened", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-tabbed-filter-button-brand"]').click()

                cy.get('[data-testid="plp-filters-close-button"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-gender"]').should("not.exist")

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains("Jackets")

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]').should("not.exist")

                cy.get("[data-testid=plp-tabbed-filter-button-brand]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]')
                    .should("be.visible")
                    .should("have.length", 1)
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should the clear button be pressed, the selected facet filters are cleared", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()
                cy.wait(100)

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-tabbed-filter-button-brand"]').click()

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]')
                    .should("be.visible")
                    .should("have.length", 1)

                cy.get("[data-testid=plp-filters-close-text-cta]").click()

                cy.get('[data-testid="plp-tabbed-facets-selected-dot"]').should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should the clear button be pressed after a feat facet was selected, the selected facet filters are cleared", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()

                cy.get('[data-testid="plp-tabbed-key-filter-button-feat:newin"]').click()
                cy.wait(100)
                cy.get('[data-testid="plp-tabbed-filter-tick"]')
                    .should("be.visible")
                    .should("have.length", 1)

                cy.get("[data-testid=plp-tabbed-filter-button-gender]").click()
                cy.wait(100)

                cy.get("[data-testid=plp-filters-close-text-cta]").click()

                cy.get('[data-testid="plp-tabbed-filter-tick"]').should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("filter selection should not be saved if facet has not been changed", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-filters-close-button"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-category"]').should("not.exist")

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]').should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should filters be selected, and the dialogue box re-opened, the previously disabled facets should no longer appear", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-tabbed-filter-button-gender"]').click()

                cy.get('[data-testid="plp-filters-close-button"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-category"]').should("not.exist")

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains("Jackets")

                cy.get("[data-testid=plp-tabbed-filter-button-personalised]").should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should handle pricing filter changes", () => {
                cy.visit("/search?w=FILTER_SELECTION", {headers: amidoHeaders})
                cy.get("[data-testid=plp-filters-menu-btn]").click()

                cy.get("[data-testid=plp-tabbed-filter-button-Price]").click()

                const slider = cy.get("[data-testid='plp-price-slider']")
                slider.should("be.visible")

                slider
                    .get("span[role=slider]")
                    .first()
                    .trigger("mousedown", {button: 0})
                    .trigger("mousemove", {
                        clientX: 900,
                        clientY: 90,
                        screenX: 900,
                        screenY: 90,
                        pageX: 900,
                        pageY: 90,
                    })
                    .trigger("mouseup", {force: true})

                cy.get("[data-testid=plp-price-slider-label]").should("contain.text", "Price Range: £60 - £100")

                cy.wait(500)

                cy.shouldTrackEvent({
                    event: "filter",
                    data: {
                        filter: {
                            category: "filter",
                            action: "select",
                            label: "price",
                            option: `60 - 100`,
                        },
                    },
                })

                cy.get("[data-testid=plp-tabbed-filter-button-Style]").click()

                cy.get('[data-testid="plp-filters-close-button"]').click()

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-Price"]')
                    .should("be.visible")
                    .contains("£20 - £100")
                // cy.checkA11y(null, null, terminalLog, true)
            })

            it("should repopulate the previously removed facets on filter uncheck", () => {
                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get('[data-testid="plp-tabbed-filter-button-gender"]').click()

                cy.get('[data-testid="plp-filters-close-button"]').click()
                cy.get('[data-testid="plp-tabbed-facet-button-category"]').should("not.exist")

                cy.get("[data-testid=plp-filters-menu-btn]").click()
                cy.get('[data-testid="plp-tabbed-facets-selected-filter-category"]')
                    .should("be.visible")
                    .contains("Jackets")

                cy.get("[data-testid=plp-tabbed-filter-button-personalised]").should("not.exist")

                cy.get("[data-testid=plp-tabbed-filter-button-category]").click()

                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').should("be.visible")
                cy.get('[data-testid="plp-tabbed-facet-button-category:jackets"]').click()

                cy.get("[data-testid=plp-tabbed-filter-button-personalised]").should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
