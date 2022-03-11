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

export const useMouseEnter = (device: string, orientation: string): boolean => {
    const tabletInLandscape = device === "tablet" && orientation === "landscape"
    const desktopInPortrait = device === "desktop" && orientation === "portrait"
    const useMouseEnter = desktopInPortrait || tabletInLandscape
    return useMouseEnter
}

context(`SecondaryNav - ${fixtures.realmType} realm`, () => {
    mobile.forEach(viewport => {
        testCases(viewport, "mobile")
    })
    tablet.forEach(viewport => {
        testCases(viewport, "tablet")
    })
    desktop.forEach(viewport => {
        testCases(viewport, "desktop")
    })
})

function testCases(viewport, device) {
    describe(`Secondary Nav - ${viewport.type} - ${viewport.device}`, () => {
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
                    cy.get("[data-testid='snail-trail-container']").scrollTo(100, 0)
                })
                describe("Banner: ", () => {
                    beforeEach(() => {
                        const primaryNavSports = cy.get("[data-testid='meganav-primarynav-link-sports']")
                        const isMouseEnter = useMouseEnter(device, orientation)
                        if (isMouseEnter) {
                            primaryNavSports.trigger("mouseover")
                        } else {
                            primaryNavSports.click()
                        }
                    })
                    it("should have banner", () => {
                        cy.get("[data-testid='banner']").should("exist")
                    })
                })
                describe("Missions: ", () => {
                    beforeEach(() => {
                        const primaryNavSports = cy.get("[data-testid='meganav-primarynav-link-sports']")
                        const isMouseEnter = useMouseEnter(device, orientation)
                        if (isMouseEnter) {
                            primaryNavSports.trigger("mouseover")
                        } else {
                            primaryNavSports.click()
                        }
                    })
                    it("should have 1/3 of the width of the parent container excluding 20px margin for the first 2 items", () => {
                        cy.get("[data-testid='missions']").then(e => {
                            cy.get("[data-testid='missions']")
                                .children()
                                .first()
                                .children()
                                .invoke("css", "width")
                                .should("be", (e.width() - 40) / 3)
                        })
                    })
                    it("should redirect when missions item is clicked", () => {
                        cy.get("[data-testid='missions-item']")
                            .first()
                            .click()
                            .then($element => {
                                const href = $element.attr("href")
                                cy.url().should("include", href)
                            })
                    })
                    it("should redirect when missions category link is clicked", () => {
                        cy.get("[data-testid='missions-cta']")
                            .children()
                            .closest("a")
                            .click()
                            .then($element => {
                                const href = $element.attr("href")
                                cy.url().should("include", href)
                            })
                    })
                })
                describe("Tabs: ", () => {
                    beforeEach(() => {
                        const primaryNavSports = cy.get("[data-testid='meganav-primarynav-link-sports']").within(() => {
                            const isMouseEnter = useMouseEnter(device, orientation)
                            if (isMouseEnter) {
                                primaryNavSports.trigger("mouseover")
                            } else {
                                primaryNavSports.click()
                            }
                        })
                    })
                    it("should have usable tabs", () => {
                        testTabs(device, orientation)
                    })
                })
                describe("Secondary Nav content: ", () => {
                    beforeEach(() => {
                        const primaryNavSports = cy.get("[data-testid='meganav-primarynav-link-sports']").within(() => {
                            const isMouseEnter = useMouseEnter(device, orientation)

                            if (isMouseEnter) {
                                primaryNavSports.trigger("mouseover")
                            } else {
                                primaryNavSports.click()
                            }
                        })
                    })
                    it.only("should open secondary nav", () => {
                        testSecondaryNav(device, orientation)
                    })
                })
                describe("Secondary Nav content for Territory with enabled ImagePlaceholder: ", () => {
                    const isSmallScreen = device === "mobile" || (device === "tablet" && orientation === "portrait")
                    beforeEach(() => {
                        const primaryNavMen = cy.get("[data-testid='meganav-primarynav-link-men']").within(() => {
                            if (isSmallScreen) {
                                primaryNavMen.click()
                            } else {
                                primaryNavMen.trigger("mouseover")
                            }
                        })
                    })
                    it(`should open secondary nav with ${
                        !isSmallScreen ? "no" : ""
                    } image or image-placeholder`, () => {
                        if (isSmallScreen) {
                            cy.get("[data-testid='meganav-secondary-nav-small-screen-image-placeholder']").should(
                                "exist",
                            )
                        } else {
                            cy.get("[data-testid='meganav-secondary-nav-small-screen-image-placeholder']").should(
                                "not.exist",
                            )
                        }
                    })
                })
            })
            describe("Secondary Nav content for  Territory with disabled ImagePlaceholder: ", () => {
                const isSmallScreen = device === "mobile" || (device === "tablet" && orientation === "portrait")
                beforeEach(() => {
                    cy.viewport(viewport.device, orientation)
                    cy.visit("/meganavcontainer", {
                        headers: {
                            "x-monorepo-language": "en",
                            "x-monorepo-realm": fixtures.realmType,
                            "x-monorepo-territory": "mx",
                            "x-monorepo-siteurl": "http://localhost:3333",
                        },
                    })

                    const primaryNavMen = cy.get("[data-testid='meganav-primarynav-link-men']").within(() => {
                        if (isSmallScreen) {
                            primaryNavMen.click()
                        } else {
                            primaryNavMen.trigger("mouseover")
                        }
                    })
                })
                it(`should open secondary nav with ${!isSmallScreen ? "no" : ""} image or image-placeholder`, () => {
                    if (isSmallScreen) {
                        cy.get("[data-testid='meganav-secondary-nav-small-screen-image-placeholder']").should(
                            "not.exist",
                        )
                    } else {
                        cy.get("[data-testid='meganav-secondary-nav-small-screen-image-placeholder']").should(
                            "not.exist",
                        )
                    }
                })
            })
        })
    })
}

const testTabs = (device: string, orientation: string) => {
    const isDesktop = device === "desktop"
    // FIXME this does not look right seem to be an issue in @monorepo/cypress-fixtures the correct condition should be
    // const isLandscape = orientation === "landscape"
    const isLandscape = orientation === "portrait"

    if (isDesktop && isLandscape) {
        cy.get("[role='tablist']").should("be.visible")
        cy.get("[role='tab']").click({multiple: true})
    } else {
        cy.get("[role='tablist']").should("not.exist")
    }
}

const testSecondaryNav = (device: string, orientation: string) => {
    const isDesktop = device === "desktop"
    const isLandscape = orientation === "landscape"
    const isMobile = device === "mobile"
    const isTablet = device === "tablet"
    const isDesktopAndLandscape = isDesktop && isLandscape
    const isAccordion = isDesktopAndLandscape || isTablet || isMobile

    if (isAccordion) {
        cy.contains("WOMENS").as("accordion-title")
        cy.get("@accordion-title").click()
        cy.get("li").as("accordion-content").should("be.visible")
        cy.get("@accordion-title").click()
        cy.get("accordion-content").should("not.be.visible")
    }

    cy.get("[data-testid='catalogue'] div")
        .contains("Jackets")
        .as("jackets")
        .should("have.attr", "href")
        .then(href => {
            cy.get("@jackets").click({force: true})
            cy.url().should("include", href)
        })
}
