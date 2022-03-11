import {connect} from "react-redux"
import {replaceText} from "@monorepo/utils"
import {formatCdnPathWithVariant} from "../../utils/getCdnUrl"
import {SupportedRegionTypes} from "../../models/regions"
import {SUPPORTED_MY_ACCOUNT_TYPES} from "../../config/constants"
import urls from "../../config/urls"
import {State} from "../../ducks"
import {updateUserStatus} from "../../ducks/user"

export const mapStateToProps = (state: State) => {
    const {
        user,
        data,
        request: {siteUrl},
        text: {myAccount},
        settings,
    } = state

    const realm = data?.realm as string
    const isLoggedIn = user.loggedIn
    const {firstName, userUpdated} = user
    const {variant} = settings

    const quickLinks = data?.regions
        ?.filter(region => region.type === SupportedRegionTypes.QuickLinks)[0]
        ?.elements?.filter(link => link.type === "MyAccount")[0].elements

    const reducedState: any = quickLinks?.reduce((acc, next) => {
        if (next.type === SUPPORTED_MY_ACCOUNT_TYPES.loggedIn) {
            return {
                ...acc,
                loggedIn: {
                    ...next,
                    text: replaceText(next.text as string, firstName, /<username>/),
                    tooltip: replaceText(next.tooltip as string, firstName, /<username>/),
                },
            }
        }
        if (next.type === SUPPORTED_MY_ACCOUNT_TYPES.loggedOut) {
            return {...acc, loggedOut: {...next, text: next.text}, tooltip: ""}
        }
        return acc
    }, {})

    const result = isLoggedIn ? reducedState.loggedIn : reducedState.loggedOut
    const loggedInMyAccountText = userUpdated ? reducedState.loggedIn.text : ""
    const loggedOutMyAccountText = userUpdated ? reducedState.loggedOut.text : ""
    const myAccountText = loggedInMyAccountText || loggedOutMyAccountText

    return {
        accessibilityText: result.accessibilityText,
        isLoggedIn: state.user.loggedIn,
        narrowModeIcon: formatCdnPathWithVariant(result.narrowModeIcon, realm, variant),
        signoutUrl: `${siteUrl}${urls.myAccount.signoutUrl}`,
        tooltipIcon: urls.myAccount.tooltipIconUrl(realm, variant),
        url: `${siteUrl}${urls.myAccount.loginUrl}`,
        myAccountText,
        wideModeIcon: formatCdnPathWithVariant(result.wideModeIcon, realm, variant),
        firstName,
        userUpdated,
        text: myAccount,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    updateShoppingBag: (data: any) => {
        dispatch(updateUserStatus(data))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
