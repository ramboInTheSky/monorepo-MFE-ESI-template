import {onPageLoadGtmTrigger} from "."
import {GTM_PRODUCT_IMPRESSIONS_EVENT} from "../../config/constants"
import {publishProductImpressions} from "../../events"

jest.mock("../../events", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishProductImpressions: jest.fn(),
}))

jest.mock("../getIndexByProductID", () => ({
    getIndexByProductID: jest.fn(() => 16+1),
}))

describe("Given a onPageLoadGtmTrigger", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("When all parameters are supplied", () => {
        it("should push the parameters to dataLayer", () => {
            const expectedEventName = GTM_PRODUCT_IMPRESSIONS_EVENT
            const expectedEventData = {
                ecommerce: {
                    currencyCode: "GBP",
                    impressions:
                    {
                      id: "testId",
                      name: "testTitle",
                      price: "testPrice",
                      brand: null,
                      category: "shirts",
                      position: 17,
                      list: "shirts",
                      dimension21: null,
                      dimension22: '',
                      dimension23: "shirts",
                      dimension24: null,
                      dimension25: '',
                      dimension26: '',
                      dimension27: '',
                      dimension28: "testColour",
                      dimension43: null
                    }
                }
            }

            onPageLoadGtmTrigger({
                productId: "testId",
                productTitle: "testTitle",
                price: "testPrice",
                colour: "testColour",
                currencyCode: "GBP",
                department: "shirts",
                searchKeyword: "shirts",
            })
            expect(publishProductImpressions).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })
})
