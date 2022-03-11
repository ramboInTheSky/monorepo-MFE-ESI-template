/* eslint-disable @typescript-eslint/unbound-method */
import {ProductSummaryTrackPage} from "."
import Emitter from "../../../eventEmitter"
import Events from "../.."

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a ProductSummaryTrackPage ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            data: [{itemNumber: "test", index: 1234}],
            event: "testEvent",
        }

        beforeAll(() => {
            const getBackEsb = new ProductSummaryTrackPage()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith(Events.PRODUCT_SUMMARY_TRACK_PAGE, mockPublishData)
        })
    })
})
