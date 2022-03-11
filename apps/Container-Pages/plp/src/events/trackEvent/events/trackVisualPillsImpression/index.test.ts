/* istanbul ignore file */
import TrackVisualPillsImpression from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackVisualPillsImpression ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackVisualPillsImpression("test-name")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("visualPillsImpression", {
                visualPillsImpression: {
                    /* eslint-disable */
                    link_category: "visualPills",
                    link_id: "Impression",
                    link_name: "test-name",
                    link_value: "",
                    /* eslint-enable */
                },
            })
        })
    })
})
