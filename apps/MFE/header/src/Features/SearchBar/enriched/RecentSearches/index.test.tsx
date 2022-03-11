/* eslint-disable */
import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme, mockText} from "../../../../../__mocks__/mockStore"
import {EnrichRecentSearches, RecentSearchesProps} from "."

jest.mock("../../../../components/RecentSearches", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => (
        <ul>
            <li>
                <a href="/abc">abc</a>
            </li>
            <li>
                <a href="/abcdef">abcdef</a>
            </li>
        </ul>
    ),
}))

describe("Components - EnrichRecentSearches: ", () => {
    let props: RecentSearchesProps
    beforeEach(() => {
        props = {
            clear: jest.fn(),
            text: mockText.recentSearches.enriched,
        }
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichRecentSearches {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should clear recent items when clear button is clicked", () => {
        document.cookie = "; recentSearches=[{%22term%22:%22celio%22%2C%22af%22:%22%22%2C%22name%22:%22%22}]"
        const {getByTestId} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichRecentSearches {...props} />
            </SCThemeProvider>,
        )
        const button = getByTestId("header-enrich-recent-searches").getElementsByTagName("button")[0]
        fireEvent.click(button)
        expect(document.cookie).toEqual("")
    })
    it("Should redirect to plp when a recent search item is clicked", () => {
        window = Object.create(window)
        Object.defineProperty(window, "location", {
            value: {
                href: "",
            },
        })
        const {getByTestId} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichRecentSearches {...props} />
            </SCThemeProvider>,
        )
        const href = getByTestId("header-enrich-recent-searches").getElementsByTagName("a")[0]

        expect(href).toHaveAttribute("href", "/abc")
    })
})
