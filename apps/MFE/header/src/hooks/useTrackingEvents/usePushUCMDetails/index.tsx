import {useEffect} from "react"
import {useSelector} from "react-redux"
import {State} from "../../../ducks"
import {handleUCMInfoPageLoad} from "../../../events/trackingEvent/ucmInfo"
import {doGTMDataLayerEvents} from "../../../utils/featureSwitch"

const selectStateForGTM = (state: State) => {
    const {"userConsentManagement.enabled": ucmSDK} = state.settings
    return {
        ucmSDK
    }
}

const useGTMSelectorProps = () => {
    // To enforce running only once
    const state = useSelector(selectStateForGTM, () => true)
    return state
}

export const usePushUCMDetails = () => {
  const state = useGTMSelectorProps()

  useEffect(() => {
      if (!state || !doGTMDataLayerEvents()) return

      if(state.ucmSDK) handleUCMInfoPageLoad(state)
  }, [state])
}
