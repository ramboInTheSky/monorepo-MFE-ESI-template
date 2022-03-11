import TrackSortOpen from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackSortOpen ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackSortOpen()
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("sort", {
                sort: {
                    category: "sort",
                    action: "open",
                },
            })
        })
    })
})
