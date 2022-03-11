/* eslint-disable @typescript-eslint/camelcase */
import { publishTrackingEvent} from ".."
import {GTM_BLOOMREACH_INFO} from "../../../config/constants"

interface BloomReachInfoObj {
    bloomreachGroupLocation: string;
    territory: string | string[] | undefined;
    bloomreachDomainKey: string;
}

export const handleBloomreachInfoPageLoad = (paramObj: BloomReachInfoObj) => {
    publishTrackingEvent(GTM_BLOOMREACH_INFO, {
        br_rpid: "PBI19239",
        br_pot_id: paramObj.bloomreachGroupLocation,
        br_pixel_enabled: true,
        br_view_id: paramObj.territory,
        br_domain_key: paramObj.bloomreachDomainKey,
    })
}