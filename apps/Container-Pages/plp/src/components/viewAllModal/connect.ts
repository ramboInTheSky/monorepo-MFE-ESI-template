import {connect} from "react-redux"
import {applyAllFilters} from "../../ducks/search"
import {setViewAllCloseAction} from "../../ducks/viewAllModal"
import State from "../../models/State"

export const mapStateToProps = (state: State) => {
    const isViewMoreOpen = state.viewAllModal.isOpen
    const title = state.viewAllModal.displayName
    const hideSearchBox = state.viewAllModal.hideSearchFilterModalElements.searchBox
    const hideLetterNav = state.viewAllModal.hideSearchFilterModalElements.letterNav
    const {text} = state
    
    return {
    isViewMoreOpen,
    title,
    hideSearchBox,
    hideLetterNav,
    text
}}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,

    onClose: (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(setViewAllCloseAction())
    },

    onCloseResize: () => {
        dispatch(setViewAllCloseAction())
    },

    onCloseApplyFilter: () => {
        dispatch(applyAllFilters())
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
