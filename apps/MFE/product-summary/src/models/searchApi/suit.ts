import {ColourwayData, ItemPriceApiContract, Summary} from "."
import {SuitType} from "../../config/constants"

export interface SuitSummaryApiContract {
    itemNumber: string
    title: string
    brand: string
    department: string
    fit?: string
    currencyCode: string
    type: typeof SuitType
    colourways: ColourwaySuitsApiContract[]
}

export interface ColourwaySuitsApiContract {
    fits: string[]
    title: string
    type: string
    associatedColourway: AssociatedColourwayApiContract
    itemNumber: string
    colour: string
    url: string
    itemPrice: ItemPriceApiContract
    overallStarRating: number
    personalisedType: string
}

interface AssociatedColourwayApiContract {
    type: string
    itemPrice: ItemPriceApiContract
}

export interface SuitColourwayData extends ColourwayData {
    associatedColourway: {
        type: string
        price: string
        wasPrice: null | string
        salePrice: null | string
    }
    suitPrice: string
    wasSuitPrice: null | string
    saleSuitPrice: null | string
}

export interface SuitSummaryData extends Summary {
    type: typeof SuitType
    currencyCode: string
    colourways: SuitColourwayData[]
}
