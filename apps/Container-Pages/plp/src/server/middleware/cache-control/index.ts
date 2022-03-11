import BFFLogger from "../../core/BFFLogger"
import {SettingsSdkKeys} from "../../../models/settings"
import {SEARCH_CATEGORY_SEGMENT} from "../../../config/constants"
import {hasNumber} from "../../../utils/hasNumber"

export const CacheControlMiddleware = (_req, _res: any, _next) => {
    const isShop = _req.originalUrl.substring(1, 5) === SEARCH_CATEGORY_SEGMENT
    try {
        const ttlOrDirective: string | number = isShop
            ? _res.locals.configuration?.[SettingsSdkKeys.ShopCacheControl]?.Value || 3600
            : _res.locals.configuration?.[SettingsSdkKeys.SearchCacheControl]?.Value || "no-store"
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
        _res.set("Cache-Control", "public no-transform max-age=604800")
        _res.set("Access-Control-Allow-Origin", "*") // tactical solution this should bedone by NginX
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}

export default CacheControlMiddleware
