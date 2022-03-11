import {connect} from "react-redux"
import {setPrimaryNavIndex, setIsInPrimaryNav} from "../../ducks/primary-nav"

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    closeNav: (e: any): void => {
        if (e.currentTarget.scrollLeft !== 0) {
            dispatch(setPrimaryNavIndex(-1, ""))
            dispatch(setIsInPrimaryNav(false))
        }
    },
})

export default connect(null, null as any, mergeProps)
