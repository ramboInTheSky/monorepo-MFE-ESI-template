import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class CountrySelectorRedirectESB extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.COUNTRY_SELECTOR_REDIRECT)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.COUNTRY_SELECTOR_REDIRECT, callback)
    }
}
