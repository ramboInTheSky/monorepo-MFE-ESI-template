import {connect} from "react-redux"
import {State} from "../../ducks"
import {createRecentQuery} from "../../ducks/recents"
import {search, getPlpUrl} from "../../ducks/search"

export const mapStateToProps = (state: State) => {
    const {suggestions} = state.autocomplete
    const {siteUrl} = state.request
    const {typedCharacters} = state.search

    const DefaultLimit = 10

    const MaxItems = state.features.SearchBar?.Autocomplete?.MaxItems || DefaultLimit

    const limitSuggestions = suggestions?.slice(0, MaxItems)

    return {
        suggestions: limitSuggestions,
        term: typedCharacters,
        siteUrl,
    }
}

// stateProps is the result of mapStateToProps
// {dispatch}  is the object resultingfrom mapDispatchToProps
// ownProps is the container component own props
export const mergeProps = (stateProps: any, {dispatch}: any, ownProps: any) => {
    return {
        ...stateProps,
        dispatch,
        ...ownProps,
        handleSuggestionClick: (suggestion: string): void => {
            dispatch(createRecentQuery(suggestion))
            dispatch(search(stateProps.siteUrl, suggestion))
        },
        getConnectedPlpUrl: (suggestion: string) => getPlpUrl(stateProps.siteUrl)(suggestion),
    }
}

export default connect(mapStateToProps, null, mergeProps)
