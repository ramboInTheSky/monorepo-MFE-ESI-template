import TrackFilterSelection from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackFilterSelection ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackFilterSelection("test filter", "test filter option")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
              filter: {
                category: 'filter',
                action: 'select',
                label: "test filter",
                option: "test filter option"
              },
            })
        })
    })
})
