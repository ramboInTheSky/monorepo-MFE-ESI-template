/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../esb"
import Events from ".."

export interface SearchContractModel {
    id: string
    name: string
}

export class SearchESB extends CommonESB implements ESB {
    public publish(data: SearchContractModel) {
        super.PublishData(Events.SEARCH, data)
    }

    public subscribe(callback: (data: SearchContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SEARCH, callback)
    }
}
