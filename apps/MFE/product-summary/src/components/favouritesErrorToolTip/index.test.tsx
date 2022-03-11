import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import {mockTheme} from "../../../__mocks__/mockStore"
import {FavouritesErrorToolTip, FavouritesErrorToolTipProps} from "."
import {FavErrorToolTipType} from "../../models/ProductSummary"
import text from "../../../__mocks__/default-text.json"

jest.mock("@monorepo/eventservice")

jest.mock("@monorepo/tooltipv2", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children}) => <div>{children}</div>,
}))
const props: FavouritesErrorToolTipProps = {
    setShowFavErrorToolTip: () => null,
    showFavErrorToolTip: null,
    baseUrl: "https://www.amido.com",
    referenceElement: null,
    text,
}

describe("FavoritesToolTip component", () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        delete window.NextFavourites
    })

    it("should render as expected when NextFavourites has Errors", () => {
        const newProps = {
            ...props,
            showFavErrorToolTip: FavErrorToolTipType.Error,
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesErrorToolTip {...newProps} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render as expected when user has more favourites more than MaximumLimit", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                ShoppingLists: ["Data 1", "Data 2"],
                MaximumLimit: 1,
            },
        }

        const newProps = {
            ...props,
            showFavErrorToolTip: FavErrorToolTipType.MaxLimit,
        }

        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesErrorToolTip {...newProps} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call useModalsCloseObservable", () => {
        const newProps = {
            ...props,
            showFavErrorToolTip: FavErrorToolTipType.MaxLimit,
        }
        ;(useModalsCloseObservable as any).mockImplementationOnce(cb => {
            cb("useModalsCloseObservable")
        })

        render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesErrorToolTip {...newProps} />
            </ThemeProvider>,
        )
        expect(useModalsCloseObservable).toHaveBeenCalled()
    })

    it("should not show tooltip when user clicks to close button", () => {
        const newProps = {
            ...props,
            showFavErrorToolTip: FavErrorToolTipType.MaxLimit,
        }
        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesErrorToolTip {...newProps} />
            </ThemeProvider>,
        )
        fireEvent.click(getByTestId("product-summary-favourite-error-tooltip-close"))
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not show tooltip when errorType is null", () => {
        const newProps = {
            ...props,
            showFavErrorToolTip: null,
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FavouritesErrorToolTip {...newProps} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
