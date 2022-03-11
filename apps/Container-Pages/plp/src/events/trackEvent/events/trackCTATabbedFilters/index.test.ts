import TrackCTATabbedFilters from "."
import {publishTrackEvent} from "../.."

jest.mock("../..", () => ({publishTrackEvent: jest.fn()}))

describe("Given a TrackCTATabbedFilters ", () => {
    describe("When publishing the event", () => {
        beforeAll(() => {
            TrackCTATabbedFilters("Brand: next, nike, test | Category: jeans | Colour: red")
        })

        it("should call publishTrackEvent with expected data", () => {
            expect(publishTrackEvent).toHaveBeenCalledWith("filter", {
              filter: {
                category: 'filter',
                action: 'popup',
                label: 'View Products',
                option: "Brand: next, nike, test | Category: jeans | Colour: red",
              },
            })
        })
    })
})
