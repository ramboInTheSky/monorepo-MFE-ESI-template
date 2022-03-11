/// <reference types="cypress" />
var fixtures = require("@monorepo/cypress-fixtures")
fixtures.realmType = "next"

const mobile = fixtures.devices.reduce((acc, next) => {
    return next.type === "mobile" ? acc.concat([next]) : acc
}, [])

const tablet = fixtures.devices.reduce((acc, next) => {
    return next.type === "tablet" ? acc.concat([next]) : acc
}, [])

const desktop = fixtures.devices.reduce((acc, next) => {
    return next.type === "desktop" ? acc.concat([next]) : acc
}, [])

// REMOVED TESTS AS THEY NEED REWRITING, @Isaac Shek
context(`PrimaryNav - ${fixtures.realmType} realm`, () => {
    // mobile.forEach(viewport => {
    //     testCases(viewport, "mobile")
    // })
    // tablet.forEach(viewport => {
    //     testCases(viewport, "tablet")
    // })
    // desktop.forEach(viewport => {
    //     testCases(viewport, "desktop")
    // })
})

function testCases(viewport, device) {
    describe(`Primary Nav - ${viewport.type} - ${viewport.device}`, () => {
        viewport.orientation.forEach(orientation => {
            describe(`when loaded with ${fixtures.realmType} headers on ${viewport.device} ${orientation}`, () => {
                beforeEach(() => {
                    cy.viewport(viewport.device, orientation)

                    cy.visit("/meganavcontainer", {
                        headers: {
                            "x-monorepo-language": "en",
                            "x-monorepo-realm": fixtures.realmType,
                            "x-monorepo-territory": "gb",
                            "x-monorepo-siteurl": "http://localhost:3333",
                        },
                    })
                })
                describe("Secondary Nav display modes: ", () => {
                    it("should open different display modes ", () => {
                        testSecondaryNavModes(device, orientation)
                    })
                })
            })
        })
    })
}

function testSecondaryNavModes(device: string, orientation: string) {
    const isDesktop = device === "desktop"
    const isTablet = device === "tablet"
    const isMobile = device === "mobile"
    const isLandscape = orientation === "landscape"

    const isTabletLandscape = isTablet && isLandscape
    const isDesktopLandscape = isDesktop && isLandscape

    const isDrawer = isMobile || (isTablet && !isLandscape)

    cy.get("[data-testid='meganav-primarynav-link-new-in']").first().as("first-item")
    cy.get("[data-testid='meganav-primarynav-link-clearance']").last().as("last-item")

    if (isDrawer) {
        cy.get("[data-testid='secondary-meganav-narrow']").should("not.exist")
        cy.get("[data-testid='drawer']").should("not.exist")

        cy.get("@first-item").trigger("click")
        cy.get("[data-testid='drawer']").as("drawer").should("be.visible")
        cy.get("[data-testid='secondary-meganav-narrow']").as("secondary-meganav-narrow").should("be.visible")

        cy.get("@first-item").trigger("mouseout")
        cy.get("@drawer").should("be.visible")
        cy.get("@secondary-meganav-narrow").should("be.visible")

        cy.get("[data-testid='drawer'] div").first().as("backdrop")
        cy.get("@backdrop").trigger("click", {force: true})
        cy.get("@secondary-meganav-narrow").should("not.be.visible")
    } else {
        let trigger = "mouseover"
        cy.get("[data-testid='secondary-meganav-wide']").should("not.exist")
        cy.get("[data-testid='overlay']").should("not.exist")

        if (isDesktopLandscape) {
            trigger = "click"
        }

        cy.get("@first-item").trigger(trigger)

        // currently mac-book13 is set for this scenario, it may break if adding larger desktop screen
        if (isDesktopLandscape) {
            cy.get("[data-testid='secondary-meganav-narrow']").as("secondary-meganav-narrow")
            cy.get("@secondary-meganav-narrow").should("be.visible")

            cy.get("[data-testid='drawer'] div").first().as("backdrop")
            cy.get("@backdrop").trigger("click", {force: true})
            cy.get("@secondary-meganav-narrow").should("not.be.visible")
        } else {
            cy.get("[data-testid='secondary-meganav-wide']").as("secondary-meganav-wide")
            cy.get("[data-testid='overlay']").as("overlay")

            cy.get("@overlay").should("be.visible")
            cy.get("@secondary-meganav-wide").should("be.visible")
            cy.get("@secondary-meganav-wide").trigger(trigger, {force: true})

            cy.get("@last-item").trigger(trigger)
            cy.get("@secondary-meganav-wide").should("be.visible")

            cy.get("@first-item").trigger("mouseout")
            cy.get("@overlay").should("not.be.visible")
            cy.get("@secondary-meganav-wide").should("not.be.visible")
        }
    }
}
