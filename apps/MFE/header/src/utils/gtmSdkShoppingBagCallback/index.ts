import getWindow from "../window"
import {doUserVariables} from "../featureSwitch"
import {RPID, ACCOUNT_TYPE, UNLIMITED_CUSTOMER} from "../../config/constants"

export function setBackDataInSession({data}: Record<string, any>) {
    if (doUserVariables()) {
        const {sessionStorage} = getWindow()!

        const {RoamingProfileId, ShoppingBag} = data
        sessionStorage.setItem(RPID, RoamingProfileId)

        if (ShoppingBag.Authenticated) {
            sessionStorage.setItem(ACCOUNT_TYPE, ShoppingBag.AccountType)
            sessionStorage.setItem(UNLIMITED_CUSTOMER, (ShoppingBag.NextUnlimitedStatus !== 0).toString())
        }
    }
}
