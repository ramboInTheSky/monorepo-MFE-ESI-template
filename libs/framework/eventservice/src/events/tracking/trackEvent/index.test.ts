/* eslint-disable @typescript-eslint/unbound-method */
import {TrackEvent} from "."
import Emitter from "../../../eventEmitter"
import Events from "../.."

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a TrackEvent ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            event: "TestEvent",
            data: {TestObjectKey: "TestValue"},
        }

        beforeAll(() => {
            const getBackEsb = new TrackEvent()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith(Events.TRACK_EVENT, mockPublishData)
        })
    })
})
