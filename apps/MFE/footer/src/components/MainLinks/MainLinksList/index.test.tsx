import React from "react"
import {render} from "@testing-library/react"
import logger from "@monorepo/core-logger"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import apiFooterData from "../../../../__mocks__/apiFooterData"

import {SupportedRegionTypes} from "../../../models/regions"
import {MainLinksList} from "."

const mainLinksData = apiFooterData.regions.find(region => region.type === SupportedRegionTypes.MainLinks)

const props = {
    elements: mainLinksData?.subRegions[0].elements,
    subRegionTitle: "Help",
    siteUrl: "http://superman.com",
    isAmidoInternational: false,
}

jest.mock("../CountrySelector", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>CountrySelector component</div>
    },
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("Components - MainLinks/MainLinksList: ", () => {
    // origin document and window
    const originalDocumentCookie = document.cookie
    beforeEach(() => {
        // set up mock for document cookie, date and window location reload
        document.cookie = "AmidoDeviceType=Desktop"
    })
    afterEach(() => {
        // reset date, document, window location reload back to original state
        document.cookie = originalDocumentCookie
    })

    it("should match the snapshot template", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MainLinksList {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot template when the title is Shop By Country ", () => {
        const customiseData = {
            ...props,
            subRegionTitle: "Shop By Country",
            elements: [
                {
                    type: "CountryLink",
                    url: "",
                    openInNewWindow: false,
                    name: "CountryLink",
                    icon: null,
                    text: "Saudi Arabia",
                    accessibilityText: "Saudi Arabia",
                    tooltip: "",
                    accessibilityTooltip: "",
                    description: "",
                    accessibilityDescription: "",
                },
                {
                    type: "CountryLanguage",
                    url: "//www.amido.com/sa/ar",
                    openInNewWindow: false,
                    name: "CountryLanguage",
                    icon: null,
                    text: "AR",
                    accessibilityText: "Change to Saudi Arabia in Arabic",
                    tooltip: "",
                    accessibilityTooltip: "",
                    description: "",
                    accessibilityDescription: "",
                },
                {
                    type: "CountryLanguage",
                    url: "//www.amido.com/sa/en",
                    openInNewWindow: false,
                    name: "CountryLanguage",
                    icon: null,
                    text: "EN",
                    accessibilityText: "Change to Saudi Arabia in English",
                    tooltip: "",
                    accessibilityTooltip: "",
                    description: "",
                    accessibilityDescription: "",
                },
                {
                    type: "CountryLink",
                    url: "",
                    openInNewWindow: false,
                    name: "CountryLink",
                    icon: null,
                    text: "United Arab Emirates",
                    accessibilityText: "United Arab Emirates",
                    tooltip: "",
                    accessibilityTooltip: "",
                    description: "",
                    accessibilityDescription: "",
                },
                {
                    type: "CountryLanguage",
                    url: "//www.amido.com/ae/ar",
                    openInNewWindow: false,
                    name: "CountryLanguage",
                    icon: null,
                    text: "AR",
                    accessibilityText: "Change to United Arab Emirates in Arabic",
                    tooltip: "",
                    accessibilityTooltip: "",
                    description: "",
                    accessibilityDescription: "",
                },
            ],
        }
        const {asFragment, queryByTestId} = render(
            <SCThemeProvider theme={mockTheme}>
                <MainLinksList {...customiseData} />
            </SCThemeProvider>,
        )

        expect(queryByTestId("footer-main-links-title-shop-by-country-list")).toBeTruthy()
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot template when the title is Privacy & Legal ", () => {
        const customiseData = {
            ...props,
            subRegionTitle: "Privacy & Legal",
            elements: [
                {
                    accessibilityDescription: "",
                    accessibilityText: "Terms & Conditions",
                    accessibilityTooltip: "Terms & Conditions",
                    description: "",
                    icon: null,
                    name: "Terms&Conditions",
                    openInNewWindow: false,
                    text: "Terms & Conditions",
                    tooltip: "Terms & Conditions",
                    type: "Link",
                    url: "/terms",
                },
                {
                    accessibilityDescription: "",
                    accessibilityText: "Manage Cookies",
                    accessibilityTooltip: "Manage Cookies",
                    description: "",
                    icon: null,
                    name: "Manage Cookies",
                    openInNewWindow: false,
                    text: "Manage Cookies",
                    tooltip: "test",
                    type: "Link",
                    className: "test",
                    url: "#",
                },
            ],
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MainLinksList {...customiseData} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    describe("When there are missing data in the object: ", () => {
        it("should match the snapshot template when url is null in the elements", () => {
            const customiseData = {
                ...props,
                elements: [
                    {
                        type: "Link",
                        url: "",
                        openInNewWindow: true,
                        name: "Help",
                        icon: null,
                        text: "View Help Topics",
                        accessibilityText: "View Help Topics",
                        tooltip: "View Help Topics",
                        accessibilityTooltip: "View Help Topics",
                        description: null,
                        accessibilityDescription: null,
                    },
                ],
            }
            const {asFragment, queryByTestId} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MainLinksList {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
            expect(queryByTestId("footer-main-links-title-help-list")).toBeTruthy()
            expect(queryByTestId("footer-main-links-view-help-topics")).toBeFalsy()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith(
                `MainLinks Footer: ${customiseData.elements} object does not contain either text, accessibilityText or url`,
            )
        })
        it("should match the snapshot template when text is null in the elements", () => {
            const customiseData = {
                ...props,
                elements: [
                    {
                        type: "Link",
                        url: "https://www.amido.com/help",
                        openInNewWindow: true,
                        name: "Help",
                        icon: null,
                        text: "",
                        accessibilityText: "View Help Topics",
                        tooltip: "View Help Topics",
                        accessibilityTooltip: "View Help Topics",
                        description: null,
                        accessibilityDescription: null,
                    },
                ],
            }
            const {asFragment, queryByTestId} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MainLinksList {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
            expect(queryByTestId("footer-main-links-title-help-list")).toBeTruthy()
            expect(queryByTestId("footer-main-links-view-help-topics")).toBeFalsy()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith(
                `MainLinks Footer: ${customiseData.elements} object does not contain either text, accessibilityText or url`,
            )
        })
        it("should match the snapshot template when accessibilityText is null in the elements", () => {
            const customiseData = {
                ...props,
                elements: [
                    {
                        type: "Link",
                        url: "https://www.amido.com/help",
                        openInNewWindow: true,
                        name: "Help",
                        icon: null,
                        text: "View Help Topics",
                        accessibilityText: "",
                        tooltip: "View Help Topics",
                        accessibilityTooltip: "View Help Topics",
                        description: null,
                        accessibilityDescription: null,
                    },
                ],
            }
            const {asFragment, queryByTestId} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MainLinksList {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
            expect(queryByTestId("footer-main-links-title-help-list")).toBeTruthy()
            expect(queryByTestId("footer-main-links-view-help-topics")).toBeFalsy()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith(
                `MainLinks Footer: ${customiseData.elements} object does not contain either text, accessibilityText or url`,
            )
        })
        it("should match the snapshot template when url and accessibilityText is null in the elements", () => {
            const customiseData = {
                ...props,
                elements: [
                    {
                        type: "Link",
                        url: "",
                        openInNewWindow: true,
                        name: "Help",
                        icon: null,
                        text: "View Help Topics",
                        accessibilityText: "",
                        tooltip: "View Help Topics",
                        accessibilityTooltip: "View Help Topics",
                        description: null,
                        accessibilityDescription: null,
                    },
                ],
            }
            const {asFragment, queryByTestId} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MainLinksList {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
            expect(queryByTestId("footer-main-links-title-help-list")).toBeTruthy()
            expect(queryByTestId("footer-main-links-view-help-topics")).toBeFalsy()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith(
                `MainLinks Footer: ${customiseData.elements} object does not contain either text, accessibilityText or url`,
            )
        })
        it("should only return View Help Topics when AmidoDeviceType=Mobile and its Amido International", () => {
            document.cookie = "AmidoDeviceType=Mobile"
            const customiseData = {
                ...props,
                isAmidoInternational: true,
                elements: [
                    {
                        type: "Link",
                        url: "/help",
                        openInNewWindow: true,
                        name: "Help",
                        icon: null,
                        text: "View Help Topics",
                        accessibilityText: "View Help Topics",
                        tooltip: "View Help Topics",
                        accessibilityTooltip: "View Help Topics",
                        description: null,
                        accessibilityDescription: null,
                    },
                    {
                        Type: "Link",
                        Url: "/sitemap",
                        OpenInNewWindow: false,
                        Name: "Sitemap",
                        Icon: null,
                        Text: "Sitemap",
                        AccessibilityText: "Sitemap",
                        Tooltip: "Sitemap",
                        AccessibilityTooltip: "Sitemap",
                        Description: "",
                        AccessibilityDescription: "",
                    },
                ],
            }
            const {asFragment, queryByTestId} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MainLinksList {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
            expect(queryByTestId("footer-main-links-title-help-list")).toBeTruthy()
            expect(queryByTestId("footer-main-links-view-help-topics")).toBeTruthy()
            expect(queryByTestId("footer-main-links-sitemap")).toBeFalsy()
        })
    })
})
