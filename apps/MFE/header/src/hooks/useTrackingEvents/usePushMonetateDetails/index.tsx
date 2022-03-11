import {useEffect} from "react"
import {useSelector} from "react-redux"
import {State} from "../../../ducks"
import {handleMonetateInfoPageLoad} from "../../../events/trackingEvent/monetateInfo"
import {doGTMDataLayerEvents} from "../../../utils/featureSwitch"

const selectStateForGTM = (state: State) => {
    const {monetateSDK} = state.request
    return {
        monetateSDK,
    }
}

const useGTMSelectorProps = () => {
    // To enforce running only once
    const state = useSelector(selectStateForGTM, () => true)
    return state
}

export const usePushMonetateDetails = () => {
    const state = useGTMSelectorProps()

    useEffect(() => {
        if (!state || !doGTMDataLayerEvents()) return

        handleMonetateInfoPageLoad(state)
    }, [state])
}
