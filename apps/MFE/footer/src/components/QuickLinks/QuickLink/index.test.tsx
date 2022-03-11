import React from "react"
import {render} from "@testing-library/react"
import logger from "@monorepo/core-logger"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import {SupportedRegionTypes} from "../../../models/regions"
import apiFooterData from "../../../../__mocks__/apiFooterData"

import {QuickLink} from "."

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const quickLinksData = apiFooterData.regions.find(region => region.type === SupportedRegionTypes.QuickLinks)

describe("Components - QuickLink: ", () => {
    it("should match the snapshot template", () => {
        const props = {
            data: quickLinksData?.subRegions[0].elements[0],
            siteUrl: "http://amido.com",
            variant: "default",
            realm: "amido",
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <QuickLink {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it("should output an error when siteurl is undefined", () => {
        const props = {
            data: quickLinksData?.subRegions[0].elements[0],
            siteUrl: "",
            variant: "default",
            realm: "amido",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <QuickLink {...props} />
            </SCThemeProvider>,
        )

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.error).toHaveBeenCalled()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.error).toHaveBeenCalledWith("Quicklinks/Quicklink - site url is not defined")
    })
})
