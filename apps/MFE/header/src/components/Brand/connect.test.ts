import {SupportedRegionTypes} from "../../models/regions"
import {mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"
import {formatCdnPathWithVariant} from "../../utils/getCdnUrl"

jest.mock("../../utils/getCdnUrl", () => ({
    formatCdnPathWithVariant: jest.fn(() => "/static-content/icons/header/amido/default/amido-white-logo.svg"),
}))

describe("Components/Brand - Given connect - mapStateToProps()", () => {
    it("should return Brand from the mockState", () => {
        const Region = SupportedRegionTypes.Brand
        const brand = mockState.data?.regions.find(region => region.type === Region)
        const {accessibilityText, tooltip, url} = brand!.elements[0]
        const {siteUrl} = mockState.request

        const expected = {
            icon: "/static-content/icons/header/amido/default/amido-white-logo.svg",
            narrowModeIcon: "/static-content/icons/header/amido/default/amido-white-logo.svg",
            wideModeIcon: "/static-content/icons/header/amido/default/amido-white-logo.svg",
            accessibilityText,
            tooltip,
            url: `${siteUrl}${url}`,
        }
        const got = mapStateToProps(mockState)

        expect(formatCdnPathWithVariant).toBeCalledTimes(3)
        expect(formatCdnPathWithVariant).toHaveBeenCalledWith(
            "/icons/header/brand/amido/amido-white-logo.svg",
            undefined,
            "default",
        )
        expect(got).toEqual(expected)
    })
})
