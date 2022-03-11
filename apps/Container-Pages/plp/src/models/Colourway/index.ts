export interface ColourwayApiQueryParameters {
    fields: string
}

export class Colourway {
    fits!: string[]
    itemNumber!: string
    colour!: string
    url!: string

    itemPrice!: {
        minPrice: number
        maxPrice: number
        saleMinPrice: null | number
        saleMaxPrice: null | number
        saleWasPrice: null | number
    }
}
