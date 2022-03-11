import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import apiFooterData from "../../../__mocks__/apiFooterData"
import {SupportedRegionTypes} from "../../models/regions"
import {SocialMedia} from "."

const socialMediaData = apiFooterData.regions.find(region => region.type === SupportedRegionTypes.SocialMedia)

const props = {
    region: socialMediaData,
    variant: "default",
    realm: "amido",
}

describe("Components - SocialMedia: ", () => {
    it("should match the snapshot template", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SocialMedia {...(props as any)} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    describe(" - conditional elements", () => {
        it("should match the snapshot template when url is null in the elements", () => {
            const customiseData = {
                region: {
                    ...socialMediaData,
                    subRegions: [
                        {
                            title: null,
                            accessibilityTitle: null,
                            elements: [
                                {
                                    type: "Link",
                                    url: null,
                                    openInNewWindow: true,
                                    name: "Facebook",
                                    icon: "nx-icon facebook-black",
                                    text: null,
                                    accessibilityText: "Amido Official Facebook page (opens in a new window)",
                                    tooltip: null,
                                    accessibilityTooltip: null,
                                    description: null,
                                    accessibilityDescription: null,
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SocialMedia {...(customiseData as any)} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot template when accessibilityText is null in the elements", () => {
            const customiseData = {
                region: {
                    ...socialMediaData,
                    subRegions: [
                        {
                            title: null,
                            accessibilityTitle: null,
                            elements: [
                                {
                                    type: "Link",
                                    url: "https://www.facebook.com/amidoofficial",
                                    openInNewWindow: true,
                                    name: "Facebook",
                                    icon: "nx-icon facebook-black",
                                    text: null,
                                    accessibilityText: null,
                                    tooltip: null,
                                    accessibilityTooltip: null,
                                    description: null,
                                    accessibilityDescription: null,
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SocialMedia {...(customiseData as any)} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot template when url and accessibilityText is null in the elements", () => {
            const customiseData = {
                region: {
                    ...socialMediaData,
                    subRegions: [
                        {
                            title: null,
                            accessibilityTitle: null,
                            elements: [
                                {
                                    type: "Link",
                                    url: null,
                                    openInNewWindow: true,
                                    name: "Facebook",
                                    icon: "nx-icon facebook-black",
                                    text: null,
                                    accessibilityText: "",
                                    tooltip: null,
                                    accessibilityTooltip: null,
                                    description: null,
                                    accessibilityDescription: null,
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SocialMedia {...(customiseData as any)} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
