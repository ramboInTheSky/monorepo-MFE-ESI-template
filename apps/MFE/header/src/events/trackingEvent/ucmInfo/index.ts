/* eslint-disable @typescript-eslint/camelcase */
import {publishTrackingEvent} from ".."
import {GTM_UCM_INFO} from "../../../config/constants"

interface UCMInfo {
    ucmSDK: boolean
}

export const handleUCMInfoPageLoad = ({ucmSDK}: UCMInfo) => {
    publishTrackingEvent(GTM_UCM_INFO, {
      isUserConsentFeatureEnabled: ucmSDK && "true"
    })
}
