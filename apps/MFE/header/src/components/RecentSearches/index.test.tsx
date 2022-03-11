/* eslint-disable */
import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import Cookies from "js-cookie"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {RecentSearches, RecentSearchesProps} from "."
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

describe("Components - RecentSearches: ", () => {
    let props: RecentSearchesProps
    beforeEach(() => {
        props = {
            items: [{item: "celio", url: `fakeamido.com/search?w=celio`}],
            typedCharacters: "cel",
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
                <RecentSearches {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should remove localStorage when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <RecentSearches {...props} />
            </SCThemeProvider>,
        )

        fireEvent.click(screen.getByTestId("header-recent-searches-celio"))
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
})
