import {connect} from "react-redux"
import Cookies from "js-cookie"
import {getCookieValue} from "../../../../utils/cookies"
import {getAutoCompleteThunk, BR_UID_2} from "../../../../ducks/autocomplete"
import {State} from "../../../../ducks"

export const mapStateToProps = (state: State) => {
    const {parameters, numFound, suggestions, isLoading} = state.autocomplete
    const cookie = state.request?.headers?.cookie
    const {text: {autoComplete}} = state

    return {
        text: autoComplete,
        typedCharacters: state.search.typedCharacters,
        isLoading,
        parameters,
        numFound,
        suggestions,
        cookie,
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
        getAutoCompleteThunk: (term: string) => {
            const {accountId, domainKey, authKey} = stateProps.parameters
            const {cookie} = stateProps
            const uid2 = getCookieValue(BR_UID_2, cookie) || Cookies.get(BR_UID_2)
            const updateProductsOnly = true
            dispatch(getAutoCompleteThunk(term, accountId, domainKey, authKey, uid2, updateProductsOnly))
        },
    }
}

export default connect(mapStateToProps, null, mergeProps)
