import {connect} from "react-redux"
import {setFilter, setViewMoreIsOpenThunk} from "../../ducks/search"
import {setViewAllOpen} from "../../ducks/viewAllModal"
import {
    FILTERS_SHOW_VIEW_ALL_COUNT,
    ViewLinkOptions,
    FILTERS_SHOW_VIEW_MORE_COUNT,
    FILTERS_SHOW_VIEW_MORE_COUNT_EXTENDED,
} from "../../config/constants"
import State from "../../models/State"
import {FilterFacet} from "../../models/Filter"
import TrackIsViewMoreTriggeredFilter from "../../events/trackEvent/events/trackIsViewMoreTriggeredFilter"
import TrackIsViewLessTriggeredFilter from "../../events/trackEvent/events/trackIsViewLessTriggeredFilter"

export const isAnySelectedFilterOutOfView = (filters, facetsObj) => {
    if (facetsObj) {
        const slicedFilters = filters.slice(FILTERS_SHOW_VIEW_MORE_COUNT)
        const onlySelectedValues = (filter: string) => facetsObj[filter]?.s === true
        const arrayOfWorkableSelections = slicedFilters.filter(onlySelectedValues)
        return arrayOfWorkableSelections.length > 0
    }
    return false
}

export const mapStateToProps = (state: State, ownProps: any) => {
    const {facets, isViewMoreOpen} = state.search.filters[ownProps.facetName] as FilterFacet
    const {facets: facetsObj, isFetchingPageItems} = state.search
    if (!facets) return {}

    let viewLink: ViewLinkOptions
    switch (true) {
        case facets.length > FILTERS_SHOW_VIEW_ALL_COUNT:
            viewLink = ViewLinkOptions.viewAll
            break
        case facets.length > FILTERS_SHOW_VIEW_MORE_COUNT:
            viewLink = ViewLinkOptions.viewMore
            break
        default:
            viewLink = ViewLinkOptions.none
    }

    const isViewAll = viewLink === ViewLinkOptions.viewAll

    const firstFilters = facets.slice(
        0,
        isViewAll && isAnySelectedFilterOutOfView(facets, facetsObj)
            ? FILTERS_SHOW_VIEW_MORE_COUNT_EXTENDED
            : FILTERS_SHOW_VIEW_MORE_COUNT,
    )
    const lastFilters = facets.slice(FILTERS_SHOW_VIEW_MORE_COUNT, FILTERS_SHOW_VIEW_ALL_COUNT)

    const {text} = state

    return {viewLink, firstFilters, lastFilters, isViewMoreOpen, facets: facetsObj, isFetchingPageItems, text}
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    toggleViewMore: () => {
        dispatch(setViewMoreIsOpenThunk(!state.isViewMoreOpen, ownProps.facetName))
        if(state.isViewMoreOpen) {
            TrackIsViewLessTriggeredFilter(ownProps.facetName)
        } else {
            TrackIsViewMoreTriggeredFilter(ownProps.facetName)
        }
    },
    openViewAllModal: () => {
        dispatch(setViewAllOpen(ownProps.facetName))
    },
    handleSetFilter: (filterValue: string): void => {
        dispatch(setFilter(filterValue))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
