/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."

export interface TrackEventContractModel {
    event: string
    data: any
}

export class TrackEvent extends CommonESB implements ESB {
    public publish(data: TrackEventContractModel) {
        super.PublishData(Events.TRACK_EVENT, data)
    }

    public subscribe(callback: (data: TrackEventContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.TRACK_EVENT, callback)
    }
}
