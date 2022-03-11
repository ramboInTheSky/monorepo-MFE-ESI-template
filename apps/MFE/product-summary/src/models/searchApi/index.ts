import {Fits, ProductType, SofaType, SaleSashPosition, SuitType} from "../../config/constants"

export interface ItemPriceApiContract {
    minPrice: number
    maxPrice: number
    saleMinPrice: null | number
    saleMaxPrice: null | number
    wasMinPrice: null | number
    wasMaxPrice: null | number
}

export interface ColourwayData {
    id: string
    title: string
    url: string
    selected: boolean
    fits: Fits[]
    colour: string
    price: string
    salePrice: string | null
    wasPrice: string | null
    minPrice: string
    overallStarRating: number
    colourChipImage: string
    mainImage: string
    personalisedType: string
}

export interface Summary {
    id: string
    title: string
    brand: string
    department: string
    fit?: string | null
    colourways: ColourwayData[]
    imageCdnUrl: string
    productImageUrlPart: string
    baseUrl: string
    showNewIn: boolean
    saleSash: string | null
    saleSashPosition: SaleSashPosition | null
}

export type SummaryType = typeof SuitType | typeof ProductType | typeof SofaType
