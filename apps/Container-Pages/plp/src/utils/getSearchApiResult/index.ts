import { httpUrlTrimmer } from "../httpUrlTrimmer"
import SearchApi from "../../config/api/products"
import axios from "../../server/core/xhr"
import { ExternalSearchApiRequest } from "../../models/searchApi"

const getProducts = SearchApi("getProducts")

export const getSearchApiResult = async (req: any, apiUrlSettings: any, headers: any) => {
    let params: ExternalSearchApiRequest = req.query
    if(req.query.criteria){
        params = {...req.query, criteria: httpUrlTrimmer(req.query.criteria)}
    }
    const response = await axios[getProducts.method](getProducts.url(apiUrlSettings)(), {
        params,
        headers,
    })

    return response
}
