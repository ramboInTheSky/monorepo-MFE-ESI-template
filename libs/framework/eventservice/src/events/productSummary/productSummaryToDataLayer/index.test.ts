/* eslint-disable @typescript-eslint/unbound-method */
import {ProductSummaryToDataLayer} from "."
import Emitter from "../../../eventEmitter"
import Events from "../.."

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a ProductSummaryToDataLayer ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            event: "TestEvent",
            data: {TestObjectKey: "TestValue"}
        }

        beforeAll(() => {
            const getBackEsb = new ProductSummaryToDataLayer()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith(Events.PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER, mockPublishData)
        })
    })
})