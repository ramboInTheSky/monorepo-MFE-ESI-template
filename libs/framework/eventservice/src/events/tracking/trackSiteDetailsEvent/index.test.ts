/* eslint-disable @typescript-eslint/unbound-method */
import {TrackSiteDetailsEvent} from "."
import Emitter from "../../../eventEmitter"
import Events from "../.."

jest.mock("../../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a TrackSiteDetailsEvent ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {
            data: {TestObjectKey1: "TestValue1", TestObjectKey2: "TestValue2"},
        }

        beforeAll(() => {
            const getBackEsb = new TrackSiteDetailsEvent()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith(Events.TRACK_SITE_DETAILS_EVENT, mockPublishData)
        })
    })
})
