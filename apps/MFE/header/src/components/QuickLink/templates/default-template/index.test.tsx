import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {NO_FOLLOW, LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../../../config/constants"
import QuickLink, {QuickLinkProps} from "."

describe("Components - QuickLink: ", () => {
    let props: QuickLinkProps

    jest.mock("../../../../config/constants", () => {
        return {
            __esModule: true,
            // eslint-disable-next-line @typescript-eslint/require-await
            NO_FOLLOW: "nofollow",
        }
    })

    beforeEach(() => {
        props = {
            url: "http://hello.com/help",
            text: "help",
            accessibilityText: "help",
            icon: "/stores.svg",
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
    it("should have rel attributes", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <QuickLink {...props} />
            </SCThemeProvider>,
        )
        const link = screen.getByRole("link")
        expect(link).toHaveAttribute("rel", NO_FOLLOW)
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(<QuickLink {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should have attributes", () => {
        render(<QuickLink {...props} />)
        const link = screen.getByRole("link")
        expect(link).toHaveAttribute("href", props.url)
    })
    it("should contain text ", () => {
        render(<QuickLink {...props} />)
        const link = screen.getByRole("listitem")
        expect(link).toHaveTextContent(props.text!)
    })
    it("should contain icon ", () => {
        render(<QuickLink {...props} />)
        const link = screen.getByRole("img")
        expect(link).toHaveAttribute("src", "/stores.svg")
    })

    it("should not contain icon if icon is null", () => {
        props.icon = null
        render(<QuickLink {...props} />)
        const link = screen.queryByRole("img")
        expect(link).toBeNull()
    })

    it("should not contain text if text is null", () => {
        props.text = null
        render(<QuickLink {...props} />)
        const link = screen.queryByText("listitem")
        expect(link).toBeNull()
    })

    it("should remove localStorage when clicked", () => {
        render(<QuickLink {...props} />)

        fireEvent.click(screen.getByTestId("quicklink-container"))
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
})
