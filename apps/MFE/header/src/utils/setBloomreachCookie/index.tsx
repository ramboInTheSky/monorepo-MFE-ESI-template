import Cookies from "js-cookie"
import logger from "@monorepo/core-logger"

import {
    BR_COOKIE_COOKIE_PARTS_LENGTH,
    BR_COOKIE_COOKIE_UID_PARTS,
    BR_COOKIE_COOKIE_UID_LENGTH,
    BR_COOKIE_COOKIE_FULL_RANGE,
    BR_COOKIE_COOKIE_NAME,
    BR_COOKIE_COOKIE_CACHING_ID,
    BR_COOKIE_COOKIE_NUMBER_OF_DAYS,
} from "../../config/constants"

const setBloomreachCookie = (
    bloomReachCachingCookieList: string,
    bloomReachCachingEnabled: boolean,
    cookieDomain: string,
) => {
    try {
        const isEnabled = bloomReachCachingEnabled
        const bruidCookie = Cookies.get(BR_COOKIE_COOKIE_CACHING_ID)
        const cookieJarSplit = bloomReachCachingCookieList.split(",")
        const cookieName = BR_COOKIE_COOKIE_NAME
        const numberOfDays = BR_COOKIE_COOKIE_NUMBER_OF_DAYS

        if (
            isEnabled &&
            bruidCookie !== null &&
            bruidCookie !== undefined &&
            cookieJarSplit !== null &&
            cookieJarSplit !== undefined &&
            cookieJarSplit.length > 1
        ) {
            const parts = decodeURIComponent(bruidCookie).split(":")

            // Extract the Bloomreach user identifier (uid).
            if (parts !== null && parts !== undefined && parts.length === BR_COOKIE_COOKIE_PARTS_LENGTH) {
                const uid = parts[0].split("=")
                if (
                    uid !== null &&
                    uid !== undefined &&
                    uid.length === BR_COOKIE_COOKIE_UID_PARTS &&
                    uid[1].length > BR_COOKIE_COOKIE_UID_LENGTH
                ) {
                    // Check the last 2 digits of the UID and select the appropriate cookie.
                    const check = parseInt(uid[1].substr(uid[1].length - BR_COOKIE_COOKIE_UID_LENGTH), 10)
                    const segment = Math.floor(BR_COOKIE_COOKIE_FULL_RANGE / cookieJarSplit.length)
                    let index = Math.floor(check / segment)

                    if (index <= 0 || index >= cookieJarSplit.length) index = 0
                    Cookies.set(cookieName, cookieJarSplit[index], {expires: numberOfDays, domain: cookieDomain})
                }
            }
        } else {
            Cookies.remove(cookieName)
        }
    } catch (error) {
        logger.error(error)
    }
}

export default setBloomreachCookie
