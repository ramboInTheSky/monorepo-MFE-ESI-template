import BFFLogger from "../../core/BFFLogger"
import {RedirectResponse, ExternalSearchApiRedirectResponse} from "../../../models/searchApi"

const redirectToResponseUrl = (apiData: ExternalSearchApiRedirectResponse, res: any) => {
    try {
        const redirectResponse: RedirectResponse = {
            statusCode: 301,
            url: apiData.redirectUrl,
        }
        res.send(redirectResponse)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default redirectToResponseUrl
