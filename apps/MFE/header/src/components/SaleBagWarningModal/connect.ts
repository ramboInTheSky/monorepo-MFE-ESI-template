import {connect} from "react-redux"
import State from "../../ducks/state"
import {getReadOnMainSite, pathToVipSite, updateReadOnMainSite} from "../../utils/saleBagWarning"

export const mapStateToProps = (state: State) => {
    const {
        saleBagWarning: {title, textOne, textTwo, primaryButtonText, secondaryButtonText},
    } = state.text
    const {siteUrl} = state.request
    const openModal = getReadOnMainSite()

    return {
        openModal,
        siteUrl,
        text: {title, textOne, textTwo, primaryButtonText, secondaryButtonText},
        vipSitePath: pathToVipSite(siteUrl),
    }
}

export const mergeProps = (state: any, _dispatch, ownProps) => ({
    ...state,
    ...ownProps,
    remainOnMainSiteAction: () => {
        updateReadOnMainSite()
    },
})

export default connect(mapStateToProps, null, mergeProps)
