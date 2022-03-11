import {SuitSummaryData} from "../searchApi/suit"
import {ProductSummaryData} from "../searchApi/product"
import {SofaSummaryData} from "../searchApi/sofa"

export enum FavErrorToolTipType {
    MaxLimit,
    Error,
}

export type SummaryData = ProductSummaryData | SuitSummaryData | SofaSummaryData

export interface ProductSummaryState {
    canLoadVisibleColourways: boolean
    hasLoadedVisibleColourways: boolean
    isFav: boolean
    enableFav: boolean
    enableReviewStars: boolean
    isLoadingFav: boolean
    showFavErrorToolTip: FavErrorToolTipType | null
    enabledSearchDesc: boolean
    summaryData: SummaryData
    animateFavouriteIcon: boolean
    enableBrandDisplay: boolean
}
