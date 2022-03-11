import {getElementById} from "../window"
import {PRODUCT_SUMMARY_TILE_ID} from "../../config/constants"

export const getIndexByProductID = (id: string): number => {
    const productSummary = getElementById(`${PRODUCT_SUMMARY_TILE_ID}-${id}`)

    if (!productSummary) return 0

    const position = productSummary.dataset.index ?? ""
    let positionNum = parseInt(position, 10)
    if (!Number.isNaN(positionNum)) {
        positionNum += 1
    } else {
        positionNum = 0
    }

    return positionNum
}
