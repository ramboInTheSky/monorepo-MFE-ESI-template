/// <reference types="cypress" />

import TestFilter from "../../../../cypress/modules/filter"
import {amidoHeaders} from "../../../../__mocks__/mockHeaders"
import terminalLogFn from "../../../utils/terminalLogFn"

const terminalLog = terminalLogFn

TestFilter(["build"], () => {
    context("PLP - category search - seo filters", () => {
        const seoFilterId = "#embeddedFiltersContent"
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.injectAxe()
        })
        describe("when search page is /search?w=smart-search", () => {
            it("should not have the embededFiltersContent element on the page", () => {
                cy.visit("/search?w=smart-search", {headers: amidoHeaders})
                cy.get(seoFilterId).should("not.exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when category page is /shop/test-category", () => {
            it("should have the nav embededFiltersContent element on the view source page", () => {
                cy.visit("/shop/test-category", {headers: amidoHeaders})
                cy.get(seoFilterId).should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when category page is /shop/test-category?", () => {
            it("should have the nav embededFiltersContent element on the view source page", () => {
                cy.visit("/shop/test-category?", {headers: amidoHeaders})
                cy.get(seoFilterId).should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when category page is /shop/test-category/abc-123", () => {
            it("should have the nav embededFiltersContent element on the view source page", () => {
                cy.visit("/shop/test-category/abc-123", {headers: amidoHeaders})
                cy.get(seoFilterId).should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
        describe("when category page is /shop/test-category/abc-123?p=1", () => {
            it("should have the nav embededFiltersContent element on the view source page", () => {
                cy.visit("/shop/test-category/abc-123?p=1", {headers: amidoHeaders})
                cy.get(seoFilterId).should("exist")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
