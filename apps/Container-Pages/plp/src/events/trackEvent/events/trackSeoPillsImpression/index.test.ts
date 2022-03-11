/* istanbul ignore file */
import TrackSeoPillsImpression from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackSeoPillsImpression ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackSeoPillsImpression("test-name")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("seoPillsImpression", {
                seoPillsImpression: {
                    /* eslint-disable */
                    link_category: "seoPills",
                    link_id: "Impression",
                    link_name: "test-name",
                    link_value: ""
                    /* eslint-enable */
                },
            })
        })
    })
})
