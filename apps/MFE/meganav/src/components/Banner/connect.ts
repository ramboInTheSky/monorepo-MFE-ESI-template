import {connect} from "react-redux"
import State from "../../ducks/state"
import {prefixImagePath} from "../../utils/prefixPath"

export const mapStateToProps = (state: State) => {
    const {activeDepartment} = state.primarynav
    const {catalogues} = state.secondarynav
    const {banner} = catalogues[activeDepartment]
    const {text} = state
    const {siteUrl} = state.request
    const imageUrl: string = prefixImagePath(siteUrl)(banner?.imageUrl)
    return {
        imageUrl,
        target: banner?.target || null,
        text: { bannerAltText: text.bannerAltText},
        siteUrl
    }
}

export default connect(mapStateToProps)
