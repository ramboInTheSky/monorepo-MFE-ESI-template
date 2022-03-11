import {Router} from "express"
import axios from "../../core/xhr"
import env from "../../../config/env"
import {SettingsSdkKeys} from "../../../models/settings"
import cors from "../../middleware/cors"

export const GetCountrySelection = async (_req: any, res: any) => {
    try {
        const countrySelectorVersion = res.locals.configuration
            ? res.locals.configuration[SettingsSdkKeys.countrySelectorVersion]?.Value
            : "v1.0.0"
        const getApiEndpointUrl = `${env.REACT_APP_CDN_BASEURL}/platmod/data/country-selector/${countrySelectorVersion}/country-selector.json`
        const response = await axios.get(getApiEndpointUrl)
        res.send(response.data)
    } catch (err) {
        res.status(500).send(err)
    }
}

export default (router: Router) => {
    // Next
    router.get("/ChannelSelector/GetCountrySelection", cors, GetCountrySelection)
    // TP clients
    router.get("/ChannelSelector/GetChannelsByDomainType/*", cors, GetCountrySelection)
}
