import {getSettingsHeadersAsObject} from "@monorepo/utils"
import {Store} from "redux"
import getConfigurationValue from "./utils/getConfigurationValue"
import {updateText} from "./ducks/text"
import {getSettings} from "./utils/getSettings"
import BFFLogger from "./server/core/BFFLogger"
import {isSettingsError} from "./utils/setApiUrlSettings"
import {setRequestAction as updateRequest} from "./ducks/request"
import {getServerSideProps as primarynavGetServerSideProps} from "./compositions/meganav/index.server"
import getTextAlignment from "./utils/getTextAlignment"
import {updateTextAlignment} from "./ducks/text-alignment"
import {setDefaultConfig as setPrimaryDefaultVersion} from "./ducks/primary-nav"
import {updateImagePlaceholderSettings, setDefaultConfig as setSecondaryDefaultVersion} from "./ducks/secondary-nav"
import {SettingsSdkKeys} from "./models/settings"
import {updateSettings} from "./ducks/settings"

const updateStates = (store: Store, conf, res, req) => {
    updateText(store, req.text)
    updateTextAlignment(store, conf)
    updateRequest(store, res.req)
    updateSettings(store, getSettings(res.locals.configuration))
    updateImagePlaceholderSettings(store, conf)
    setPrimaryDefaultVersion(store, conf[SettingsSdkKeys.defaultPrimaryConfig])
    setSecondaryDefaultVersion(store, conf[SettingsSdkKeys.defaultSecondaryConfig])
}

export const getServerSideProps = async (req, res, store: Store) => {
    try {
        let realm: string
        try {
            const headers = getSettingsHeadersAsObject(res.req.headers)
            realm = (headers?.realm as string)?.toLowerCase()
        } catch (e) {
            const errorMessage = `Meganav called with bad headers: ${res.req.headers}`
            BFFLogger.error(errorMessage)
            throw new Error(errorMessage)
        }
        if (isSettingsError(res.locals.configuration)) {
            const errorMessage = `Meganav: No configuration found on feature settings ${res.locals.configuration}`
            BFFLogger.error(errorMessage)
            throw new Error(errorMessage)
        }
        const themeColours = req.theme
        const textAlignment = getTextAlignment(res.locals.configuration)
        const template = getConfigurationValue(res.locals.configuration, SettingsSdkKeys.template, "Value")
        updateStates(store, res.locals.configuration, res, req)

        const ssrProps = await primarynavGetServerSideProps(req, res, store)
        const themeVersion = res.locals.configuration[SettingsSdkKeys.themeVersion]?.Value
        return {...ssrProps, themeColours, realm, textAlignment, themeVersion, template}
    } catch (err) {
        BFFLogger.error(err)
        throw new Error(err)
    }
}

export default getServerSideProps
