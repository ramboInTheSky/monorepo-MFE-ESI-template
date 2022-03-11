import {Item} from "../../models/shoppingbag"
import {SOLD_OUT} from "../../config/constants"

const total = (items: Item[]) => {
    if (!items.length) return

    return items
        .filter(x => x.StockStatus !== SOLD_OUT)
        .map(x => x.Quantity * +x.Price)
        .reduce((x, y) => x + y)
        .toFixed(2)
}

export default {
    total,
}
