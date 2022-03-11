import {IncomingHttpHeaders} from "http"
import {SearchApiRequestTypes} from "../../config/constants"

export interface RequestDuckState {
    headers: IncomingHttpHeaders
    siteUrl: string
    url: string
    page: number
    searchTerm: string | null
    category: string | null
    gender: string[] | null
    territoryName: string
    type: SearchApiRequestTypes
    useDevEsi: boolean
    viewportSize: string
    bloomreachPersonalizationEnabled: boolean
}
