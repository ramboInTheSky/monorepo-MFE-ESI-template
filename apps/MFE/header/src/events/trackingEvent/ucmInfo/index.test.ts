/* eslint-disable @typescript-eslint/camelcase */
import {handleUCMInfoPageLoad} from "."
import {publishTrackingEvent} from ".."
import {GTM_UCM_INFO} from "../../../config/constants"

jest.mock("../", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishTrackingEvent: jest.fn(),
}))

describe("When User Consent Management is enabled", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should push 'true' to dataLayer", () => {
        const expectedEventName = GTM_UCM_INFO
        const expectedEventData = {
            isUserConsentFeatureEnabled: "true",
        }
        handleUCMInfoPageLoad({ucmSDK: true})
        expect(publishTrackingEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
    })
})
