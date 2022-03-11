import React from "react"
import {render, cleanup} from "@testing-library/react"
import {Provider} from "react-redux"
import configureMockStore from "redux-mock-store"
import {ThemeProvider} from "styled-components"

import {Product} from "."
import {mockUseDispatchReturnValue} from "../../../__mocks__/reduxMocks"
import {centralisedMockTheme, mockState, mockTheme} from "../../../__mocks__/mockStore"

jest.mock("../swiperColourwayImages", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST SWIPER CAROUSEL</div>,
}))
jest.mock("../colourwaytitle", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST TITLE</div>,
}))
jest.mock("../colourchips", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST CHIPS</div>,
}))
jest.mock("../price", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST PRICE</div>,
}))
jest.mock("../favourites", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>favourites component</div>,
}))
jest.mock("../starRatingContainer", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>star Rating component</div>,
}))

beforeAll(() => {
    mockUseDispatchReturnValue()
})

describe("Product: ", () => {
    afterEach(() => {
        cleanup()
    })

    it("should match the snapshot if product", () => {
        const {asFragment} = render(
            <Product
                itemNumber="test_pid"
                favouriteBtnEnabled
                productType="product"
                enableReviewStars
                enableBrandDisplay={false}
                brand=""
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot if product with brand display and brand", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Product
                    itemNumber="test_pid"
                    favouriteBtnEnabled
                    productType="product"
                    enableReviewStars
                    enableBrandDisplay
                    brand="next"
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot if product and centralised", () => {
        const {asFragment} = render(
            <ThemeProvider theme={centralisedMockTheme}>
                <Product
                    itemNumber="test_pid"
                    favouriteBtnEnabled
                    productType="product"
                    enableReviewStars
                    enableBrandDisplay={false}
                    brand=""
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot if suit", () => {
        const mockStateWithSuit = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                summaryData: {
                    ...mockState.productSummary.summaryData,
                    type: "suit",
                    colourways: [
                        {
                            selected: true,
                            title: "Test",
                            id: "007",
                            price: "£20",
                            url: "test-url",
                            suitPrice: "£10",
                            associatedColourway: {price: "£10"},
                        },
                    ],
                },
            },
        } as any
        const mockConfigureStore = configureMockStore()
        const mockStore = mockConfigureStore(mockStateWithSuit)
        const {asFragment} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <Product
                        itemNumber="test_pid"
                        favouriteBtnEnabled={false}
                        productType="suit"
                        enableReviewStars={false}
                        enableBrandDisplay={false}
                        brand=""
                    />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
