import TrackViewAllModalRemoveSelected from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackViewAllModalRemoveSelected ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackViewAllModalRemoveSelected("test:option")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "popup",
                    label: "clear",
                    option: "test:option",
                },
            })
        })
    })
})
