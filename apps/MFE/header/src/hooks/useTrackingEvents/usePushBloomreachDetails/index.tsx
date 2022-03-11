import {useEffect} from "react"
import {useSelector} from "react-redux"
import {State} from "../../../ducks"
import {handleBloomreachInfoPageLoad} from "../../../events/trackingEvent/bloomreachInfo"
import {TERRITORY_HEADER} from "../../../config/constants"
import {doGTMDataLayerEvents} from "../../../utils/featureSwitch"

const selectStateForGTM = (state: State) => {
    const {bloomreachGroupLocation, bloomreachDomainKey} = state.request
    // PBI19239- get RPID cookie util to be implemented
    const territory = state.request.headers![TERRITORY_HEADER]
    return {
        bloomreachGroupLocation,
        territory,
        bloomreachDomainKey,
    }
}

const useGTMSelectorProps = () => {
    // To enforce running only once
    const state = useSelector(selectStateForGTM, () => true)
    return state
}

export const usePushBloomreachDetails = () => {
    const state = useGTMSelectorProps()

    useEffect(() => {
        if (!state || !doGTMDataLayerEvents()) return

        handleBloomreachInfoPageLoad(state)
    }, [state])
}
