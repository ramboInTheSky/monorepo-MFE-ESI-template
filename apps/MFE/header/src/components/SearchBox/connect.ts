import Cookies from "js-cookie"
import {connect} from "react-redux"
import State from "../../ducks/state"
import {typing, search, openDrawer} from "../../ducks/search"
import {createRecentQuery} from "../../ducks/recents"
import {getAutoCompleteThunk, BR_UID_2} from "../../ducks/autocomplete"
import {getCookieValue} from "../../utils/cookies"
import urls from "../../config/urls"
import {PublishToModalsClosed} from "../../events/modalsClosed"

export const mapStateToProps = (state: State) => {
    const autocompleteParameters = state.autocomplete.parameters
    const cookie = state.request?.headers?.cookie
    const realm = state.data?.realm.toLowerCase() as string
    const {variant} = state.settings
    const {
        text: {searchBox},
    } = state
    return {
        text: searchBox,
        cookie,
        autocompleteParameters,
        backgroundImage: urls.searchBox.searchInputButtonUrl(realm, variant),
        siteUrl: state.request.siteUrl,
        typedCharacters: state.search.typedCharacters,
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
        handleClick: (searchTerm: string) => {
            dispatch(createRecentQuery(searchTerm))
            dispatch(search(stateProps.siteUrl, searchTerm))
        },
        typing: (chars: string) => dispatch(typing(chars)),
        autocompleteTyping: (chars: string) => {
            const {accountId, domainKey, authKey} = stateProps.autocompleteParameters
            const {cookie} = stateProps
            const uid2 = getCookieValue(BR_UID_2, cookie) || Cookies.get(BR_UID_2)
            dispatch(getAutoCompleteThunk(chars, accountId, domainKey, authKey, uid2))
        },
        openDrawer: () => {
            PublishToModalsClosed()
            return dispatch(openDrawer())
        },
    }
}

export default connect(mapStateToProps, null, mergeProps)
