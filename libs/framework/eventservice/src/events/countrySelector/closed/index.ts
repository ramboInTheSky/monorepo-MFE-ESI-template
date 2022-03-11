import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class CountrySelectorClosedESB extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.COUNTRY_SELECTOR_CLOSED)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.COUNTRY_SELECTOR_CLOSED, callback)
    }
}
