import {connect} from "react-redux"

import {replaceText} from "@monorepo/utils"
import logger from "@monorepo/core-logger"

import {State} from "../../../ducks"
import {UserDuckState} from "../../../ducks/user"
import {REPLACE_USERNAME} from "../../../config/constants"

interface ConnectMergeProps {
    user: UserDuckState
}

export const mapStateToProps = (state: State) => ({user: state.user})

export const mergeProps = (state: Partial<ConnectMergeProps>, _, ownProps) => {
    let setData

    if (state?.user?.loggedIn) {
        let firstName
        const {text} = ownProps.loggedIn

        // eslint-disable-next-line @typescript-eslint/prefer-includes
        if (text.indexOf(REPLACE_USERNAME) === -1) {
            logger.error("INVALID QUICKLINKS LOGOUT TEXT JSON - Does not contain <username>")
            firstName = state.user.accountFirstName
        } else firstName = replaceText(text, state.user.accountFirstName, /<username>/)

        setData = {
            ...ownProps.loggedIn,
            text: firstName,
        }
    } else {
        setData = ownProps.loggedOut
    }

    const quickLinkData = {
        ...setData,
    }
    return quickLinkData
}

export default connect(mapStateToProps, {}, mergeProps)
