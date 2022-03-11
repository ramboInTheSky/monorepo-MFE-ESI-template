import {ColourwayData, ItemPriceApiContract, Summary} from "."
import {ProductType} from "../../config/constants"

export class ColourwayApiContract {
    fits!: string[]
    itemNumber!: string
    colour!: string
    url!: string
    title!: string
    itemPrice!: ItemPriceApiContract
    minPrice!: string
    overallStarRating!: number
    personalisedType!: string
}

export class ProductSummaryApiContract {
    itemNumber!: string
    title!: string
    colourways!: ColourwayApiContract[]
    currencyCode!: string
    brand!: string
    department!: string
    fit!: string
}

export interface ProductSummaryData extends Summary {
    type: typeof ProductType
    currencyCode: string
    colourways: ColourwayData[]
}
