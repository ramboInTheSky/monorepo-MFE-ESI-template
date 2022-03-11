/* eslint-disable @typescript-eslint/unbound-method */
import {AddProductsToMonetate} from "."
import Emitter from "../../../eventEmitter"
import Events from "../.."

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given AddProductsToMonetate", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            success: true,
            data: ["test-id"],
        }

        beforeAll(() => {
            const getBackEsb = new AddProductsToMonetate()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith(Events.PLP_ADD_PRODUCTS_TO_MONETATE, mockPublishData)
        })
    })
})
