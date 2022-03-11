/* eslint-disable class-methods-use-this */
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class HydrateProductSummaryESB extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.PRODUCT_SUMMARY_HYDRATE)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.PRODUCT_SUMMARY_HYDRATE, callback)
    }
}
