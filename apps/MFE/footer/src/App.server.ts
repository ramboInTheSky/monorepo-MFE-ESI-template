import {Store} from "redux"
import {updateText} from "./ducks/text"
import BFFLogger from "./server/core/BFFLogger"
import getTextAlignment from "./utils/getTextAlignment"
import {isSettingsError} from "./utils/setApiUrlSettings"
import {setLanguageSettings} from "./utils/languageSelector"
import {getSettings} from "./utils/getSettings"
import {updateTextAlignment} from "./ducks/text-alignment"
import {setRequestAction as updateRequest} from "./ducks/request"
import {getServerSideProps as footerGetServerSideProps} from "./compositions/footer/index.server"
import {SITE_URL_HEADER} from "./config/constants"
import {SettingsSdkKeys} from "./models/settings"
import {updateSettings} from "./ducks/settings"

export const getServerSideProps = async (req, res, store: Store) => {
    try {
        if (isSettingsError(res.locals.configuration)) {
            // save text to state
            updateText(store, req.text)

            BFFLogger.warn(`Footer called with bad settings: ${res.locals.configuration}`)
            return {isConfError: true}
        }

        const textAlignment = getTextAlignment(res.locals.configuration)
        updateStates(store, res, req)

        const ssrProps = await footerGetServerSideProps(req, res, store)
        setLanguageSettings(store, res.locals.configuration, res.req.headers[SITE_URL_HEADER])
        updateSettings(store, getSettings(res.locals.configuration))

        const themeColours = req.theme
        const themeVersion = res.locals.configuration[SettingsSdkKeys.themeVersion]?.Value
        const realm = res.locals.configuration[SettingsSdkKeys.realm]?.Value

        return {...ssrProps, themeVersion, textAlignment, realm, themeColours}
    } catch (err) {
        BFFLogger.error(new Error(err))
        return {isConfError: true}
    }
}

const updateStates = (store, res, req) => {
    updateTextAlignment(store, res.locals.configuration)
    updateRequest(store, res.req)
    updateText(store, req.text)
}
export default getServerSideProps
