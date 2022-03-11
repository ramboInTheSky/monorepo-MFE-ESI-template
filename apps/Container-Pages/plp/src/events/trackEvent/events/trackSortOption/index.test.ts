import TrackSortOption from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackSortOption ", () => {
    describe("When publishing the event", () => {
        it("should call publishTrackEvent with expected data", () => {
            TrackSortOption("test-label")
            expect(publishTrackEvent).toHaveBeenCalledWith("sort", {
                sort: {
                    category: "sort",
                    action: "option",
                    label: "test-label"
                },
            })
        })

        it("should call publishTrackEvent with urlDecoded data if the label is urlEncoded", () => {
            TrackSortOption("test%20label")
            expect(publishTrackEvent).toHaveBeenCalledWith("sort", {
                sort: {
                    category: "sort",
                    action: "option",
                    label: "test label"
                },
            })
        })
    })
})
