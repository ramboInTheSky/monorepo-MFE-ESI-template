import {connect} from "react-redux"
import { State } from "ducks"
import { deleteRecentQueries } from "../../../../ducks/recents"

export const mapStateToProps = (state: State) => {
    const { text: {recentSearches: {simple}}} = state
    return {
        text: simple
    }
}

export const mapDispatchToProps = (dispatch: any) => ({
    clear: () => {
        dispatch(deleteRecentQueries())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)
