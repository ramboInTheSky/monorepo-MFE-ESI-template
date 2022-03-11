/* eslint-disable @typescript-eslint/camelcase */
import {publishTrackingEvent} from ".."
import {GTM_MONETATE_INFO} from "../../../config/constants"

interface MonetateInfoObj {
    monetateSDK: boolean
}

export const handleMonetateInfoPageLoad = (paramObj: MonetateInfoObj) => {
    publishTrackingEvent(GTM_MONETATE_INFO, {
        monetate_enabled: paramObj.monetateSDK ? "true" : "false"
    })
}
