import {connect} from "react-redux"
import {CompositionSettingsDuckState, setCompositionSettingsAction} from "../../../ducks/compositionSettings"

export const mapDispatchToProps = dispatch => {
    const compositionSettings: CompositionSettingsDuckState = {
        showSecondaryNavArrow: true,
    }
    return {
        setCompositionSettings: () => dispatch(setCompositionSettingsAction(compositionSettings)),
    }
}
export default connect(null, mapDispatchToProps)
