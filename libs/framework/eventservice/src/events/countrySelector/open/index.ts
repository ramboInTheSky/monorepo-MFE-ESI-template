import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export interface CountrySelectorOpenContractModel {
    isoCountryCode: string
}

export class CountrySelectorOpenESB extends CommonESB implements ESB {
    public publish(data: CountrySelectorOpenContractModel) {
        super.PublishData(Events.COUNTRY_SELECTOR_OPEN, data)
    }

    public subscribe(callback: (data: CountrySelectorOpenContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.COUNTRY_SELECTOR_OPEN, callback)
    }
}
