import {Colourway} from "../Colourway"

export class Product {
    itemNumber!: string
    title!: string
    colourways!: Colourway[]
    currencyCode!: string
}

export class ProductItem {
    itemNumber!: string
    newIn!: boolean
    html?: string
    type?: string
}
