import {HeadersModel} from "@monorepo/apiconfig"
import {getSearchResults} from "../../../utils/getSearchResults"
import BFFLogger from "../../core/BFFLogger"
import Api from "../../../config/api/productSummary"
import axios from "../../core/xhr"
import {RedirectResponse} from "../../../models/searchApi"
import {ColourwayApiQueryParameters, Colourway} from "../../../models/Colourway"
import {nameofFactory} from "../../../utils/nameof"
import {Product} from "../../../models/Product"

const getProductSummary = Api("getProductSummary")
const nameofColourwayApiContract = nameofFactory<Colourway>()
const nameofProductSummaryApiContract = nameofFactory<Product>()

const RedirectToPdp = async (apiUrlSettings: HeadersModel, res: any, req: any, headers: any, itemNumber: string) => {
    try {
        const dataShapingQuery: ColourwayApiQueryParameters = {
            fields: `${nameofProductSummaryApiContract("colourways")}.${nameofColourwayApiContract("url")}`,
        }

        const productSummaryResponse = await axios[getProductSummary.method](
            getProductSummary.url(apiUrlSettings)(itemNumber),
            {
                params: dataShapingQuery,
            },
        ).catch(async () => {
            await getSearchResults(req, res, apiUrlSettings, headers)
        })

        const productSummaryData = productSummaryResponse.data as Product
        if (!productSummaryData || !productSummaryData.colourways || productSummaryData.colourways.length <= 0) {
            await getSearchResults(req, res, apiUrlSettings, headers)
        } else {
            const searchResponse: RedirectResponse = {
                statusCode: 302,
                url: productSummaryData.colourways[0].url,
            }
            res.send(searchResponse)
        }
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default RedirectToPdp
