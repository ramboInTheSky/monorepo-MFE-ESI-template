import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class CountrySelectorRedirectToAlternativeLanguageESB extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE, callback)
    }
}
