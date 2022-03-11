import {connect} from "react-redux"
import { State } from "ducks"
import {deleteRecentQueries} from "../../../../ducks/recents/index"

export const mapStateToProps = (state: State) => {
    const {text: {recentSearches: {enriched}}} = state

    return {
        text: enriched,
    }
}

export const mapDispatchToProps = (dispatch: any) => ({
    clear: () => {
        dispatch(deleteRecentQueries())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)
