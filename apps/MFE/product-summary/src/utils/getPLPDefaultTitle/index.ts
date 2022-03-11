import {getElementById} from "../window"
import {PLP_DEFAULT_TITLE_CONTAINER} from "../../config/constants"

export const getPLPDefaultTitle = () => {
    const element = getElementById(`${PLP_DEFAULT_TITLE_CONTAINER}`)

    if (!element) return

    const title = element.dataset.defaultTitle
    return title
}

export const getSearchKeyword = (locationHref: string, locationSearch: string) => {
    let searchKeyword = ""
    if (/search\?/.exec(locationHref)) {
        const urlParams = new URLSearchParams(locationSearch)
        const wParamValue = urlParams.get("w")
        searchKeyword = wParamValue || ""
    }
    return searchKeyword
}
