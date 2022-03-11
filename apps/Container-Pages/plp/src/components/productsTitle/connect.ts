import {connect} from "react-redux"
import {selectSelectedFilterNames} from "../../utils/selectSelectedFilterNames"
import State from "../../models/State"

export const mapStateToProps = (state: State) => ({
    type: state.request.type,
    title: state.search.title,
    relaxedQuery: state.search.relaxedQuery,
    totalResults: state.search.totalResults,
    isAutocorrected: Boolean(state.search.autoCorrectQuery),
    originalSearchTerm: state.request.searchTerm,
    hasSelectedFilters: Boolean(selectSelectedFilterNames(state).length),
    searchBannerHtml: state.search.searchBannerHtml,
    overrideHeading: state.features.overrideSeo?.metadata || false,
    text: state.text
})

export default connect(mapStateToProps)
