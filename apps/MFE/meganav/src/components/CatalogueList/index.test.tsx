import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {CatalogueList, SmallScreen, BigScreen, CatalogueListTitle, CatalogueListContent} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"

jest.mock("../CatalogueItem", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({title, target, department, tab, catalogueListTitle}) => (
        <li>
            <a
                href={target}
                title={title}
                data-ga-v1={department}
                data-ga-v2={tab || catalogueListTitle}
                data-ga-v3={title}
            >
                {title}
            </a>
        </li>
    ),
}))

describe("Catalogue List", () => {
    describe("CatalogueList: ", () => {
        let props
        beforeEach(() => {
            props = {
                title: "sample",
                opened: false,
                icon: {width: 24, height: 25, url: "/cool-image-path"},
                setOpened: jest.fn(),
                items: [
                    {target: "/dress", title: "dress"},
                    {target: "/shirt", title: "shirt"},
                ],
                department: "sports",
                tab: "running",
                text: {chevronIconAltText: mockText.chevronIconAltText},
            }
        })
        it("Should match the snapshot with Icon Enabled", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CatalogueList {...props} isImagePlaceholderEnabled />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("Should match the snapshot with Icon disabled", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CatalogueList {...props} isImagePlaceholderEnabled={false} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("CatalogueListTitle: ", () => {
        let props
        beforeEach(() => {
            props = {
                title: "sample",
                icon: {width: 24, height: 25, url: "/cool-image-path"},
                isIconEnabled: true,
                catalogueMarketingStyles: {
                    linkColour: "",
                    fontFamily: null,
                    fontWeight: "",
                },
            }
        })
        it("Should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CatalogueListTitle {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("CatalogueListContent: ", () => {
        let props
        beforeEach(() => {
            props = {
                items: [
                    {
                        target: "test",
                        title: "sample",
                        icon: {width: 24, height: 25, url: "/cool-image-path"},
                        type: "test",
                        linkColour: "blue",
                        fontWeight: "500",
                        fontFamily: "test",
                        excludeFrom: null,
                    },
                ],
            }
        })
        it("Should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CatalogueListContent {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("SmallScreens: ", () => {
        let props
        beforeEach(() => {
            props = {
                title: "sample",
                opened: false,
                setOpened: jest.fn(),
                icon: {width: 24, height: 25, url: "/cool-image-path"},
                items: [
                    {target: "/dress", title: "dress"},
                    {target: "/shirt", title: "shirt"},
                ],
                catalogueMarketingStyles: {
                    linkColour: "#fff",
                    fontFamily: "",
                    fontWeight: "",
                },
                department: "sports",
                tab: "running",
                text: {chevronIconAltText: mockText.chevronIconAltText},
            }
        })
        it("Should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SmallScreen {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("Should match the snapshot when there is no title", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SmallScreen {...props} title="" />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("Should have a title", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SmallScreen {...props} />
                </SCThemeProvider>,
            )
            const title = screen.getByText(props.title)
            expect(title).toBeInTheDocument()
        })
        it("Should not render title when there is no title", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SmallScreen {...props} title="" />
                </SCThemeProvider>,
            )
            const title = screen.queryByText(props.title)
            expect(title).not.toBeInTheDocument()
        })
        it("Should render a list", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SmallScreen {...props} />
                </SCThemeProvider>,
            )
            const elements = screen.getAllByRole("listitem")
            const list = screen.getByRole("list")
            expect(list).toBeInTheDocument()
            expect(elements).toHaveLength(props.items.length)
        })
        it("Should display a list when toggled", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SmallScreen {...props} opened />
                </SCThemeProvider>,
            )

            const list = screen.getByRole("list")
            fireEvent.click(list)
            expect(list).toBeVisible()
        })
    })

    describe("BigScreen: ", () => {
        let props
        beforeEach(() => {
            props = {
                setOpened: jest.fn(),
                title: "sample",
                icon: null,
                items: [
                    {target: "/dress", title: "dress"},
                    {target: "/shirt", title: "shirt"},
                ],
                catalogueMarketingStyles: {
                    linkColour: "",
                    fontFamily: "",
                    fontWeight: "",
                },
            }
        })
        it("Should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreen {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("Should have a title", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreen {...props} />
                </SCThemeProvider>,
            )
            const title = screen.getByText(props.title)
            expect(title).toBeInTheDocument()
        })
        it("Should not render title when there is no title", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreen {...props} title="" />
                </SCThemeProvider>,
            )
            const title = screen.queryByText(props.title)
            expect(title).not.toBeInTheDocument()
        })
        it("Should should render a list", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <BigScreen {...props} />
                </SCThemeProvider>,
            )
            const elements = screen.getAllByRole("listitem")
            const list = screen.getByRole("list")
            expect(list).toBeInTheDocument()
            expect(elements).toHaveLength(props.items.length)
        })
    })
})
