import {useEffect} from "react"
import {useSelector} from "react-redux"
import {TERRITORY_HEADER, LANGUAGE_HEADER, SITE_LAYOUT_HEADER} from "../../../config/constants"
import {State} from "../../../ducks"
import {handleSiteDetails} from "../../../events/trackingEvent/siteDetails"
import {doGTMDataLayerEvents} from "../../../utils/featureSwitch"

const selectStateForGTM = (state: State) => {
    const {siteUrl, currencyCode, fullTerritoryName} = state.request
    const territory = state.request.headers![TERRITORY_HEADER]
    const language = state.request.headers![LANGUAGE_HEADER]
    const siteLayout = state.request.headers![SITE_LAYOUT_HEADER]

    return {
        siteUrl,
        currencyCode,
        territory,
        fullTerritoryName,
        language,
        siteLayout,
    }
}

const useGTMSelectorProps = () => {
    // To enforce running only once
    const state = useSelector(selectStateForGTM, () => true)
    return state
}

export const usePushSiteDetails = () => {
    const state = useGTMSelectorProps()

    useEffect(() => {
        if (!state || !doGTMDataLayerEvents()) return
        handleSiteDetails(state)
    }, [state])
}
