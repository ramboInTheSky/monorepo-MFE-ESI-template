import {Store} from "redux"
import BFFLogger from "./server/core/BFFLogger"
import isRequestValid from "./utils/validateRequest"
import {updateTextAlignment} from "./ducks/text-alignment"
import {updateLazyloadColourchips} from "./ducks/lazyload"
import {updateEnablingFavourites, updateEnablingReviewStars, updateEnablingBrandDisplay} from "./ducks/productSummary"
import {setRequestAction as updateRequest} from "./ducks/request"
import getTextAlignment from "./utils/getTextAlignment"
import getEnableFavourites from "./utils/getEnableFavourites"
import getEnableReviewStars from "./utils/getEnableReviewStars"
import getEnableBrandDisplay from "./utils/getEnableBrandDisplay"
import { updateText } from "./ducks/text"

import {getServerSideProps as prodSummaryGetServerSideProps} from "./compositions/productSummary/index.server"
import {SettingsSdkKeys} from "./config/settings"
import {ProductType} from "./config/constants"

const updateStates = (store: Store, conf, res) => {
    updateText(store, res.req.text)
    updateRequest(store, res.req)
    updateTextAlignment(store, conf)
    updateLazyloadColourchips(store, conf)
    const enableFavourites = getEnableFavourites(conf)
    updateEnablingFavourites(store.dispatch, enableFavourites)
    const enablingReviewStars = getEnableReviewStars(conf)
    updateEnablingReviewStars(store.dispatch, enablingReviewStars)
    const enablingBrandDisplay = getEnableBrandDisplay(conf)
    updateEnablingBrandDisplay(store.dispatch, enablingBrandDisplay)
}

export const getServerSideProps = async (req, res, store: Store) => {
    try {
        const themeColours = req.theme
        if (!isRequestValid(req, res)) {
            BFFLogger.error("Invalid settings found")
            return {isConfError: true, textAlignment: "ltr", themeColours}
        }

        const textAlignment = getTextAlignment(res.locals.configuration)
        updateStates(store, res.locals.configuration, res)

        const ssrProps = await prodSummaryGetServerSideProps(req, res, store)

        const realm = res.locals.configuration[SettingsSdkKeys.Realm]?.Value
        const themeVersion = res.locals.configuration[SettingsSdkKeys.ThemeVersion]?.Value
        const enablingCenteredContent = res.locals.configuration[SettingsSdkKeys.enableCenteredContent]?.Value

        const appProps = {
            ...ssrProps,
            itemNumber: req.params.itemNumber,
            type: req.params.type || ProductType,
            themeColours,
            realm,
            textAlignment,
            themeVersion,
            enablingCenteredContent,
        }
        return appProps
    } catch (err) {
        BFFLogger.error(new Error(err))
        return {isConfError: true}
    }
}

export default getServerSideProps
