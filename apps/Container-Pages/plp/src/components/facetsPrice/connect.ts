import {connect} from "react-redux"
import {setSelectedPriceFilterAction} from "../../ducks/search"
import {searchForSelectedPrice} from "../../ducks/tabbedFilters"
import State from "../../models/State"
import getLocaleFromHeaders from "../../utils/getLocaleFromHeaders"
import getRealmFromHeaders from "../../utils/getRealmFromHeaders"
import {FilterPrice} from "../../models/Filter"

export const mapStateToProps = (state: State, ownProps: any) => {
    const facet = state.search.filters[ownProps.name] as FilterPrice
    const {headers} = state.request
    const locale = getLocaleFromHeaders(headers)
    const realm = getRealmFromHeaders(headers)
    const {text} = state
    return {
        min: facet.min,
        max: facet.max,
        selectedMin: facet.selectedMin,
        selectedMax: facet.selectedMax,
        currencyCode: facet.currencyCode,
        locale,
        realm,
        text
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    updatePriceFilters: (selectedMin: number, selectedMax: number) => {
        if (ownProps.isTabbedFilter) {
            dispatch(searchForSelectedPrice(ownProps.name, selectedMin, selectedMax))
        } else {
            dispatch(setSelectedPriceFilterAction(ownProps.name, selectedMin, selectedMax))
        }
    },
})

export default connect(mapStateToProps, null, mergeProps)
