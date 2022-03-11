import {ProductSummaryToDataLayer} from "@monorepo/eventservice"

const PlpLandingPageEvent = new ProductSummaryToDataLayer()

export const publishProductImpressions = (eventName: string, data: any) => {
    PlpLandingPageEvent.publish({event: eventName, data})
}
