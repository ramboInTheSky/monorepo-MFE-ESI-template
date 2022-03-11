import {TrackEvent} from "@monorepo/eventservice"
import {publishTrackEvent} from "."

jest.mock("@monorepo/eventservice")

describe("Given a `hydrate product summary` event", () => {
    it("should call HydrateProductSummaryESB", () => {
        publishTrackEvent("testData", {})
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(TrackEvent.prototype.publish).toHaveBeenCalled()
    })
})
