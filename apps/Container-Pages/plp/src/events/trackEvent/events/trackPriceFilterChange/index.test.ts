import TrackPriceFilterChange from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackPriceFilterChange ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackPriceFilterChange(100, 3000)
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
              filter: {
                category: 'filter',
                action: 'select',
                label: 'price',
                option: `100 - 3000`,
              },
            })
        })
    })
})
