/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralCallbackContractModel, GeneralContractModel} from ".."

export interface AddBagContractModel extends GeneralContractModel {
    id: string
    optionNumber: string
    chain: string
    quantity: number
    modalItemUrl: string
    saleClearanceSofaImage: string
}

export class AddBag extends CommonESB implements ESB {
    public publish(data: AddBagContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD, data)
    }

    public subscribe(callback: (data: AddBagContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD, callback)
    }
}

export type AddBagCallbackContractModel = GeneralCallbackContractModel

export class AddBagCallback extends CommonESB implements ESB {
    public publish(data: AddBagCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_CALLBACK, data)
    }

    public subscribe(callback: (data: AddBagCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_CALLBACK, callback)
    }
}
