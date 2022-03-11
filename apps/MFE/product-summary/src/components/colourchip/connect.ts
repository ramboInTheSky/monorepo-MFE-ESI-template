import {connect} from "react-redux"
import State from "../../models/state"
import {setSelectedColourwayAction, setAnimateFavouriteIcon} from "../../ducks/productSummary"

export const mergeProps = (state: State, store: any, ownProps) => ({
    ...state,
    ...ownProps,
    setMatchingColourWay: () => {
        store.dispatch(setSelectedColourwayAction(ownProps.itemNumber))
        store.dispatch(setAnimateFavouriteIcon(false))
    },
})

export default connect(null, null, mergeProps)
