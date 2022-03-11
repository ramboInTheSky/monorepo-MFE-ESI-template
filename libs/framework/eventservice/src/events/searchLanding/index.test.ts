/* eslint-disable @typescript-eslint/unbound-method */
import {PageLandingESB} from "."
import Emitter from "../../eventEmitter"
import Events from ".."

jest.mock("../../eventEmitter", () => ({
    emit: jest.fn(),
    listen: jest.fn(),
}))

describe("Given a PageLandingESB ESB", () => {
    describe("When publishing", () => {
        const mockPublishData = {data: {
            TestObjectID: "TEST ID",
            TestObjectName: "TEST Name"
          }
        }

        beforeAll(() => {
            const getBackEsb = new PageLandingESB()
            getBackEsb.publish(mockPublishData)
        })

        it("should call the common PublishData", () => {
            // eslint-disable-next-line no-unused-expressions
            expect(Emitter.emit).toHaveBeenCalledWith(Events.SEARCH_LANDING_BLOOMREACH_CATEGORY, mockPublishData)
        })
    })
})