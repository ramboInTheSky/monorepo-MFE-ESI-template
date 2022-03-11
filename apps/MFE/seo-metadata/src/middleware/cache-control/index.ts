import BFFLogger from "../core/BFFLogger"
import {SettingsSdkKeys} from "../../models/Settings"

export const CacheControlMiddleware = (_req, _res: any, _next) => {
    try {
        const cacheControlValue = _res.locals.configuration?.[SettingsSdkKeys.CacheControl]?.Value || 604800

        _res.set("Cache-Control", `max-age=${cacheControlValue}`)
    } catch (err) {
        BFFLogger.error(err)
    }
    _next()
}
