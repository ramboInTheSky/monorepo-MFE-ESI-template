import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class ModalsCloseESB extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.MODALS_CLOSE)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.MODALS_CLOSE, callback)
    }
}
