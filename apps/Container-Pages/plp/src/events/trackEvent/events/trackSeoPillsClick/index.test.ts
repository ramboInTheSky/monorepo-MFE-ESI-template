import TrackSeoPillsClick from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackSeoPillsClick ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackSeoPillsClick("test-name", "test-link")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("seoPillsClick", {
                seoPillsImpression: {
                    /* eslint-disable */
                    link_category: "seoPills",
                    link_id: "test-link",
                    link_name: "test-name",
                    link_value: ""
                    /* eslint-enable */
                },
            })
        })
    })
})
