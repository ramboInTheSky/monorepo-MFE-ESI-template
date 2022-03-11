/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."

export interface TrackSiteDetailsEventContractModel {
    data:any
}

export class TrackSiteDetailsEvent extends CommonESB implements ESB {
    public publish(data: TrackSiteDetailsEventContractModel) {
        super.PublishData(Events.TRACK_SITE_DETAILS_EVENT, data)
    }

    public subscribe(callback: (data: TrackSiteDetailsEventContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.TRACK_SITE_DETAILS_EVENT, callback)
    }
}
