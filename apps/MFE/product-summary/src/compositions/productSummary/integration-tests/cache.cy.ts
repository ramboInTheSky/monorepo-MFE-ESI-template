/// <reference types="cypress" />
import acceptanceTestApiData from "../../../../__mocks__/acceptanceTestsApi"
import TestFilter, {TestDataSwitcher} from "../../../../cypress/modules/filter"
import terminalLogFn from "../../../utils/terminalLogFn"

const amidoHeaders = {
    "x-monorepo-language": "en",
    "x-monorepo-realm": "amido",
    "x-monorepo-territory": "gb",
}

context("Given I am browsing a product summary tile at 1024", () => {
    const testId = TestDataSwitcher(["postdeploy"], "TEST-PRODUCT-1", acceptanceTestApiData.testProductItemNumber)
    TestFilter(["build"], () => {
        describe("When I visit a url for a pid that exists", () => {
            beforeEach(() => {
                cy.viewport(1024, 500)

                cy.request({url: `http://localhost:3001/product-summary/${testId}`, headers: amidoHeaders}).as(
                    "request",
                )
            })

            it("should add cache tag response headers", () => {
                cy.get("@request").should((response: any) => {
                    expect(response).to.have.property("headers")
                    expect(response.headers["edge-cache-tag"]).to.equal(
                        "dev-product-TEST_20_COLOURWAYS, dev-price-DE, dev-reviews-TEST_20_COLOURWAYS, local-productsummaryui",
                    )
                    expect(response.headers["last-modified"]).to.equal("test-last-modified")
                    expect(response.headers["cache-control"]).to.equal("public, no-transform, max-age=3600")
                })
            })
        })
    })
})
