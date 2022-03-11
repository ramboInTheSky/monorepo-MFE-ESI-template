import BFFLogger from "../../core/BFFLogger"
import {SettingsSdkKeys} from "../../../config/settings"

export const hasNumber = myString => {
    return /\d/.test(myString)
}

export const CacheControlMiddleware = (_req, _res: any, _next) => {
    try {
        const ttlOrDirective: string | number = _res.isDefaultReviewStars
            ? _res.locals.configuration?.[SettingsSdkKeys.cacheControlDefault]?.Value || 120
            : _res.locals.configuration?.[SettingsSdkKeys.cacheControl]?.Value || 3600
        if (typeof ttlOrDirective === "string" && !hasNumber(ttlOrDirective)) {
            _res.set("Cache-Control", `public, no-transform, ${ttlOrDirective}`)
        } else {
            _res.set("Cache-Control", `public, no-transform, max-age=${ttlOrDirective}`)
        }
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}

export default CacheControlMiddleware
