import {connect} from "react-redux"
import State from "../../ducks/state"

export const mapStateToProps = (state: State) => {
    const {queryIds} = state.recents
    const DefaultLimit = 6

    const MaxItems = state.features.SearchBar?.RecentSearch?.MaxItems || DefaultLimit

    const items = queryIds
    .slice()
    .map(item => ({item, url: `${state.request.siteUrl}/search?w=${encodeURIComponent(item)}`}))
    .reverse()
        
    const limitRecentSearches = items?.slice(0, MaxItems)
    return {
        items: limitRecentSearches,
        typedCharacters: state.search.typedCharacters,
    }
}

export default connect(mapStateToProps)
