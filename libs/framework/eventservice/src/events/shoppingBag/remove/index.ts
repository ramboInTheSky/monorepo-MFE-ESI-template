/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface RemoveBagContractModel extends GeneralContractModel {
    id: string
}

export class RemoveBag extends CommonESB implements ESB {
    public publish(data: RemoveBagContractModel) {
        super.PublishData(Events.SHOPPING_BAG_REMOVE, data)
    }

    public subscribe(callback: (data: RemoveBagContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_REMOVE, callback)
    }
}

export type RemoveBagCallbackContractModel = GeneralCallbackContractModel

export class RemoveBagCallback extends CommonESB implements ESB {
    public publish(data: RemoveBagCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_REMOVE_CALLBACK, data)
    }

    public subscribe(callback: (data: RemoveBagCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_REMOVE_CALLBACK, callback)
    }
}
