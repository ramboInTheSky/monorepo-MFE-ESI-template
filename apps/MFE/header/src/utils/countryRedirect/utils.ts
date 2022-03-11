import {getWindow} from "../window"

export const fetchRetry = async (apiCall: (retries: number) => Promise<void>, retries = 0) => {
    try {
        if (retries <= 2) {
            await apiCall(retries)
        }
    } catch (err) {
        await fetchRetry(apiCall, retries + 1)
    }
}

export const IsApplicable = () => {
    let isApplicable = true
    const w = getWindow()
    // Country Redirect is not supported on Amazon Silk (Kindle Fire devices)
    if (!w || /\bSilk\b/.test(w.navigator.userAgent)) {
        isApplicable = false
    }

    return isApplicable
}

// Normally use the request duck for query params, but this is a QA test only override
export const GetDevOverrideIpAddress = () => {
    const w = getWindow()
    const regex = new RegExp("[\\?&]ipaddress=([^&#]*)")
    // eslint-disable-next-line no-restricted-globals
    const results = regex.exec(w!.location.search)
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "))
}
