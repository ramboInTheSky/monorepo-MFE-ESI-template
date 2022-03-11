import TrackViewAllModalSearchBar from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackViewAllModalSearchBar ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackViewAllModalSearchBar("test:option")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "popup",
                    label: "search",
                    option: "test:option",
                },
            })
        })
    })
})
