import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import {mockTheme} from "../../../__mocks__/mockStore"
import FavoritesToolTip, {FavoritesToolTipProps} from "."
import {FavouriteState} from "../../models/Favourites"
import text from "../../../__mocks__/default-text.json"

const props: FavoritesToolTipProps = {
    baseUrl: "www.amido.mx",
    favState: FavouriteState.Active,
    isProductFavourited: true,
    referenceElement: null,
    text,
    setFavClicked: jest.fn(),
}

jest.mock("@monorepo/eventservice")
jest.mock("@monorepo/tooltipv2", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children}) => <div>{children}</div>,
}))

describe("FavoritesToolTip component", () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        delete window.NextFavourites
    })

    it("should match Authenticated tooltip snapshot", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                FavouriteLoginPromptDisplayed: false,
                HardLogoutPromptDisplayed: false,
                IdentifiedUser: true,
                SoftLoginFirstname: "dummyUser",
            },
        }

        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavoritesToolTip {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call useModalsCloseObservable", () => {
        ;(useModalsCloseObservable as any).mockImplementationOnce(cb => {
            cb("useModalsCloseObservable")
        })

        render(
            <ThemeProvider theme={mockTheme}>
                <FavoritesToolTip {...props} />
            </ThemeProvider>,
        )
        expect(useModalsCloseObservable).toHaveBeenCalled()
    })

    it("should match Anonymous tooltip snapshot", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                FavouriteLoginPromptDisplayed: false,
                HardLogoutPromptDisplayed: true,
                IdentifiedUser: true,
                SoftLoginFirstname: null,
            },
        }

        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavoritesToolTip {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not show tooltip when isProductFavourited is false", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                FavouriteLoginPromptDisplayed: false,
                HardLogoutPromptDisplayed: true,
                IdentifiedUser: true,
                SoftLoginFirstname: null,
            },
        }

        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavoritesToolTip {...props} isProductFavourited={false} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not show tooltip when click to close button", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                FavouriteLoginPromptDisplayed: false,
                HardLogoutPromptDisplayed: true,
                IdentifiedUser: true,
                SoftLoginFirstname: null,
            },
        }

        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FavoritesToolTip {...props} />
            </ThemeProvider>,
        )
        fireEvent.click(getByTestId("product-summary-favourite-tooltip-close"))
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call setFavClicked with false when click to close button", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                FavouriteLoginPromptDisplayed: false,
                HardLogoutPromptDisplayed: true,
                IdentifiedUser: true,
                SoftLoginFirstname: null,
            },
        }

        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FavoritesToolTip {...props} />
            </ThemeProvider>,
        )
        fireEvent.click(getByTestId("product-summary-favourite-tooltip-close"))
        expect(props.setFavClicked).toBeCalledWith(false)
    })
})
