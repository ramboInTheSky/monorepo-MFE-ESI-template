import {mockState} from "../../../__mocks__/mockStore"
import {SupportedRegionTypes} from "../../models/regions"
import {mapStateToProps} from "./connect"
import {formatCdnPath} from "../../utils/getCdnUrl"

describe("Components/QuickLinks - Given connect - mapStateToProps()", () => {
    it("should return quickLinks from the mockState", () => {
        const quickLinkObject = mockState.data?.regions.find(region => region.type === SupportedRegionTypes.QuickLinks)
        const {siteUrl} = mockState.request
        expect(mapStateToProps(mockState)).toEqual({
            quickLinks: quickLinkObject?.elements
                .filter(link => link.type === "link")
                .map(({text, url, accessibilityText, icon}) => {
                    const iconUrl = icon ? formatCdnPath(icon) : null
                    return {text, url: `${siteUrl}${url}`, accessibilityText: accessibilityText ?? "", icon: iconUrl}
                }),
        })
    })

    it("should return correct object when icon and accessibilityText null", () => {
        const quickLinkObject = mockState.data?.regions.find(region => region.type === SupportedRegionTypes.QuickLinks)
        const {siteUrl} = mockState.request
        quickLinkObject!.elements[1].icon = null
        quickLinkObject!.elements[1].accessibilityText = null
        expect(mapStateToProps(mockState)).toEqual({
            quickLinks: quickLinkObject?.elements
                .filter(link => link.type === "link")
                .map(({text, url, accessibilityText, icon}) => {
                    const iconUrl = icon ? formatCdnPath(icon) : null
                    return {text, url: `${siteUrl}${url}`, accessibilityText: accessibilityText ?? "", icon: iconUrl}
                }),
        })
    })
})
