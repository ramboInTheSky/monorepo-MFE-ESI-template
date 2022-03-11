import {Store} from "redux"
import BFFLogger from "./server/core/BFFLogger"
import isRequestValid from "./utils/validateRequest"
import {updateTextAlignment} from "./ducks/text-alignment"
import getTextAlignment from "./utils/getTextAlignment"

import {getServerSideProps as reviewStarsGetServerSideProps} from "./compositions/reviewStars/index.server"
import {SettingsSdkKeys} from "./config/settings"

export const getServerSideProps = async (req, res, store: Store) => {
    try {
        const themeColours = req.theme
        if (!isRequestValid(req, res)) {
            BFFLogger.error("Invalid settings found")
            return {isConfError: true, textAlignment: "ltr", themeColours}
        }

        const textAlignment = getTextAlignment(res.locals.configuration)
        updateTextAlignment(store, res.locals.configuration)

        const ssrProps = await reviewStarsGetServerSideProps(req, res, store)

        const realm = res.locals.configuration[SettingsSdkKeys.Realm]?.Value
        const themeVersion = res.locals.configuration[SettingsSdkKeys.ThemeVersion]?.Value

        const appProps = {
            ...ssrProps,
            itemNumber: req.params.itemNumber,
            themeColours,
            realm,
            textAlignment,
            themeVersion,
        }
        return appProps
    } catch (err) {
        BFFLogger.error(new Error(err))
        return {isConfError: true}
    }
}

export default getServerSideProps
