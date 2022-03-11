import express from "express"
import withGetCountrySelection from "./GetCountrySelection"
import withGetBag from "./bag/get"
import withFavouriteGet from "./favourite/get"
import withFavouriteAdd from "./favourite/add"
import withFavouriteRemove from "./favourite/remove"
import withCountryRedirect from "./countryRedirectUpdate"

const router = express.Router()

withGetCountrySelection(router)
withGetBag(router)
withFavouriteAdd(router)
withFavouriteRemove(router)
withFavouriteGet(router)
withCountryRedirect(router)

export default router

/* istanbul ignore file */
