/// <reference types="cypress" />
import acceptanceTestApiData from "../../../../__mocks__/acceptanceTestsApi"
import madeToMeasureSummaryApi from "../../../../__mocks__/madeToMeasureSummaryApi.json"
import TestFilter, {TestDataSwitcher} from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const amidoHeaders = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
}
const terminalLog = terminalLogFn

context("Given I am browsing a product summary tile at 1024", () => {
    const testId = TestDataSwitcher(["postdeploy"], "TEST-PRODUCT-1", acceptanceTestApiData.testProductItemNumber)
    const testIdSofa = "jackson_82_262919"
    const testIdPersonalisedProduct = "128638"
    const testImageId = TestDataSwitcher(
        ["postdeploy"],
        "TEST-PRODUCT-1",
        acceptanceTestApiData.testColourway1ItemNumber,
    )

    describe("When I visit a url for a pid that exists", () => {
        beforeEach(() => {
            cy.viewport(1024, 500)

            cy.visit(`/productsummarycontainer/${testId}`, {
                headers: amidoHeaders,
            })
            cy.injectAxe()
        })

        TestFilter(["build"], () => {
            it("should display the correct title", () => {
                cy.get(`[data-testid='product_summary_title']`).should(
                    "contain.text",
                    `${acceptanceTestApiData.testColourway1Colour}`,
                )
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        it("should display the colourway product image", () => {
            cy.get(
                `[data-testid='product_summary_image_${
                    testImageId === "TEST-PRODUCT-1" ? "test-product-1" : testImageId
                }']`,
            )
                .should("be.visible")
                .should("have.attr", "src")
                .and(
                    "equal",
                    `https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/Search/224x336/${testImageId}.jpg`,
                )
            cy.checkA11y(null, null, terminalLog, true)
        })

        TestFilter(["build"], () => {
            it("should display the star ratings", () => {
                cy.get("[data-testid='product_summary_star-rating']")
                    .should("be.visible")
                    .should("have.attr", "href")
                    .and("equal", "http://localhost:3333/g7190s5/962950#111111")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
        TestFilter(["build"], () => {
            it("should display the colourchips", () => {
                cy.get("[data-testid='product_summary_colourchips']")
                    .should("be.visible")
                    .find("a")
                    .should("have.attr", "href")
                    .and("equal", "http://localhost:3333/g7190s5/962950#111111")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        it("should display the view more colourchips button", () => {
            cy.get("[data-testid='product_summary_colourchips_view_more_button']")
                .should("be.visible")
                .and("contain.text", "View more colours")
            cy.checkA11y(null, null, terminalLog, true)
        })
        TestFilter(["build"], () => {
            it("should hide the colourchips after 18 are not visible", () => {
                cy.get(
                    `[data-testid='product_summary_colourchip_${acceptanceTestApiData.testColourwayViewMoreItemNumber}']`,
                ).should("not.exist")

                cy.checkA11y(null, null, terminalLog, true)
            })
            it("should have lazyload the colourchips", () => {
                cy.scrollTo("bottom", {duration: 1000, easing: "swing"})
                cy.get(`[data-testid='product_summary_colourchip_503290']`).should("have.class", "lazyloaded")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When clicking view more", () => {
            beforeEach(() => {
                cy.get("[data-testid='product_summary_colourchips_view_more_button']").click()
                cy.injectAxe()
            })
            it("should display the view less colourchips button", () => {
                cy.get("[data-testid='product_summary_colourchips_view_more_button']")
                    .should("be.visible")
                    .and("contain.text", "View less colours")

                cy.checkA11y(null, null, terminalLog, true)
            })
            TestFilter(["build"], () => {
                it("should hide the colourchips after 18 are visible", () => {
                    cy.get(
                        `[data-testid='product_summary_colourchip_${acceptanceTestApiData.testColourwayViewMoreItemNumber}']`,
                    ).should("be.visible")

                    cy.checkA11y(null, null, terminalLog, true)
                })
            })
        })

        const testPrice = TestDataSwitcher(["postdeploy"], "£190 - £200", acceptanceTestApiData.testPrice)
        it("should show the correctly formatted price ", () => {
            cy.get("[data-testid='product_summary_price']").should("contain.text", testPrice)
            cy.checkA11y(null, null, terminalLog, true)
        })
        TestFilter(["build"], () => {
            it("should display the fits icon", () => {
                cy.get("[data-testid='product_summary_fit_icon_petite']").should("be.visible")
                cy.get("[data-testid='product_summary_fit_icon_tall']").should("not.exist")
                cy.checkA11y(null, null, terminalLog, true)
            })
            it("should have lazyloaded the fit petite", () => {
                cy.scrollTo("bottom", {duration: 1000, easing: "swing"}).wait(200)
                cy.get("[data-testid='product_summary_fit_icon_petite']").should("have.class", "lazyloaded")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
        TestFilter(["build"], () => {
            describe("When selecting the second colourway", () => {
                beforeEach(() => {
                    cy.get("[data-testid='product_summary_colourchip_920427']").trigger("mouseover")
                    cy.injectAxe()
                })
                it("should show the tall and petite icons", () => {
                    cy.get("[data-testid='product_summary_fit_icon_petite']").should("be.visible")
                    cy.get("[data-testid='product_summary_fit_icon_tall']").should("be.visible")

                    cy.checkA11y(null, null, terminalLog, true)
                })

                it("should have lazy load the fit petite and tall", () => {
                    cy.scrollTo("bottom", {duration: 1000, easing: "swing"}).wait(200)
                    cy.get("[data-testid='product_summary_fit_icon_petite']").should("have.class", "lazyloaded")
                    cy.get("[data-testid='product_summary_fit_icon_tall']").should("have.class", "lazyloaded")
                    cy.checkA11y(null, null, terminalLog, true)
                })

                it("should not display the colourway sale sash image", () => {
                    cy.get("[data-testid='product_summary_sale_sash']").should("not.exist")
                    cy.checkA11y(null, null, terminalLog, true)
                })
            })

            describe("When user clicks on a colourchip", () => {
                it("should navigate to away", () => {
                    it("should navigate away to product page", () => {
                        cy.get("[data-testid='product_summary_colourchip_1111111']").click().wait(333)

                        cy.url().should("include", "#1111111")
                        cy.checkA11y(null, null, terminalLog, true)
                    })
                })
            })
            TestFilter(["build"], () => {
                describe("When the product is a sofa", () => {
                    beforeEach(() => {
                        cy.viewport(1024, 500)

                        cy.visit(`/productsummarycontainer/sofa/${testIdSofa}`, {
                            headers: amidoHeaders,
                        })
                        cy.injectAxe()
                    })
                    it("should not show the favourite icon", () => {
                        cy.get("[data-testid='product-summary-favourites-button-container']").should("not.exist")
                    })

                    it("should not show review stars", () => {
                        cy.get("[data-testid='product_summary_star-rating--hidden']").should("not.exist")
                    })

                    describe("When the item has the same value for wasMinPrice and wasMaxPrice", () => {
                        beforeEach(() => {
                            cy.get("[data-testid='product_summary_colourchip_jackson_82_262919']").trigger("mouseover")
                            cy.injectAxe()
                        })

                        it("should show a single was price and sale price", () => {
                            cy.get(`[data-testid='product_summary_was_price']`).should("contain.text", "Was £1,000")

                            cy.get(`[data-testid='product_summary_sale_price']`).should("contain.text", "Now £600")
                            cy.checkA11y(null, null, terminalLog, true)
                        })
                    })

                    describe("When the item has different values for wasMinPrice and wasMaxPrice", () => {
                        beforeEach(() => {
                            cy.get("[data-testid='product_summary_colourchip_jackson_82_202546']").trigger("mouseover")
                            cy.injectAxe()
                        })

                        it("should show a range for was price and  sale price", () => {
                            cy.get(`[data-testid='product_summary_was_price']`).should(
                                "contain.text",
                                "Was £1,000 - £1,200",
                            )

                            cy.get(`[data-testid='product_summary_sale_price']`).should(
                                "contain.text",
                                "Now £600 - £700",
                            )

                            cy.checkA11y(null, null, terminalLog, true)
                        })
                    })
                })

                describe("When the product is a suits", () => {
                    const suitIdNumber = "667975"
                    beforeEach(() => {
                        cy.viewport(1024, 500)

                        cy.visit(`/productsummarycontainer/suit/${suitIdNumber}`, {
                            headers: amidoHeaders,
                        })
                        cy.injectAxe()
                    })
                    it("should not show the favourite icon", () => {
                        cy.get("[data-testid='product-summary-favourites-button-container']").should("not.exist")
                    })

                    it("should not show review stars", () => {
                        cy.get("[data-testid='product_summary_star-rating--hidden']").should("not.exist")
                    })
                })
            })
        })
    })

    describe("When I visit a url for a personalised product", () => {
        TestFilter(["build"], () => {
            describe("When the product has a personalisedType flag (Personalised Gifts, Made to Measure)", () => {
                beforeEach(() => {
                    cy.viewport(1024, 500)

                    cy.visit(`/productsummarycontainer/${testIdPersonalisedProduct}`, {
                        headers: amidoHeaders,
                    })
                    cy.injectAxe()
                })
                it("should not show the favourite icon", () => {
                    cy.get("[data-testid='product-summary-favourites-button-container']").should("not.exist")
                })
            })
        })
    })
})

TestFilter(["build"], () => {
    context("Given I am browsing a product summary tile at below 1024", () => {
        before(() => {
            cy.viewport(1023, 500)
            cy.visit(`/productsummarycontainer/${acceptanceTestApiData.testProductItemNumber}`, {headers: amidoHeaders})
            cy.wait(333)

            cy.injectAxe()
        })

        describe("When I visit a url for a pid that exists", () => {
            it("should display the correct title", () => {
                cy.get(`[data-testid='product_summary_title']`).should(
                    "contain.text",
                    acceptanceTestApiData.testColourway1Colour,
                )
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display the colourchips", () => {
                cy.get("[data-testid='product_summary_colourchips']").should("not.be.visible")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display the view more colourchips button", () => {
                cy.get("[data-testid='product_summary_colourchips_view_more_button']").should("not.be.visible")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should not display the thumbs gallery", () => {
                cy.get("[data-testid='product_summary_thumbs_gallery']").should("be.visible")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When screen size is less than 1024 and user clicks on a colourchip", () => {
            it("should show the correct product colourway", () => {
                cy.get("[data-testid='product_summary_thumb_colourchip_920427']").trigger("click").wait(333)

                cy.get("[data-testid='product_summary_image_920427']")
                    .should("have.attr", "src")
                    .and(
                        "equal",
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/Search/224x336/920427.jpg",
                    )
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})

TestFilter(["build"], () => {
    context("When on a touch device and at screen size 1024 and above", () => {
        beforeEach(() => {
            cy.viewport(1025, 500)
            cy.visit(`/productsummarycontainer/${acceptanceTestApiData.testProductItemNumber}`, {
                headers: amidoHeaders,
                onBeforeLoad: win => {
                    if (win.ontouchstart) return
                    win.ontouchstart = () => {}
                },
            })
            cy.wait(333)

            cy.injectAxe()
        })

        describe("and When user selects a non-active colourchip", () => {
            it("should show the correct product colourway", () => {
                cy.get("[data-testid='product_summary_colourchip_920427']").trigger("click").wait(333)

                cy.get("[data-testid='product_summary_image_920427']")
                    .should("have.attr", "src")
                    .and(
                        "equal",
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/Search/224x336/920427.jpg",
                    )

                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("and When user hovers a non-active colourchip", () => {
            it("should show the correct product colourway", () => {
                cy.get("[data-testid='product_summary_colourchip_940736']").trigger("mouseover").wait(333)

                cy.get("[data-testid='product_summary_image_940736']")
                    .should("have.attr", "src")
                    .and(
                        "equal",
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/Search/224x336/940736.jpg",
                    )

                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("and When user selects an active colourchip", () => {
            it("should navigate away to product page", () => {
                cy.get("[data-testid='product_summary_colourchip_1111111']").click().wait(333)

                cy.url().should("include", "#111111")
                // cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })

    describe("When a single colourchip is interacted with", () => {
        beforeEach(() => {
            cy.viewport(1024, 1000)
            cy.visit(`/productsummarycontainer/${acceptanceTestApiData.testProductItemNumber}`, {
                headers: amidoHeaders,
            })
            cy.intercept("https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/Search/224x336").as(
                "getCdnImage",
            )
            cy.wait(333)

            cy.injectAxe()
        })

        it("should load the remaining ones", () => {
            cy.get("[data-testid='product_summary_colourchip_1111111']").trigger("mouseover").wait(333)
            cy.get("@getCdnImage.all").should("have.length.greaterThan", 0)
            cy.checkA11y(null, null, terminalLog, true)
        })

        describe("When view more is clicked", () => {
            it("should load all the images", () => {
                cy.get("[data-testid='product_summary_colourchips_view_more_button']").click().wait(333)

                cy.get("@getCdnImage.all").should("have.length.greaterThan", 0)
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})

TestFilter(["build"], () => {
    context("Given and item colourway has a sale price", () => {
        beforeEach(() => {
            cy.viewport(1024, 500)
            cy.visit(`/productsummarycontainer/${acceptanceTestApiData.testProductItemNumber}`, {
                headers: amidoHeaders,
            })

            cy.injectAxe()
        })
        describe("When selecting the colourway", () => {
            beforeEach(() => {
                cy.get("[data-testid='product_summary_colourchip_940736']").trigger("mouseover")
                cy.injectAxe()
            })

            it("should display the colourway sale sash image", () => {
                cy.get("[data-testid='product_summary_sale_sash']")
                    .should("exist")
                    .should("have.attr", "src")
                    .and("equal", "/static-content/images/plp/sale/FLASH_LEFT_EN.png")
                cy.checkA11y(null, null, terminalLog, true)
            })

            it("should display the star ratings", () => {
                cy.get("[data-testid='product_summary_star-rating']")
                    .should("be.visible")
                    .should("have.attr", "href")
                    .and("equal", "http://localhost:3333/g7190s5/962950#962950")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When the item has the same value for wasMinPrice and wasMaxPrice", () => {
            beforeEach(() => {
                cy.get("[data-testid='product_summary_colourchip_940736']").trigger("mouseover")
                cy.injectAxe()
            })

            it("should show a single was price and sale price", () => {
                cy.get(`[data-testid='product_summary_was_price']`).should("contain.text", "Was £10")

                cy.get(`[data-testid='product_summary_sale_price']`).should("contain.text", "Now £5")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })

        describe("When the item has different values for wasMinPrice and wasMaxPrice", () => {
            beforeEach(() => {
                cy.get("[data-testid='product_summary_colourchip_503290']").trigger("mouseover")
                cy.injectAxe()
            })

            it("should show a range for was price and  sale price", () => {
                cy.get(`[data-testid='product_summary_was_price']`).should("contain.text", "Was £10 - £12")

                cy.get(`[data-testid='product_summary_sale_price']`).should("contain.text", "Now £1 - £2")

                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    context("Given and item colourway has a made to measure price", () => {
        beforeEach(() => {
            cy.viewport(1024, 500)
            cy.visit(`/productsummarycontainer/${madeToMeasureSummaryApi.itemNumber}`, {
                headers: amidoHeaders,
            })

            cy.injectAxe()
        })
        describe("when the item has a made to measure price", () => {
            beforeEach(() => {
                cy.injectAxe()
            })

            it("should display the 'From' item price", () => {
                cy.get("[data-testid=product_summary_from_price]").should("exist")

                cy.get("[data-testid=product_summary_from_price]").should("contain.text", "From £55")
                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})
TestFilter(["build"], () => {
    context("Given an item is in a real that doesn't have enableBrandsDisplay enabled", () => {
        beforeEach(() => {
            cy.viewport(1024, 1500)
            cy.visit(`/productsummarycontainer/jackson_82_262919`, {
                headers: amidoHeaders,
            })

            cy.injectAxe()
        })
        describe("brand name is not displayed", () => {
            beforeEach(() => {
                cy.injectAxe()
            })

            it("should display the 'From' item price", () => {
                cy.get("[data-testid=product_summary_tile_jackson_82_262919_brand_name]").should("not.exist")

                cy.checkA11y(null, null, terminalLog, true)
            })
        })
    })
})

