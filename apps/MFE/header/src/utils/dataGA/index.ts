import {HEADER_NAV_BAR_QUICK_LINKS, HEADER_NAV_BAR_HELP, HEADER_NAV_BAR_STORE_LOCATOR} from "../../config/constants"

export const buildGaTags = (text: string | null) => {
    let headerQuicklink
    if (text) {
        switch (text.trim().toUpperCase()) {
            case HEADER_NAV_BAR_HELP.toUpperCase():
                headerQuicklink = HEADER_NAV_BAR_HELP
                break
            case HEADER_NAV_BAR_STORE_LOCATOR.toUpperCase():
                headerQuicklink = HEADER_NAV_BAR_STORE_LOCATOR
                break
            default:
                headerQuicklink = null
        }
    }
    return headerQuicklink
        ? {
              dataGaV1: HEADER_NAV_BAR_QUICK_LINKS,
              dataGaV2: headerQuicklink,
          }
        : {
              dataGaV1: undefined,
              dataGaV2: undefined,
          }
}
