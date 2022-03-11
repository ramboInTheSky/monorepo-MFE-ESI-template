/* eslint-disable class-methods-use-this */
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export interface AddProductsToMonetateContractModel {
    success: boolean
    data: string[]
}

export class AddProductsToMonetate extends CommonESB implements ESB {
    public publish(data: AddProductsToMonetateContractModel) {
        super.PublishData(Events.PLP_ADD_PRODUCTS_TO_MONETATE, data)
    }

    public subscribe(callback: (data: AddProductsToMonetateContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.PLP_ADD_PRODUCTS_TO_MONETATE, callback)
    }
}
