import { IS_BROWSER } from "../window"

/* eslint-disable @typescript-eslint/prefer-string-starts-ends-with */
export const configRelativePathURL = (url: string, siteUrl: string): string => {
    if (!url) return ""
    const validUrl = `${siteUrl}${url}`
    if (isRelativePath(url)) {
        return IS_BROWSER() && window.location.host.includes("account") ? validUrl : removeHostFromURL(validUrl)
    }
    return url
}

const removeHostFromURL = (target: string) => {
    try {
        const Url = new URL(target)
        return `${Url.pathname}${Url.search}`
    } catch {
        return target
    }
}

const isRelativePath = url => url.charAt(0) === "/" && url.charAt(1) !== "/"

export default configRelativePathURL
