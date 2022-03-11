import fs from "fs"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import path from "path"
import {SettingsSdkKeys} from "../../../models/settings"
import BFFLogger from "../../core/BFFLogger"

const getStyle = async (styleUrl: string): Promise<any> => {
    try {
        const styles = await fs.promises.readFile(styleUrl)
        return JSON.parse(styles.toString())
    } catch (error) {
        throw new Error(error)
    }
}

export const styleMiddleware = (cache: any) => async (req, _res: any, nextOp) => {
    try {
        const ttl = _res.locals.configuration ? _res.locals.configuration[SettingsSdkKeys.appCache]?.Value : 0
        let realm = "amido"
        try {
            realm = getSettingsHeadersAsObject(req.headers).realm as string
        } catch {
            BFFLogger.warn("Error getting realm, defaulting to next")
        }

        const style =
            _res.locals.configuration && _res.locals.configuration[SettingsSdkKeys.style]?.Value
                ? _res.locals.configuration[SettingsSdkKeys.style]?.Value
                : realm

        const publicPath = path.join(__dirname, "/public")
        const getStyleUrl = (styleName: string) => `${publicPath}/styles/${styleName}-style-settings.json`

        let styles = cache.get(getStyleUrl(style))
        if (!styles) {
            try {
                const styleUrl = getStyleUrl(style)
                styles = await getStyle(styleUrl)
                cache.set(styleUrl, styles, ttl ?? 0)
            } catch (err) {
                BFFLogger.warn("Error getting styles. Defaulting to next.")
                try {
                    styles = cache.get(getStyleUrl("next"))
                } catch (error) {
                    throw new Error(error)
                }
            }
        }

        req.styles = styles
        nextOp()
    } catch (err) {
        BFFLogger.error(err)
    }
}
