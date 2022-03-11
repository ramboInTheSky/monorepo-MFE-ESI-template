import {ColourwayData, ItemPriceApiContract, Summary} from "."
import {SofaType} from "../../config/constants"

export interface SofaSummaryApiContract {
    itemNumber: string
    title: string
    type: typeof SofaType
    currencyCode: string
    brand?: string
    department?: string
    fit?: string
    colourways: ColourwaySofaApiContract[]
}

export interface ColourwaySofaApiContract {
    itemNumber: string
    colour: string
    url: string
    mainImage: string
    colourChipImage: string
    itemPrice: ItemPriceApiContract
    minPrice: string
    fits?: string[]
    overallStarRating: number
    personalisedType: string
}

export interface SofaSummaryData extends Summary {
    type: typeof SofaType
    currencyCode: string
    colourways: ColourwayData[]
}
