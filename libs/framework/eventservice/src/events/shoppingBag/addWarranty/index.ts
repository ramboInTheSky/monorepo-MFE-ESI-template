/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface AddWarrantyContractModel extends GeneralContractModel {
    id: string
    optionNumber: string
    warrantyId: string
    warrantyOptionNumber: string
}

export class AddWarranty extends CommonESB implements ESB {
    public publish(data: AddWarrantyContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_WARRANTY, data)
    }

    public subscribe(callback: (data: AddWarrantyContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_WARRANTY, callback)
    }
}

export type AddWarrantyCallbackContractModel = GeneralCallbackContractModel

export class AddWarrantyCallback extends CommonESB implements ESB {
    public publish(data: AddWarrantyCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_WARRANTY_CALLBACK, data)
    }

    public subscribe(callback: (data: AddWarrantyCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_WARRANTY_CALLBACK, callback)
    }
}
