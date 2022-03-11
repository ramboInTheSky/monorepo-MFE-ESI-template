import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render, cleanup, screen, fireEvent} from "@testing-library/react"
import {
    useFavouritesGetCallbackObservable,
    useFavouritesAddCallbackObservable,
    useFavouritesRemoveCallbackObservable,
} from "@monorepo/eventservice"
import {Favourites} from "."
import {NO_FOLLOW, LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("@monorepo/eventservice")

jest.mock("../../config/constants", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        NO_FOLLOW: "nofollow",
    }
})
const mockUpdateFavourites = jest.fn()
const props = {
    iconUrl: "/inactive",
    altText: "favourites",
    enableFavourites: true,
    updateFavourites: mockUpdateFavourites,
    favouritesUrl: "http://superman.com/favourites",
    siteUrl: "http://amido.com",
    hiddenProps: {mdUp: true},
}

describe("Components - Favourites: ", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot when enableFavourites is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Favourites {...props} enableFavourites />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when enableFavourites is false", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Favourites {...props} enableFavourites={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should have rel attribute", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Favourites {...props} enableFavourites />
            </SCThemeProvider>,
        )

        const got = screen.getByRole("link")
        expect(got).toHaveAttribute("rel", NO_FOLLOW)
    })

    it("should subscribe to the ESB events", () => {
        ;(useFavouritesGetCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useFavouritesGetCallbackObservable")
        })
        ;(useFavouritesAddCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useFavouritesAddCallbackObservable")
        })
        ;(useFavouritesRemoveCallbackObservable as any).mockImplementationOnce(cb => {
            cb("useFavouritesRemoveCallbackObservable")
        })
        render(
            <SCThemeProvider theme={mockTheme}>
                <Favourites {...props} />
            </SCThemeProvider>,
        )

        expect(mockUpdateFavourites).toHaveBeenCalledWith("useFavouritesGetCallbackObservable")
        expect(mockUpdateFavourites).toHaveBeenCalledWith("useFavouritesAddCallbackObservable")
        expect(mockUpdateFavourites).toHaveBeenCalledWith("useFavouritesRemoveCallbackObservable")
    })
    it("should remove localStorage when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Favourites {...props} enableFavourites />
            </SCThemeProvider>,
        )

        fireEvent.click(screen.getByTestId("header-favourites-container"))
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
})
