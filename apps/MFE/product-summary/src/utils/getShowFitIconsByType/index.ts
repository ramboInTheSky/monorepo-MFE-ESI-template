import {SaleSashPosition, ProductType, SuitType} from "../../config/constants"
import {SummaryType} from "../../models/searchApi"
import {showFitsIcons} from "./showFitsIcons"

export function getShowFitIconsByType(
    type: SummaryType,
    {isOnSale, saleSashPosition}: {isOnSale: boolean; saleSashPosition: SaleSashPosition | null},
) {
    switch (type) {
        case SuitType:
            return false
        case ProductType:
            return !!saleSashPosition && showFitsIcons(isOnSale, saleSashPosition)
        default:
            return false
    }
}
