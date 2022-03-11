import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {CatalogueItem} from "."
import {SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"
import {mockTheme, mockText} from "../../../__mocks__/mockStore"

describe("Catalogue Item", () => {
    let props
    beforeEach(() => {
        props = {
            title: "sample",
            target: "/sampler",
            linkColour: "#fff",
            fontFamily: "test",
            fontWeight: "",
            siteUrl: "http://IamSiteUrl/en/gb",
            department: "sample department",
            catalogueListTitle: "sample list title",
            tab: "sample tab",
            textAlignment: "ltr",
            text: {chevronIconAltText: mockText.chevronIconAltText},
            columnIndex: 0,
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
        localStorage.setItem = jest.fn()
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CatalogueItem {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot with icon", () => {
        const icon = "/cool-image-path"
        const {asFragment} = render(<CatalogueItem {...props} icon={icon} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot with icon if element is not on the first column", () => {
        const icon = "/cool-image-path"
        const {asFragment} = render(<CatalogueItem {...props} icon={icon} columnIndex={1} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should contain required attributes", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CatalogueItem {...props} />
            </SCThemeProvider>,
        )
        const element = screen.getByTestId("catalogueItem-href")
        expect(element).toHaveAttribute("href", `/en/gb${props.target}`)
        expect(element).toHaveAttribute("title", props.title)
        expect(element).toHaveTextContent(props.title)
        expect(element).toHaveAttribute("data-ga-v1", props.department)
        expect(element).toHaveAttribute("data-ga-v2", props.tab)
        expect(element).toHaveAttribute("data-ga-v3", props.title)
    })

    it("should contain required attributes - tab value null", () => {
        props.tab = null
        render(
            <SCThemeProvider theme={mockTheme}>
                <CatalogueItem {...props} />
            </SCThemeProvider>,
        )
        const element = screen.getByTestId("catalogueItem-href")
        expect(element).toHaveAttribute("href", `/en/gb${props.target}`)
        expect(element).toHaveAttribute("title", props.title)
        expect(element).toHaveTextContent(props.title)
        expect(element).toHaveAttribute("data-ga-v1", props.department)
        expect(element).toHaveAttribute("data-ga-v2", props.catalogueListTitle)
        expect(element).toHaveAttribute("data-ga-v3", props.title)
    })

    it("should match the snapshot - catalogueListTitle value null", () => {
        props.catalogueListTitle = null
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CatalogueItem {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - when RTL text alignment", () => {
        props.catalogueListTitle = null
        props.textAlignment = "rtl"
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CatalogueItem {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call function when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CatalogueItem {...props} />
            </SCThemeProvider>,
        )
        const element = screen.getByText(props.title)
        fireEvent.click(element)
        /* eslint-disable */
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            SELECTED_DEPARTMENT_DETAILS,
            '{"path":"/en/gb/sampler","dept":"sample department"}',
        )
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(localStorage.removeItem).toHaveBeenCalledWith(VISITED_PAGES)
        /* eslint-enable */
    })
})
