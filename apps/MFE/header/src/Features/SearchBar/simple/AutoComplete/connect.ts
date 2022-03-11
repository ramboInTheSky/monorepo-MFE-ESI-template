import {connect} from "react-redux"
import {State} from "../../../../ducks"
import {getPlpUrl} from "../../../../ducks/search"

export const mapStateToProps = (state: State) => {
    const {q, numFound, suggestions, isLoading} = state.autocomplete
    const {siteUrl} = state.request
    const { text: {autoComplete} } = state
    return {
        text: autoComplete,
        typedCharacters: state.search.typedCharacters,
        siteUrl,
        term: q,
        numFound,
        suggestions,
        isLoading,
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
        getConnectedPlpUrl: (suggestion: string) => getPlpUrl(stateProps.siteUrl)(suggestion),
    }
}

export default connect(mapStateToProps, null, mergeProps)
