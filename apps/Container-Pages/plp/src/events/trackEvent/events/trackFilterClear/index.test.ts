import TrackFilterClear from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackFilterClear ", () => {
    describe("When clear button clicked", () => {
        beforeAll(() => {
            TrackFilterClear("test filter category")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "clear",
                    label: "test filter category",
                },
            })
        })
    })
})
