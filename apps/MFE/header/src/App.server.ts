import {Store} from "redux"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import getConfigurationValue from "./utils/getConfigurationValue"
import getTextAlignment from "./utils/getTextAlignment"
import {isSettingsError} from "./utils/setApiUrlSettings"
import {setLanguageSettings} from "./utils/languageSelector"
import {updateTextAlignment} from "./ducks/text-alignment"
import {updateText} from "./ducks/text"
import {
    setGeolocationUrlAction,
    setRequestAction as updateRequest,
    setBrCookieInfoAction,
    setBloomreachInfoAction,
    setUseTimeMachineCookieAction,
    setTerritoryDetailsAction,
    setMonetateInfoAction,
    setCokieDomainAction,
    setSaleWarningModalAction,
} from "./ducks/request"
import {setAutoCompleteParameters} from "./ducks/autocomplete"
import {updateFeatureSwitch} from "./ducks/feature-switch"
import {updateCountrySelectorSettings} from "./ducks/country-selector"
import {setFavouritesSettings} from "./ducks/favourites"
import {getServerSideProps as headerServerSideProps} from "./compositions/header/index.server"
import BFFLogger from "./server/core/BFFLogger"
import {SettingsSdkKeys} from "./models/settings"
import {SITE_URL_HEADER} from "./config/constants"
import {updateTemplate} from "./ducks/template"
import {getCookieDomain} from "./utils/cookies/getCookieDomain"

import env from "./config/env"
import {updateSettings} from "./ducks/settings"
import {getSettings} from "./utils/getSettings"

const {GEOLOCATION_BASEURL, REACT_APP_USE_TIME_MACHINE_COOKIE} = env

const updateStates = (store: Store, conf, res, req) => {
    updateText(store, req.text)
    updateSettings(store, getSettings(res.locals.configuration))

    updateTemplate(store, conf)
    updateTextAlignment(store, conf)
    updateCountrySelectorSettings(store, conf)

    updateRequest(store, res.req)
    const cookieDomain = getCookieDomain(req.siteUrl.url)
    setCokieDomainAction(store, cookieDomain)
    setAutoCompleteParameters(store, conf)
    setLanguageSettings(store, conf, res.req.headers[SITE_URL_HEADER])
    updateFeatureSwitch(store, conf)
    setFavouritesSettings(store, conf)
    setSaleWarningModalAction(store, conf)

    setBrCookieInfoAction(store, conf)
    setBloomreachInfoAction(store, conf)
    setGeolocationUrlAction(store, GEOLOCATION_BASEURL, conf)
    setUseTimeMachineCookieAction(store, REACT_APP_USE_TIME_MACHINE_COOKIE)
    setTerritoryDetailsAction(store, conf)
    setMonetateInfoAction(store, conf)
}

export const getServerSideProps = async (req, res, store: Store) => {
    const conf = res.locals.configuration

    try {
        let realm
        try {
            const headers = getSettingsHeadersAsObject(res.req.headers)
            realm = (headers?.realm as string)?.toLowerCase()
        } catch (e) {
            const errorMessage = `Header called with bad headers: ${res.req.headers}`
            BFFLogger.error(errorMessage)
            throw new Error(errorMessage)
        }

        if (isSettingsError(conf)) {
            const errorMessage = `Header: No configuration found on feature settings ${conf}`
            BFFLogger.error(errorMessage)
            throw new Error(errorMessage)
        }

        updateStates(store, conf, res, req)

        const textAlignment = getTextAlignment(conf)
        const template = getConfigurationValue(conf, SettingsSdkKeys.template, "Value")
        const ssrProps = await headerServerSideProps(req, res, store)
        const themeColours = req.theme
        const {styles} = req

        const themeVersion = conf[SettingsSdkKeys.themeVersion]?.Value

        return {...ssrProps, styles, themeColours, realm, textAlignment, themeVersion, template}
    } catch (err) {
        BFFLogger.error(err)
        throw new Error(err)
    }
}

export default getServerSideProps
