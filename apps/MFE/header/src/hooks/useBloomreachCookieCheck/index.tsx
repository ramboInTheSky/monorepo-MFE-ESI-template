import {useEffect, useRef, useCallback} from "react"
import Cookies from "js-cookie"
import {doSearchABAdaptor} from "../../utils/featureSwitch"
import setBloomreachCookie from "../../utils/setBloomreachCookie"
import {BR_COOKIE_COOKIE_CACHING_ID, BR_COOKIE_COOKIE_NAME} from "../../config/constants"
import {useIsOnClient} from "../../utils/useIsOnClient"

interface HookProps {
    cookieDomain: string
    bloomReachCachingCookieList: string
    bloomReachCachingEnabled: boolean
}

const useBloomreachCookieCheck = ({
    cookieDomain,
    bloomReachCachingCookieList,
    bloomReachCachingEnabled,
}: HookProps) => {
    const count = useRef(0)
    const {isOnClient} = useIsOnClient()
    const cookieHandlerCallback = useCallback(
        (intervalId) => {
            const exsitingCookie = Cookies.get(BR_COOKIE_COOKIE_CACHING_ID)

            if (count.current >= 3) {
                clearInterval(intervalId)

                if (!exsitingCookie && Cookies.get(BR_COOKIE_COOKIE_NAME)) {
                    Cookies.remove(BR_COOKIE_COOKIE_NAME)
                }
            } else if (exsitingCookie && doSearchABAdaptor()) {
                setBloomreachCookie(bloomReachCachingCookieList, bloomReachCachingEnabled, cookieDomain)
                count.current = 3
            }

            count.current += 1
        },
        [cookieDomain, bloomReachCachingCookieList, bloomReachCachingEnabled],
    )

    useEffect(() => {
        if (!isOnClient) return

        const intervalId = setInterval(() => {
            cookieHandlerCallback(intervalId)
        }, 3000)

        return () => {
            clearInterval(intervalId)
        }
    }, [isOnClient, bloomReachCachingCookieList, bloomReachCachingEnabled, cookieDomain, cookieHandlerCallback])
}

export default useBloomreachCookieCheck
