import BFFLogger from "../../core/BFFLogger"
import {SettingsSdkKeys} from "../../../models/settings"

export const hasNumber = myString => {
    return /\d/.test(myString)
}

export const CacheControlMiddleware = (_req, _res: any, _next) => {
    try {
        const ttlOrDirective: string | number = _res.isDefaultHeader
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

export const StaticAssetsCacheControlMiddleware = (_req, _res: any, _next) => {
    try {
        _res.set("Cache-Control", `public, no-transform, max-age=604800, immutable`)
        _res.set("Access-Control-Allow-Origin", "*") // tactical solution this should bedone by NginX
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}


export default CacheControlMiddleware
