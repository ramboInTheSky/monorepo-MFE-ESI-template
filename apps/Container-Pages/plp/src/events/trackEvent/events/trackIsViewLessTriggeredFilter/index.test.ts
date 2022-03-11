import TrackIsViewLessTriggeredFilter from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackIsViewLessTriggeredFilter ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackIsViewLessTriggeredFilter("test filter")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
              filter: {
                category: 'filter',
                action: 'expand less',
                label: "test filter"
              },
            })
        })
    })
})
