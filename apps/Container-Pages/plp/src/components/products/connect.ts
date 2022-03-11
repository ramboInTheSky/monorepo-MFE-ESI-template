import {connect} from "react-redux"
import State from "../../models/State"

import {
    fixFacets,
    unfixFacets,
    selectHasNextPage,
    selectHasPreviousPage,
    fetchNextPageItemsThunk,
    fetchPreviousPageItemsThunk,
} from "../../ducks/search"
import {pushSearchResultsEvent} from "../../utils/pushSearchResultsEvent"
import {selectFetchTriggerOffset, selectSubsequentItemsPerPage} from "../../ducks/search/utils"
import {selectSelectedFilterNames} from "../../utils/selectSelectedFilterNames"

const mapStateToProps = (state: State) => ({
    items: state.search.items,
    endPage: state.search.endPage,
    startPage: state.search.startPage,
    itemsPerPage: selectSubsequentItemsPerPage(state),
    hasNextPage: selectHasNextPage(state),
    requestedPage: state.request.page,
    hasPreviousPage: selectHasPreviousPage(state),
    isFetchingNextPage: state.search.isFetchingNextPage,
    isFetchingPreviousPage: state.search.isFetchingPreviousPage,
    isFetchingPageItems: state.search.isFetchingPageItems,
    siteUrl: state.request.siteUrl,
    useDevEsi: state.request.useDevEsi,
    fetchTriggerOffset: selectFetchTriggerOffset(state),
    isAutocorrected: Boolean(state.search.autoCorrectQuery),
    hasSelectedFilters: Boolean(selectSelectedFilterNames(state).length),
    text: state.text,
    url: state.request.url,
    searchCategoryId: state.search.searchCategory.id,
    searchCategoryName: state.search.searchCategory.name,
})

const mapDispatchToProps = {
    fixFacets,
    unfixFacets,
    fetchNextPage: fetchNextPageItemsThunk,
    fetchPreviousPage: fetchPreviousPageItemsThunk,
    pushSearchResultsEvent: () => (_dispatch, getState) => {
        pushSearchResultsEvent(getState())
    },
}

export default connect(mapStateToProps, mapDispatchToProps)
