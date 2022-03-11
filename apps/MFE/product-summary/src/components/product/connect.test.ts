import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

jest.mock("../../utils/setFavouriteEnabled", () => ({
    __esModule: true,
    default: jest.fn(() => true),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and return itemNumber and enableFav from product summary if enableFav is disabled", () => {
        expect(mapStateToProps(mockState)).toEqual({
            itemNumber: mockState.productSummary.summaryData.id,
            favouriteBtnEnabled: false,
            productType: "product",
            enableReviewStars: false,
            brand: "nike",
            enableBrandDisplay: false,
        })
    })

    it("should project state and return itemNumber and enableFav from product summary if enableFav is enabled", () => {
        const mockStateEnabledFavs = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                enableFav: true,
                enableReviewStars: true,
            },
        }

        expect(mapStateToProps(mockStateEnabledFavs)).toEqual({
            itemNumber: mockState.productSummary.summaryData.id,
            favouriteBtnEnabled: true,
            productType: "product",
            enableReviewStars: true,
            enableBrandDisplay: false,
            brand: "nike",
        })
    })
})
