import {TrackEvent, TrackSiteDetailsEvent} from "@monorepo/eventservice"
import {publishTrackingEvent, publishSiteDetailsEvent} from "."

jest.mock("@monorepo/eventservice")
it("should call publishTrackingEvent event", () => {
    publishTrackingEvent("testData", {})
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(TrackEvent.prototype.publish).toHaveBeenCalled()
})

it("should call publishSiteDetailsEvent event", () => {
    publishSiteDetailsEvent({})
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(TrackSiteDetailsEvent.prototype.publish).toHaveBeenCalled()
})
