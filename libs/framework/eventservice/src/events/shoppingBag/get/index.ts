/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralCallbackContractModel, GeneralContractModel} from ".."

export interface GetBagContractModel extends GeneralContractModel {
    guestAccountConverted: boolean
}

export class GetBag extends CommonESB implements ESB {
    public publish(data: GetBagContractModel) {
        super.PublishData(Events.SHOPPING_BAG_GET, data)
    }

    public subscribe(callback: (data: GetBagContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_GET, callback)
    }
}

export type GetBagCallbackContractModel = GeneralCallbackContractModel

export class GetBagCallback extends CommonESB implements ESB {
    public publish(data: GetBagCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_GET_CALLBACK, data)
    }

    public subscribe(callback: (data: GetBagCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_GET_CALLBACK, callback)
    }
}
