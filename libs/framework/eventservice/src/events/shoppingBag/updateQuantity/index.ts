/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface UpdateQuantityContractModel extends GeneralContractModel {
    id: string
    quantity: number
}

export class UpdateQuantity extends CommonESB implements ESB {
    public publish(data: UpdateQuantityContractModel) {
        super.PublishData(Events.SHOPPING_BAG_UPDATE_QUANTITY, data)
    }

    public subscribe(callback: (data: UpdateQuantityContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_UPDATE_QUANTITY, callback)
    }
}

export type UpdateQuantityCallbackContractModel = GeneralCallbackContractModel

export class UpdateQuantityCallback extends CommonESB implements ESB {
    public publish(data: UpdateQuantityCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK, data)
    }

    public subscribe(callback: (data: UpdateQuantityCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK, callback)
    }
}
