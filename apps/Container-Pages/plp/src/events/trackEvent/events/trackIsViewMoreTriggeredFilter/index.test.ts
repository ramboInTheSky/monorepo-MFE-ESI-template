import TrackIsViewMoreTriggeredFilter from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackIsViewMoreTriggeredFilter ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackIsViewMoreTriggeredFilter("test filter")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
              filter: {
                category: 'filter',
                action: 'expand more',
                label: "test filter"
              },
            })
        })
    })
})
