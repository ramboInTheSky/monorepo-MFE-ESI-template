import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ProductFavourites} from "."
import {getFavourtiesSubscriptionCallBack} from "../../events"
import {getNextFavouritesData} from "../../utils/favourites"
import text from "../../../__mocks__/default-text.json"
import * as useProductFavouritesHook from "../../hooks/useProductFavourites"
import {FavouriteState} from "../../models/Favourites"

jest.mock("@monorepo/eventservice")
jest.mock("../../utils/favourites", () => ({
    isFavouriteProduct: jest.fn(() => true),
    getFavouriteIconPath: jest.fn(() => "icon"),
    setFavoritesCallback: jest.fn(),
    getNextFavouritesData: jest.fn(),
    shoppingListItemsToFavouritedColourways: jest.fn(),
}))
jest.mock("../../events", () => ({
    getFavourtiesSubscriptionCallBack: jest.fn(() => "getFavourtiesSubscriptionCallBack"),
}))

jest.mock("../favouritesErrorToolTip", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>FavouritesErrorToolTip component</div>,
}))
jest.mock("../favouritesToolTip", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>FavouritesToolTip component</div>,
}))

const props = {
    addToFavourites: jest.fn(),
    removeFromFavourites: jest.fn(),
    baseUrl: "www.amido.com",
    isFav: false,
    showFavErrorToolTip: null,
    itemNumber: "111222",
    setFavouritedColourways: jest.fn(),
    text,
    selectedColourwayTitle: "Selected Colourway Title",
}

const renderComponent = (allProps: any) => {
    return render(
        <ThemeProvider theme={mockTheme}>
            <ProductFavourites {...allProps} />
        </ThemeProvider>,
    )
}

describe("ProductFavourites component", () => {
    beforeAll(() => {
        ;(getNextFavouritesData as jest.Mock).mockImplementation(() => ({
            Data: {
                ShoppingLists: [
                    {
                        ItemNumber: "1234",
                    },
                ],
            },
        }))

        jest.clearAllMocks()
    })

    it("should match when it is inactive", () => {
        const {asFragment} = renderComponent(props)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match when it is active", () => {
        const newProps = {
            ...props,
            isFav: true,
        }
        const {asFragment} = renderComponent(newProps)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match snapshot when favourites button clicked", () => {
        const {getByTestId, asFragment} = renderComponent(props)
        fireEvent.click(getByTestId("product-summary-favourites-button"))
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match snapshot when getTranslatedFavState returns empty string", () => {
        const mockUseProductFavourites = jest
            .spyOn(useProductFavouritesHook, "useProductFavourites")
            .mockImplementation(() => {
                return {toggleProductFavourites: jest.fn(), favState: "dummy FavouriteState" as FavouriteState}
            })
        const {asFragment} = renderComponent(props)
        expect(asFragment()).toMatchSnapshot()
        mockUseProductFavourites.mockRestore()
    })

    describe("IsFavourite Check", () => {
        beforeAll(() => {
            jest.clearAllMocks()
        })

        it("should call setIsFav successfully with NextFavourites data", () => {
            const setFavouritedColourwaysMock = jest.fn()

            const newProps = {
                ...props,
                isFav: true,
                setFavouritedColourways: setFavouritedColourwaysMock,
            }
            renderComponent(newProps)
            expect(setFavouritedColourwaysMock).toHaveBeenCalled()
        })

        it("should call getFavourtiesSubscriptionCallBack successfully without NextFavourites data", () => {
            ;(getNextFavouritesData as jest.Mock).mockImplementation(() => undefined)

            const setFavouritedColourwaysMock = jest.fn()

            const newProps = {
                ...props,
                isFav: true,
                setFavouritedColourways: setFavouritedColourwaysMock,
            }
            renderComponent(newProps)
            expect(getFavourtiesSubscriptionCallBack).toHaveBeenCalledWith(expect.any(Function), expect.any(Function))
        })
    })
})
