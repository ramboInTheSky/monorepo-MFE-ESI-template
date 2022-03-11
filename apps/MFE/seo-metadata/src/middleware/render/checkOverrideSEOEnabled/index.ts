import {Request, Response, NextFunction} from "express"
import BFFLogger from "../../core/BFFLogger"
import {SettingsSdkKeys} from "../../../models/Settings"

import fallbackSeo from "../fallbackSEO"

const checkOverrideSEOEnabled = (_req: Request, res: Response, next: NextFunction) => {
    try {
        const isSEOEnabled = res.locals.configuration?.[SettingsSdkKeys.Enabled]?.Value

        if (!isSEOEnabled) {
            return fallbackSeo(res)
        }

        next()
    } catch {
        BFFLogger.warn("SEO Metadata UI - defaulting seo metadata and seo heading to false as there is no config")
        return fallbackSeo(res)
    }
}

export default checkOverrideSEOEnabled
