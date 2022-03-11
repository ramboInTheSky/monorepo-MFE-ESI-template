/* eslint-disable @typescript-eslint/camelcase */
import {handleBloomreachInfoPageLoad} from "."
import {publishTrackingEvent} from ".."
import {GTM_BLOOMREACH_INFO} from "../../../config/constants"

jest.mock("../", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishTrackingEvent: jest.fn(),
}))
describe("When data is supplied to Track Bloomreach Event", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should push the data to dataLayer", () => {
        const expectedEventName = GTM_BLOOMREACH_INFO
        const expectedEventData = {
            br_pot_id: "southWest",
            br_domain_key: "city_global",
            br_pixel_enabled: true,
            br_rpid: "PBI19239",
            br_view_id: "ct",
        }
        handleBloomreachInfoPageLoad({
            bloomreachGroupLocation: "southWest",
            territory: "ct",
            bloomreachDomainKey: "city_global",
        })
        expect(publishTrackingEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
    })
})