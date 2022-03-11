import {connect} from "react-redux"
import {setUser} from "../../ducks/user"
import {State} from "../../ducks"

export const mapStateToProps = (state: State) => {
    const {altLanguageUrl, altLanguageName} = state.languages
    const showLangSelector: boolean = !!altLanguageUrl && !!altLanguageName

    return {
        user: state.user,
        showLangSelector,
    }
}

export const mergeProps = (state: Partial<State>, store: any, ownProps: any) => {
    return {
        ...state,
        ...ownProps,
        accountStatusChanged: (accountFirstName: string) =>
            store.dispatch(setUser({accountFirstName, loggedIn: !!accountFirstName})),
    }
}

export default connect(mapStateToProps, null, mergeProps)
