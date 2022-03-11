import TrackFilterExpanded from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackMobileFiltersOpen ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackFilterExpanded("test")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "expanded",
                    label: "test",
                },
            })
        })
    })
})
