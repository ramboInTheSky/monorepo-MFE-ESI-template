import TrackViewAllModalFilterSelect from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackViewAllModalFilterSelect ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackViewAllModalFilterSelect("test:option")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "popup",
                    label: "select",
                    option: "test:option",
                },
            })
        })
    })
})
