import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import getwindow from "../../utils/window"
import {QuickLinks} from "."

jest.mock("../../utils/window")

const addEventListener = jest.fn()
const removeEventListener = jest.fn()
const mockedGetWindow = getwindow as jest.Mock<any>

const props = {
    region: {
        type: "QuickLinks",
        title: "",
        accessibilityTitle: "",
        subRegions: [
            {
                title: "",
                accessibilityTitle: "",
                elements: [
                    {
                        type: "MyAccountLoggedIn",
                        url: "https://www.amido.com/secure/accounts/transfer",
                        openInNewWindow: false,
                        name: "MyAccount",
                        icon: "/icons/account_circle",
                        text: "<username>",
                        accessibilityText: "My Account",
                        tooltip: "My Account",
                        accessibilityTooltip: "My Account",
                        description: "Sign-in to your account",
                        accessibilityDescription: "Sign-in to your account",
                    },
                    {
                        type: "MyAccountLoggedOut",
                        url: "https://www.amido.com/secure/accounts/transfer",
                        openInNewWindow: false,
                        name: "MyAccount",
                        icon: "/icons/account_circle",
                        text: "My Account",
                        accessibilityText: "My Account",
                        tooltip: "My Account",
                        accessibilityTooltip: "My Account",
                        description: "View your Amido account",
                        accessibilityDescription: "View your Amido account",
                    },
                    {
                        type: "Link",
                        url: "https://www.amido.com/quickshop",
                        openInNewWindow: false,
                        name: "Quickshop",
                        icon: "/icons/account_circle",
                        text: "Quickshop",
                        accessibilityText: "Quickshop",
                        tooltip: "Quickshop",
                        accessibilityTooltip: "Quickshop",
                        description: "Shop by product number",
                        accessibilityDescription: "Shop by product number",
                    },
                    {
                        type: "Link",
                        url: "https://www.amido.com/storelocator",
                        openInNewWindow: false,
                        name: "StoreLocator",
                        icon: "/icons/account_circle",
                        text: "Store Locator",
                        accessibilityText: "Store Locator",
                        tooltip: "Store Locator",
                        accessibilityTooltip: "Store Locator",
                        description: "For your nearest store",
                        accessibilityDescription: "For your nearest store",
                    },
                    {
                        type: "Link",
                        url: "https://www.amido.com/startachat",
                        openInNewWindow: false,
                        name: "StartAChat",
                        icon: "/icons/account_circle",
                        text: "Start A Chat",
                        accessibilityText: "Start A Chat",
                        tooltip: "Start A Chat",
                        accessibilityTooltip: "Start A Chat",
                        description: "For general enquiries",
                        accessibilityDescription: "For general enquiries",
                    },
                    {
                        type: "LanguageSelector",
                        url: "",
                        openInNewWindow: false,
                        name: "LanguageSelector",
                        icon: "/icons/account_circle",
                        text: "Select Language",
                        accessibilityText: "Select Language",
                        tooltip: "Select Language",
                        accessibilityTooltip: "Select Language",
                        description: "",
                        accessibilityDescription: "",
                    },
                ],
            },
            {
                title: "Logout",
                accessibilityTitle: "",
                elements: [
                    {
                        type: "Logout",
                        url: "https://www.amido.com/logout",
                        openInNewWindow: false,
                        name: "Logout",
                        icon: "/icons/account_circle",
                        text: "Not <username>?",
                        accessibilityText: "Not <username>?",
                        tooltip: "Logout",
                        accessibilityTooltip: "Logout",
                        description: "Logout of account",
                        accessibilityDescription: "Logout of account",
                    },
                    {
                        type: "LogoutButton",
                        url: "https://www.amido.com/logout",
                        openInNewWindow: false,
                        name: "LogoutButton",
                        icon: "/icons/account_circle",
                        text: "Sign Out",
                        accessibilityText: "Sign Out",
                        tooltip: "Logout",
                        accessibilityTooltip: "Logout",
                        description: "Logout of your account",
                        accessibilityDescription: "Logout of your account",
                    },
                ],
            },
        ],
    },
    showLangSelector: true,
    user: {accountFirstName: "jack", loggedIn: true},
    accountStatusChanged: jest.fn(),
}

jest.mock("./QuickLink", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({data: {text}}) => {
        return <div>QuickLink component {text}</div>
    },
}))

jest.mock("./MyAccountQuickLink", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>MyAccountQuickLink component</div>
    },
}))
jest.mock("./LogoutQuickLink", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>LogoutQuickLink component</div>
    },
}))
jest.mock("./LanguageSelectorQuickLink", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>LanguageSelectorQuickLink component</div>
    },
}))

describe("Components - QuickLinks: ", () => {
    beforeEach(() => {
        mockedGetWindow.mockImplementationOnce(() => {
            return {
                addEventListener,
                removeEventListener,
                AmidoBasket: {
                    Data: {
                        FirstName: "TEST NAME",
                    },
                },
                document: {readyState: "loading"},
            }
        })
    })
    describe("when the AmidoBasket FirstName is TEST NAME", () => {
        it("should match the snapshot template", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...props} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("when the showLangSelector is false", () => {
        it("should match the snapshot template", () => {
            const newProps = {
                ...props,
                showLangSelector: false,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...newProps} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("when the AmidoBasket FirstName is null", () => {
        beforeEach(() => {
            mockedGetWindow.mockImplementationOnce(() => {
                return {
                    addEventListener,
                    removeEventListener,
                    AmidoBasket: {
                        Data: {
                            FirstName: null,
                        },
                    },
                    document: {readyState: "loading"},
                }
            })
        })

        it("should match the snapshot template", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...props} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe(" - conditional elements", () => {
        it("should match the snapshot template when url is '' in the elements", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "Link",
                                    url: "",
                                    openInNewWindow: true,
                                    name: "Quickshop",
                                    icon: "/sprites/nxt-icns.svg#icon-outline-quickshop",
                                    text: "Quickshop",
                                    accessibilityText: "Quick shop",
                                    tooltip: "",
                                    accessibilityTooltip: "",
                                    description: "Shop by product number",
                                    accessibilityDescription: "Shop by product number",
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot template when the elements are valid", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "Link",
                                    url: "http://amido.com",
                                    openInNewWindow: true,
                                    name: "Quickshop",
                                    icon: "/sprites/nxt-icns.svg#icon-outline-quickshop",
                                    text: "Quickshop",
                                    accessibilityText: "Quick shop",
                                    tooltip: "",
                                    accessibilityTooltip: "",
                                    description: "Shop by product number",
                                    accessibilityDescription: "Shop by product number",
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot template when accessibilityText is '' in the elements", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "Link",
                                    url: "//www.amido.com/quickshop",
                                    openInNewWindow: true,
                                    name: "Quickshop",
                                    icon: "/sprites/nxt-icns.svg#icon-outline-quickshop",
                                    text: "Quickshop",
                                    accessibilityText: "",
                                    tooltip: "",
                                    accessibilityTooltip: "",
                                    description: "Shop by product number",
                                    accessibilityDescription: "Shop by product number",
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot template when the language selector element is valid", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "LanguageSelector",
                                    url: "",
                                    openInNewWindow: true,
                                    name: "Quickshop",
                                    icon: "https://amido-sandbox.azureedge.net/icons/footer/amido/quicklinks/languageselector.svg",
                                    text: "Language Selector",
                                    accessibilityText: "Select Language",
                                    tooltip: "",
                                    accessibilityTooltip: "",
                                    description: "",
                                    accessibilityDescription: "",
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot template when the my account element is valid", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "MyAccountLoggedIn",
                                    url: "https://www.amido.com/secure/accounts/transfer",
                                    openInNewWindow: false,
                                    name: "MyAccount",
                                    icon: "/icons/account_circle",
                                    text: "<username>",
                                    accessibilityText: "My Account",
                                    tooltip: "My Account",
                                    accessibilityTooltip: "My Account",
                                    description: "Sign-in to your account",
                                    accessibilityDescription: "Sign-in to your account",
                                },
                                {
                                    type: "MyAccountLoggedOut",
                                    url: "https://www.amido.com/secure/accounts/transfer",
                                    openInNewWindow: false,
                                    name: "MyAccount",
                                    icon: "/icons/account_circle",
                                    text: "My Account",
                                    accessibilityText: "My Account",
                                    tooltip: "My Account",
                                    accessibilityTooltip: "My Account",
                                    description: "View your Amido account",
                                    accessibilityDescription: "View your Amido account",
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        describe("When I see the quick links", () => {
            it("should set MuiGrid-grid-lg-5 for Language selection", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "Links",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "LanguageSelector",
                                        url: "",
                                        openInNewWindow: true,
                                        name: "Quickshop",
                                        icon: "https://amido-sandbox.azureedge.net/icons/footer/amido/quicklinks/languageselector.svg",
                                        text: "Language Selector",
                                        accessibilityText: "Select Language",
                                        tooltip: "",
                                        accessibilityTooltip: "",
                                        description: "",
                                        accessibilityDescription: "",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )
                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-languageselector-language-selector")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-languageselector-language-selector")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-5",
                )
            })

            it("should set MuiGrid-grid-lg-6 for Sign In and Language Selector", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "QuickLinks",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "MyAccount",
                                        url: "https://www.amido.com/secure/accounts/transfer",
                                        openInNewWindow: false,
                                        name: "MyAccount",
                                        icon: "/icons/account_circle",
                                        text: "username",
                                        accessibilityText: "My Account",
                                        tooltip: "My Account",
                                        accessibilityTooltip: "My Account",
                                        description: "Sign-in to your account",
                                        accessibilityDescription: "Sign-in to your account",
                                    },
                                    {
                                        type: "LanguageSelector",
                                        url: "",
                                        openInNewWindow: true,
                                        name: "Quickshop",
                                        icon: "https://amido-sandbox.azureedge.net/icons/footer/amido/quicklinks/languageselector.svg",
                                        text: "Language Selector",
                                        accessibilityText: "Select Language",
                                        tooltip: "",
                                        accessibilityTooltip: "",
                                        description: "",
                                        accessibilityDescription: "",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-myaccount-username")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-myaccount-username")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-6",
                )
            })

            it("should set MuiGrid-grid-lg-6 for Logged In", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "QuickLinks",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "MyAccount",
                                        url: "https://www.amido.com/secure/accounts/transfer",
                                        openInNewWindow: false,
                                        name: "MyAccount",
                                        icon: "/icons/account_circle",

                                        text: "My Account",
                                        accessibilityText: "My Account",
                                        tooltip: "My Account",
                                        accessibilityTooltip: "My Account",
                                        description: "View your Amido account",
                                        accessibilityDescription: "View your Amido account",
                                    },
                                    {
                                        type: "LanguageSelector",
                                        url: "",
                                        openInNewWindow: true,
                                        name: "Quickshop",
                                        icon: "https://amido-sandbox.azureedge.net/icons/footer/amido/quicklinks/languageselector.svg",
                                        text: "Language Selector",
                                        accessibilityText: "Select Language",
                                        tooltip: "",
                                        accessibilityTooltip: "",
                                        description: "",
                                        accessibilityDescription: "",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-myaccount-my-account")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-myaccount-my-account")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-6",
                )
            })

            it("should set MuiGrid-grid-lg-6 for only Sign In", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "QuickLinks",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "MyAccount",
                                        url: "https://www.amido.com/secure/accounts/transfer",
                                        openInNewWindow: false,
                                        name: "MyAccount",
                                        icon: "/icons/account_circle",
                                        text: "username",
                                        accessibilityText: "My Account",
                                        tooltip: "My Account",
                                        accessibilityTooltip: "My Account",
                                        description: "Sign-in to your account",
                                        accessibilityDescription: "Sign-in to your account",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-myaccount-username")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-myaccount-username")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-6",
                )
            })

            it("should set MuiGrid-grid-lg-6 for only Logged In", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "QuickLinks",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "MyAccount",
                                        url: "https://www.amido.com/secure/accounts/transfer",
                                        openInNewWindow: false,
                                        name: "MyAccount",
                                        icon: "/icons/account_circle",

                                        text: "My Account",
                                        accessibilityText: "My Account",
                                        tooltip: "My Account",
                                        accessibilityTooltip: "My Account",
                                        description: "View your Amido account",
                                        accessibilityDescription: "View your Amido account",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-myaccount-my-account")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-myaccount-my-account")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-6",
                )
            })

            it("should set MuiGrid-grid-lg-3 for Sign In", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "QuickLinks",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "MyAccount",
                                        url: "https://www.amido.com/secure/accounts/transfer",
                                        openInNewWindow: false,
                                        name: "MyAccount",
                                        icon: "/icons/account_circle",
                                        text: "username",
                                        accessibilityText: "My Account",
                                        tooltip: "My Account",
                                        accessibilityTooltip: "My Account",
                                        description: "Sign-in to your account",
                                        accessibilityDescription: "Sign-in to your account",
                                    },
                                    {
                                        type: "Link",
                                        url: "https://www.amido.com/storelocator",
                                        openInNewWindow: false,
                                        name: "StoreLocator",
                                        icon: "/icons/account_circle",
                                        text: "Store Locator",
                                        accessibilityText: "Store Locator",
                                        tooltip: "Store Locator",
                                        accessibilityTooltip: "Store Locator",
                                        description: "For your nearest store",
                                        accessibilityDescription: "For your nearest store",
                                    },
                                    {
                                        type: "LanguageSelector",
                                        url: "",
                                        openInNewWindow: true,
                                        name: "Quickshop",
                                        icon: "https://amido-sandbox.azureedge.net/icons/footer/amido/quicklinks/languageselector.svg",
                                        text: "Language Selector",
                                        accessibilityText: "Select Language",
                                        tooltip: "",
                                        accessibilityTooltip: "",
                                        description: "",
                                        accessibilityDescription: "",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-myaccount-username")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-myaccount-username")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-3",
                )
            })

            it("should set MuiGrid-grid-lg-3 for Logged In", () => {
                const customiseData = {
                    ...props,
                    region: {
                        type: "QuickLinks",
                        title: "",
                        accessibilityTitle: "",
                        subRegions: [
                            {
                                title: "",
                                accessibilityTitle: "",
                                elements: [
                                    {
                                        type: "MyAccount",
                                        url: "https://www.amido.com/secure/accounts/transfer",
                                        openInNewWindow: false,
                                        name: "MyAccount",
                                        icon: "/icons/account_circle",

                                        text: "My Account",
                                        accessibilityText: "My Account",
                                        tooltip: "My Account",
                                        accessibilityTooltip: "My Account",
                                        description: "View your Amido account",
                                        accessibilityDescription: "View your Amido account",
                                    },
                                    {
                                        type: "Link",
                                        url: "https://www.amido.com/storelocator",
                                        openInNewWindow: false,
                                        name: "StoreLocator",
                                        icon: "/icons/account_circle",
                                        text: "Store Locator",
                                        accessibilityText: "Store Locator",
                                        tooltip: "Store Locator",
                                        accessibilityTooltip: "Store Locator",
                                        description: "For your nearest store",
                                        accessibilityDescription: "For your nearest store",
                                    },
                                    {
                                        type: "LanguageSelector",
                                        url: "",
                                        openInNewWindow: true,
                                        name: "Quickshop",
                                        icon: "https://amido-sandbox.azureedge.net/icons/footer/amido/quicklinks/languageselector.svg",
                                        text: "Language Selector",
                                        accessibilityText: "Select Language",
                                        tooltip: "",
                                        accessibilityTooltip: "",
                                        description: "",
                                        accessibilityDescription: "",
                                    },
                                ],
                            },
                        ],
                    },
                }

                const {asFragment, getByTestId} = render(
                    <SCThemeProvider theme={mockTheme}>
                        <QuickLinks {...customiseData} />
                    </SCThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
                expect(getByTestId("footer-quicklinks-myaccount-my-account")).toBeTruthy()
                expect(getByTestId("footer-quicklinks-myaccount-my-account")).toHaveClass(
                    "MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-3",
                )
            })
        })

        it("should match the snapshot template when text is '' in the elements", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "Link",
                                    url: "//www.amido.com/quickshop",
                                    openInNewWindow: true,
                                    name: "Quickshop",
                                    icon: "/sprites/nxt-icns.svg#icon-outline-quickshop",
                                    text: "",
                                    accessibilityText: "Quick shop",
                                    tooltip: "",
                                    accessibilityTooltip: "",
                                    description: "Shop by product number",
                                    accessibilityDescription: "Shop by product number",
                                },
                            ],
                        },
                    ],
                },
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot template when url and accessibilityText is '' in the elements", () => {
            const customiseData = {
                ...props,
                region: {
                    type: "QuickLinks",
                    title: "",
                    accessibilityTitle: "",
                    subRegions: [
                        {
                            title: "",
                            accessibilityTitle: "",
                            elements: [
                                {
                                    type: "Link",
                                    url: "",
                                    openInNewWindow: true,
                                    name: "Quickshop",
                                    icon: "/sprites/nxt-icns.svg#icon-outline-quickshop",
                                    text: "Quickshop",
                                    accessibilityText: "",
                                    tooltip: "",
                                    accessibilityTooltip: "",
                                    description: "Shop by product number",
                                    accessibilityDescription: "Shop by product number",
                                },
                            ],
                        },
                    ],
                },
                user: {accountFirstName: "jack", loggedIn: true},
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinks {...customiseData} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
