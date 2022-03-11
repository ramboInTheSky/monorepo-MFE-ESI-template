import {handleProductClick} from "."
import {PublishTrackEvent} from ".."
import {GTM_PRODUCT_CLICK_EVENT} from "../../../../config/constants"

jest.mock("@monorepo/eventservice")
jest.mock("..", () => ({
    PublishTrackEvent: jest.fn(),
}))
jest.mock("../../../../utils/getIndexByProductID", () => ({
    getIndexByProductID: jest.fn(() => 16),
}))

const data = {
    id: "000",
    title: "Next t-shirt",
    price: "£100",
    colour: "blue",
    currencyCode: "GBP",
    department: "menswear",
}
describe("Given a `handleProductClick` event", () => {
    it("should call PublishTrackEvent with correct data", () => {
        handleProductClick(data)
        const expectedData = {
            ecommerce: {
                click: {actionField: {list: "menswear"}},
                currencyCode: "GBP",
                products: [
                    {
                        brand: null,
                        category: null,
                        dimension21: null,
                        dimension22: "",
                        dimension23: null,
                        dimension24: null,
                        dimension25: "",
                        dimension26: "",
                        dimension27: "",
                        dimension28: "blue",
                        dimension43: null,
                        id: "000",
                        name: "Next t-shirt",
                        position: 16,
                        price: "100",
                    },
                ],
            },
        }
        expect(PublishTrackEvent).toHaveBeenCalledWith(GTM_PRODUCT_CLICK_EVENT, expectedData)
    })
})
