import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Brand, BrandProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

describe("Components - Brand: ", () => {
    let props: BrandProps
    beforeEach(() => {
        props = {
            narrowModeIcon: "narrowicon",
            wideModeIcon: "wideicon",
            accessibilityText: "Amido logo",
            tooltip: "Click here to go to homepage",
            url: "https://pageurl.com",
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Brand {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should have required attributes", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Brand {...props} />
            </SCThemeProvider>,
        )
        const link = screen.getByRole("link")

        expect(link).toHaveAttribute("title", props.tooltip)
        expect(link).toHaveAttribute("href", props.url)
        expect(link).toHaveAttribute("aria-label", props.accessibilityText)

        const img = screen.getAllByRole("img")[1]
        expect(img).toHaveAttribute("src", props.wideModeIcon)
        expect(img).toHaveAttribute("alt", props.accessibilityText)
    })
    it("should remove localStorage when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Brand {...props} />
            </SCThemeProvider>,
        )
        const link = screen.getByTestId("header-adaptive-brand")
        fireEvent.click(link)
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
})
