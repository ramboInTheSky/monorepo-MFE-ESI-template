import {Store} from "redux"
import BFFLogger from "./server/core/BFFLogger"
import getTextAlignment from "./utils/getTextAlignment"
import isRequestValid from "./utils/validateRequest"
import getInPageFilters from "./utils/getInPageFilters"
import getFeatureSwitch from "./utils/getFeatureSwitch"
import {getItemsPerRowConfig} from "./utils/getItemsPerRow"
import {updateTextAlignment} from "./ducks/text-alignment"
import {updateFeatureSwitch} from "./ducks/feature-switch"
import {updateSeoFiltersConfig} from "./ducks/seoFilters"
import {updateRequest} from "./ducks/request"
import {updateText} from "./ducks/text"
import {SettingsSdkKeys} from "./models/settings"
import {getServerSideProps as plpServerSideProps, GetServerSideResponse} from "./compositions/plp/index.server"
import {AppProps} from "./App"
import styleSettings from "./style-settings.json"

const updateStates = (store: Store, conf, res) => {
    updateText(store, res.req.text)
    updateTextAlignment(store, conf)
    updateRequest(store, res.req, res.locals.configuration)
    updateFeatureSwitch(store, conf)
    updateSeoFiltersConfig(store, conf)
}

const getStylesConfig = (conf, realm) => {
    const {enablePageInFilters} = getFeatureSwitch(conf)
    const inPageFilters = getInPageFilters(conf)
    const itemsPerRowConfig = getItemsPerRowConfig(conf)
    const {plpSection} = styleSettings[realm] || styleSettings.default
    const plpSectionStyling = enablePageInFilters ? plpSection.enabledPageInFilters : plpSection.default
    const itemsPerRow = enablePageInFilters ? itemsPerRowConfig.inPageFiltersEnabled : itemsPerRowConfig.default
    const inPageFiltersBreakpoint = enablePageInFilters
        ? inPageFilters.enabled.breakpoint
        : inPageFilters.disabled.breakpoint

    return {...plpSectionStyling, inPageFiltersBreakpoint, itemsPerRow}
}

export const getServerSideProps = async (
    req,
    res,
    store: Store,
): Promise<{appProps: AppProps; otherProps?: GetServerSideResponse}> => {
    try {
        const themeColours = req.theme
        if (!isRequestValid(req, res)) {
            BFFLogger.error("Invalid settings found")
            return {
                appProps: {
                    isConfError: true,
                    textAlignment: "ltr",
                    themeColours,
                    realm: "",
                    themeVersion: "",
                    plpStyleConfig: {},
                },
            }
        }
        const textAlignment = getTextAlignment(res.locals.configuration)
        updateStates(store, res.locals.configuration, res)
        const ssrProps = await plpServerSideProps(req, res, store)
        const themeVersion = res.locals.configuration[SettingsSdkKeys.ThemeVersion]?.Value
        const realm = res.locals.configuration[SettingsSdkKeys.Realm]?.Value
        const plpStyleConfig = getStylesConfig(res.locals.configuration, realm)

        return {
            appProps: {
                isConfError: ssrProps.isConfError,
                textAlignment,
                themeVersion,
                realm,
                themeColours,
                plpStyleConfig,
            },
            otherProps: {
                searchResponse: ssrProps.searchResponse,
                isConfError: ssrProps.isConfError,
            },
        }
    } catch (err) {
        BFFLogger.error(err)
        return {
            appProps: {
                isConfError: true,
                textAlignment: "ltr",
                realm: "",
                themeVersion: "",
                plpStyleConfig: {},
            },
        }
    }
}

export default getServerSideProps
