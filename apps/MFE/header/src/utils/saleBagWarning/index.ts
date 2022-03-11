import Cookies from "js-cookie"

const cookieName = "AmidoSaleBagWarning"
const readOnMainSite = "readOnMainSite"
const vipPath = "/eoss"

export const updateReadOnMainSite = () => {
    const value = Cookies.get(cookieName)
    if (!value) return false
    const replaceValue = value.replace(`${readOnMainSite}=False`, `${readOnMainSite}=True`)
    Cookies.set(cookieName, replaceValue)
}

export const getReadOnMainSite = (): boolean => {
    const value = Cookies.get(cookieName)
    if (!value) return false
    const splitValue = value.split("&").filter(key => key.includes(readOnMainSite))
    if (splitValue && splitValue.length > 0) {
        const splitEachVal = splitValue[0].split("=")
        return splitEachVal[1] === "False"
    }
    return false
}

export const pathToVipSite = (siteUrl: string) => `${siteUrl}${vipPath}`
