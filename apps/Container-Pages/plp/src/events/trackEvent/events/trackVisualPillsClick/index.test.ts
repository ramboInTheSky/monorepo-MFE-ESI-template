/* istanbul ignore file */
import TrackVisualPillsClick from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackVisualPillsClick ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackVisualPillsClick("test-name", "test-link")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("visualPillsClick", {
                visualPillsClick: {
                    /* eslint-disable */
                    link_category: "visualPills",
                    link_id: "test-link",
                    link_name: "test-name",
                    link_value: "",
                    /* eslint-enable */
                },
            })
        })
    })
})
