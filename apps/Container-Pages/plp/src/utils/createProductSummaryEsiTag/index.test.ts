import env from "../../config/env"
import createProductSummaryEsiTag from "."

const {REACT_APP_PROD_SUMM_BASEURL} = env

describe(`Given a ${createProductSummaryEsiTag.name}`, () => {
    describe("When supplied with product params", () => {
        it("should return an ESI tag", () => {
            const tag = createProductSummaryEsiTag("1", true, "www.test.com", true, undefined)
            expect(tag).toBe(
                `<esi:include src="${REACT_APP_PROD_SUMM_BASEURL}/product-summary/1?show-new-in=true" onerror="continue" dca="none" />`,
            )
        })

        it("When not using the devEsi solution it should return an ESI tag", () => {
            const tag = createProductSummaryEsiTag("1", true, "www.test.com", false, undefined)
            expect(tag).toBe(
                `<esi:include src="www.test.com/product-summary/1?show-new-in=true" onerror="continue" dca="none" />`,
            )
        })

        it("When provided with an type it should append it into the URL", () => {
            const tag = createProductSummaryEsiTag("1", true, "www.test.com", false, "suit")
            expect(tag).toBe(
                `<esi:include src="www.test.com/product-summary/suit/1?show-new-in=true" onerror="continue" dca="none" />`,
            )
        })
    })
})
