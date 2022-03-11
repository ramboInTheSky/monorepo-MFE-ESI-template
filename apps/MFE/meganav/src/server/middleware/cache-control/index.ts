import BFFLogger from "../../core/BFFLogger"
import {SettingsSdkKeys} from "../../../models/settings"

export const hasNumber = myString => {
    return /\d/.test(myString)
}

export const CacheControlMiddleware = (_req, _res: any, _next) => {
    try {
        const ttlOrDirective: string | number = _res.isFallbackMeganav
            ? _res.locals.configuration?.[SettingsSdkKeys.cacheControlFallbackMeganav]?.Value || 120
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
        _res.set("Access-Control-Allow-Origin", "*")
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}

export const SecondaryMeganavCacheControlMiddleware = (_req, _res: any, _next) => {
    try {
        const ttlOrDirective: string | number =
            _res.locals.configuration?.[SettingsSdkKeys.secondaryMeganavCacheControl]?.Value || 540
        if (typeof ttlOrDirective === "string" && !hasNumber(ttlOrDirective)) {
            _res.set("Cache-Control", `public, no-transform, ${ttlOrDirective}`)
        } else {
            _res.set("Cache-Control", `public, no-transform, max-age=${ttlOrDirective}, immutable`)
        }
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}

export default CacheControlMiddleware
