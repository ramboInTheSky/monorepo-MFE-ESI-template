import TrackViewAllModalFilterDeselect from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackViewAllModalFilterDeselect ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackViewAllModalFilterDeselect("test:option")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "popup",
                    label: "remove",
                    option: "test:option",
                },
            })
        })
    })
})
