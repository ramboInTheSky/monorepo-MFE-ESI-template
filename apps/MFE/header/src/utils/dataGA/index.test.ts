import {buildGaTags} from "."
import {HEADER_NAV_BAR_QUICK_LINKS, HEADER_NAV_BAR_HELP, HEADER_NAV_BAR_STORE_LOCATOR} from "../../config/constants"

describe("Utils: buildGaTags - ", () => {
    it("should return Ga tags for help", () => {
        const response = buildGaTags(" help ")
        expect(response.dataGaV1).toEqual(HEADER_NAV_BAR_QUICK_LINKS)
        expect(response.dataGaV2).toEqual(HEADER_NAV_BAR_HELP)
    })
    it("should return Ga tags for store locator", () => {
        const response = buildGaTags(" store locator ")
        expect(response.dataGaV1).toEqual(HEADER_NAV_BAR_QUICK_LINKS)
        expect(response.dataGaV2).toEqual(HEADER_NAV_BAR_STORE_LOCATOR)
    })
    it("should return falsy Ga tags with Quickshop", () => {
        const response = buildGaTags("Quickshop")
        expect(response.dataGaV1).toBeFalsy()
        expect(response.dataGaV2).toBeFalsy()
    })
    it("should return falsy Ga tags with empty string", () => {
        const response = buildGaTags("")
        expect(response.dataGaV1).toBeFalsy()
        expect(response.dataGaV2).toBeFalsy()
    })
})
