import {connect} from "react-redux"
import State from "../../ducks/state"
import {setIsInPrimaryNav, setPrimaryNavIndex} from "../../ducks/primary-nav"
import {setIsInSecondaryMeganav} from "../../ducks/secondary-nav"

type Anchor = "top" | "bottom" | "left" | "right"

export const mapStateToProps = (state: State) => {
    const {isInPrimaryNav} = state.primarynav
    const {isInSecondaryNav} = state.secondarynav
    const open = state.primarynav.active
    let anchor: Anchor = "left"
    const isLastItem = state.primarynav.activeDepartmentIndex >= state.primarynav.items.length - 1
    if (isLastItem) {
        anchor = "right"
    }
    return {
        anchor,
        open,
        isInSecondaryNav,
        isInPrimaryNav,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        deactivateIndex: () => {
            dispatch(setPrimaryNavIndex(-1, ""))
            dispatch(setIsInSecondaryMeganav(false))
            dispatch(setIsInPrimaryNav(false))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)
