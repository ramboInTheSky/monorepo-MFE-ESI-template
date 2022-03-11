import {getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "../../core/BFFLogger"
import axios from "../../core/xhr"
import env from "../../../config/env"
import {SettingsSdkKeys} from "../../../models/settings"
import {VARIANT_DEFAULT} from "../../../config/constants"

/**
 * @see {@link https://dev.azure.com/Amido-Ecommerce/Amido.Ecommerce.UI/_wiki/wikis/Amido.Ecommerce.UI.wiki/5657/Theme-middleware-with-different-theme-variants} for further information.
 */
const themeMiddleware = (cache: any) => async (req, _res: any, nextOp) => {
    try {
        const ttl = _res.locals.configuration ? _res.locals.configuration[SettingsSdkKeys.appCache]?.Value : 0
        const themeVersion = _res.locals.configuration
            ? _res.locals.configuration[SettingsSdkKeys.themeVersion]?.Value
            : "v1.0.0"
        const variantSetting = _res.locals.configuration
            ? _res.locals.configuration[SettingsSdkKeys.variant]?.Value
            : VARIANT_DEFAULT
        const variant = variantSetting.toLowerCase() === VARIANT_DEFAULT ? "" : `_${variantSetting.toLowerCase()}`
        const getThemeUrl = realm =>
            `${env.REACT_APP_BLOB_STORAGE_SSR_BASEURL}${
                env.REACT_APP_BLOB_STORAGE_PATH
            }/theme/${themeVersion}/${realm.toLowerCase()}${variant}_theme.json`
        let realm = "amido"
        try {
            realm = getSettingsHeadersAsObject(req.headers).realm as string
        } catch {
            BFFLogger.warn("Error getting realm, defaulting to amido")
        }

        let theme = cache.get(getThemeUrl(realm))
        if (!theme) {
            try {
                const {data} = await axios.get(getThemeUrl(realm))
                theme = data
                cache.set(getThemeUrl(realm), theme, ttl ?? 0)
            } catch (err) {
                BFFLogger.warn(`Error getting realm ${realm}, defaulting to amido`)
                try {
                    theme = cache.get(getThemeUrl("amido"))
                } catch (error) {
                    throw new Error(error)
                }
            }
        }
        req.theme = theme
        req.themeVersion = themeVersion
        nextOp()
    } catch (err) {
        BFFLogger.error(err)
    }
}

export default themeMiddleware
