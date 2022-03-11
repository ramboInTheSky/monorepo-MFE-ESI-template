/* eslint-disable @typescript-eslint/camelcase */
import {handleMonetateInfoPageLoad} from "."
import {publishTrackingEvent} from ".."
import {GTM_MONETATE_INFO} from "../../../config/constants"

jest.mock("../", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishTrackingEvent: jest.fn(),
}))

describe("When data is supplied to Track Monetate Event", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should push the data to dataLayer", () => {
        const expectedEventName = GTM_MONETATE_INFO
        const expectedEventData = {
            monetate_enabled: "false"
        }
        handleMonetateInfoPageLoad({monetateSDK: false})
        expect(publishTrackingEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
    })

    it("should push the data to dataLayer true as a string", () => {
        const expectedEventName = GTM_MONETATE_INFO
        const expectedEventData = {
            monetate_enabled: "true"
        }
        handleMonetateInfoPageLoad({monetateSDK: true})
        expect(publishTrackingEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
    })
})