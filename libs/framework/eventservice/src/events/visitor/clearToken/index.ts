import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class ClearVisitorToken extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.VISITOR_TOKEN_CLEAR)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.VISITOR_TOKEN_CLEAR, callback)
    }
}