import {publishProductSummaryTrackPageData, ProductSummaryTrackPage} from "@monorepo/eventservice"
import {GTM_PRODUCT_IMPRESSIONS_EVENT} from "../../config/constants"

const ProductSummaryTrackPageEvent = new ProductSummaryTrackPage()

const publishProductSummaryTrackPage = (data: publishProductSummaryTrackPageData[]) => {
    ProductSummaryTrackPageEvent.publish({
        event: GTM_PRODUCT_IMPRESSIONS_EVENT,
        data,
    })
}

export default publishProductSummaryTrackPage
