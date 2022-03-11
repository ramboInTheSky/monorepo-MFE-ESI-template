import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => {
    const {bag} = state.shoppingBag
    const {
        text: {miniShoppingBag},
    } = state
    return {
        text: miniShoppingBag,
        bag,
    }
}

export default connect(mapStateToProps)
