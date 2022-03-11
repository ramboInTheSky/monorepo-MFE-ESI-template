/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../esb"
import Events from ".."

export interface SearchLandingContractModel {
    data: any
}

export class PageLandingESB extends CommonESB implements ESB {
    public publish(data: SearchLandingContractModel) {
        super.PublishData(Events.SEARCH_LANDING_BLOOMREACH_CATEGORY, data)
    }

    public subscribe(callback: (data: SearchLandingContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SEARCH_LANDING_BLOOMREACH_CATEGORY, callback)
    }
}
