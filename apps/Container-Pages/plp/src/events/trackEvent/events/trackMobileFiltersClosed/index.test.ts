import TrackMobileFiltersClosed from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackMobileFiltersClosed ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackMobileFiltersClosed()
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "closed",
                },
            })
        })
    })
})
