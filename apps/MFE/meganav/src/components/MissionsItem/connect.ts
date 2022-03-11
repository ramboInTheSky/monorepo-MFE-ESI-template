import {connect} from "react-redux"
import State from "../../ducks/state"
import {prefixImagePath} from "../../utils/prefixPath"

export type MissionItemProps = {
    imageUrl: string
    title: string
    department: string
}

export const mapStateToProps = (state: State, ownProps: MissionItemProps) => {
    const imageUrl: string = prefixImagePath(state.request.siteUrl)(ownProps.imageUrl)
    const {siteUrl} = state.request
    return {
        ...ownProps,
        siteUrl,
        imageUrl,
    }
}

export default connect(mapStateToProps)
