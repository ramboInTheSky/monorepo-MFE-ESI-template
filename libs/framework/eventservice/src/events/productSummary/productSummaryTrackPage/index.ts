/* eslint-disable class-methods-use-this */
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export type publishProductSummaryTrackPageData = {
    itemNumber: string
    index: number
}

export interface ProductImpressionModel {
    event: string
    data: publishProductSummaryTrackPageData[]
}

/**
 * GTM should know what the user sees on the page at any one time, asdasdasas
 * after filters and pagination
 */

export class ProductSummaryTrackPage extends CommonESB implements ESB {
    public publish(data: ProductImpressionModel) {
        super.PublishData(Events.PRODUCT_SUMMARY_TRACK_PAGE, data)
    }

    public subscribe(callback: (data: ProductImpressionModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.PRODUCT_SUMMARY_TRACK_PAGE, callback)
    }
}
