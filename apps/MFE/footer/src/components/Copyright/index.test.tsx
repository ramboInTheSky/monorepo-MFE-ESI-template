import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import mockStore, {mockText} from "../../../__mocks__/mockStore"
import apiFooterData from "../../../__mocks__/apiFooterData"
import {mockDateConstructor} from "../../../__mocks__/setDate"
import {SupportedRegionTypes} from "../../models/regions"
import {Copyright} from "."

const copyrightData = apiFooterData.regions.find(region => region.type === SupportedRegionTypes.Copyright) as any

const mockDeviceSwitcherFn = jest.fn()
const props = {
    region: copyrightData,
    siteUrl: "http://amido.com",
    deviceSwitcherFn: mockDeviceSwitcherFn,
    text: mockText,
}

describe("Components - Copyright: ", () => {
    // origin document and window
    const originalDocumentCookie = document.cookie
    const {location} = window
    const mockLocationReload = jest.fn()

    beforeEach(() => {
        // set up mock for document cookie, date and window location reload
        document.cookie = "AmidoDeviceType=Desktop"
        document.cookie = "ExampleOne=1"
        mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))

        delete window.location
        window.location = {href: "http://amido.com", reload: mockLocationReload} as any
    })

    afterEach(() => {
        // reset date, document, window location reload back to original state
        mockDateConstructor(new Date())
        document.cookie = originalDocumentCookie
        // eslint-disable-next-line @typescript-eslint/unbound-method
        window.location = location
    })

    describe("Driven from JSON data", () => {
        it("should show copyright text element", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Copyright {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Unhandled Copyright element type", () => {
        it("should match the snapshot template when element type is OtherCopyrightType", () => {
            const customiseData = {
                ...props,
                type: "Copyright",
                title: "",
                accessibilityTitle: "",
                subRegions: [
                    {
                        title: "",
                        accessibilityTitle: "",
                        elements: [
                            {
                                type: "OtherCopyrightType",
                                url: "",
                                openInNewWindow: false,
                                name: "OtherCopyrightType",
                                icon: "",
                                text: "Some text",
                                accessibilityText: "Some text",
                                tooltip: "Some text",
                                accessibilityTooltip: "Some text",
                                description: "Some text",
                                accessibilityDescription: "Some text",
                            },
                        ],
                    },
                ],
            }
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Copyright {...customiseData} />
                    </SCThemeProvider>
                </Provider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("default copyright", () => {
        it("should show copyright text with 2019 when the date is mocked", () => {
            const newProps = {
                siteUrl: "http://amido.com",
                deviceSwitcherFn: jest.fn(),
                text: mockText,
            }
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Copyright {...newProps} />
                    </SCThemeProvider>
                </Provider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When deviceSwitcherFn is triggered", () => {
        it("should call the url to change to mobile version", () => {
            const {getByTestId} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Copyright {...props} />
                    </SCThemeProvider>
                </Provider>,
            )

            const mobileToggleTestId = "footer-copyright-switcher-mobiletoggle"

            expect(getByTestId(mobileToggleTestId)).toBeInTheDocument()
            expect(getByTestId(mobileToggleTestId)).toHaveTextContent("View Mobile Site")

            fireEvent.click(getByTestId(mobileToggleTestId))

            expect(mockDeviceSwitcherFn).toHaveBeenCalled()
            expect(mockDeviceSwitcherFn).toHaveBeenCalledWith(
                expect.any(Object),
                "http://amido.com/changedevice/mobile",
            )
        })

        it("should call the url to change to desktop version", () => {
            // set cookie to Mobile
            document.cookie = "AmidoDeviceType=Mobile"
            const {getByTestId} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Copyright {...props} />
                    </SCThemeProvider>
                </Provider>,
            )

            const mobileToggleTestId = "footer-copyright-switcher-desktoptoggle"

            expect(getByTestId(mobileToggleTestId)).toBeInTheDocument()
            expect(getByTestId(mobileToggleTestId)).toHaveTextContent("View Desktop Site")

            fireEvent.click(getByTestId(mobileToggleTestId))

            expect(mockDeviceSwitcherFn).toHaveBeenCalled()
            expect(mockDeviceSwitcherFn).toHaveBeenCalledWith(
                expect.any(Object),
                "http://amido.com/changedevice/desktop",
            )
        })
    })

    describe("When deviceSwitcherFn is triggered and the url is on a subdomain", () => {
        beforeEach(() => {
            delete window.location
            window.location = {href: "http://account.amido.com", reload: mockLocationReload} as any
        })

        it("should hide the device switchers", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Copyright {...props} />
                    </SCThemeProvider>
                </Provider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
