import {connect} from "react-redux"
import {setBrandName} from "../../../ducks/tabbedFilters"
import State from "../../../models/State"
import {FilterFacet} from "../../../models/Filter"
import filterThroughBrands from "../../../utils/filterThroughBrands"

const mapStateToProps = (state: State) => {
    const {facets} = state.tabbedFilters.filters.brand as FilterFacet
    const {brandSearch} = state.tabbedFilters
    const filtersBrand = filterThroughBrands(brandSearch, facets)
    const {text} = state

    return {
        brandSearch,
        filtersBrand,
        text
    }
}

export const mapDispatchToProps = {
    setBrandNameForSearch: (e: React.SyntheticEvent) => setBrandName(e),
}

export default connect(mapStateToProps, mapDispatchToProps)
