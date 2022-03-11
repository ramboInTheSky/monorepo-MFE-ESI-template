/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralCallbackContractModel, GeneralContractModel} from ".."

export interface AddCistBagContractModel extends GeneralContractModel {
    id: string
    optionNumber: string
    chain: string
    quantity: number
    cistStoreId: string
}

export class AddCistBag extends CommonESB implements ESB {
    public publish(data: AddCistBagContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_CIST, data)
    }

    public subscribe(callback: (data: AddCistBagContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_CIST, callback)
    }
}

export type AddCistBagCallbackContractModel = GeneralCallbackContractModel

export class AddCistBagCallback extends CommonESB implements ESB {
    public publish(data: AddCistBagCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_CIST_CALLBACK, data)
    }

    public subscribe(callback: (data: AddCistBagCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_CIST_CALLBACK, callback)
    }
}
