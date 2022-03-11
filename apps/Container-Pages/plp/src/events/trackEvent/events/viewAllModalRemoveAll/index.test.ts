import TrackViewAllModalRemoveAll from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackViewAllModalRemoveAll ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackViewAllModalRemoveAll()
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
                filter: {
                    category: "filter",
                    action: "popup",
                    label: "clear all",
                },
            })
        })
    })
})
