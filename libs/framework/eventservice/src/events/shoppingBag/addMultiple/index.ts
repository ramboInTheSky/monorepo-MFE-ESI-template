/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface AddMultipleContractModel extends GeneralContractModel {
    data: any
    pageUrl: null | string
    deliveryWeeks: null | string
    isGrouped: boolean
    groupType: null | string
}

export class AddMultiple extends CommonESB implements ESB {
    public publish(data: AddMultipleContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_MULTIPLE, data)
    }

    public subscribe(callback: (data: AddMultipleContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_MULTIPLE, callback)
    }
}

export type AddMultipleCallbackContractModel = GeneralCallbackContractModel

export class AddMultipleCallback extends CommonESB implements ESB {
    public publish(data: AddMultipleCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_MULTIPLE_CALLBACK, data)
    }

    public subscribe(callback: (data: AddMultipleCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_MULTIPLE_CALLBACK, callback)
    }
}
