import {connect} from "react-redux"
import State from "../../models/State"
import {setPageItemsThunk} from "../../ducks/search"

export const mapStateToProps = ({search, text}: State) => {
    const {startPage} = search
    return {
        startPage,
        text
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    loadFirstPage: (historyUrl: string) => {
        dispatch(setPageItemsThunk({
            historyUrl,
            enableDebounce: false
        }))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)