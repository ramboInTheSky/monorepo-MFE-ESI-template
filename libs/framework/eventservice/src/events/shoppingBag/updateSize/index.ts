/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface UpdateSizeContractModel extends GeneralContractModel {
    id: string
    optionNumber: string
    itemNumber: string
}

export class UpdateSize extends CommonESB implements ESB {
    public publish(data: UpdateSizeContractModel) {
        super.PublishData(Events.SHOPPING_BAG_UPDATE_SIZE, data)
    }

    public subscribe(callback: (data: UpdateSizeContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_UPDATE_SIZE, callback)
    }
}

export type UpdateSizeCallbackContractModel = GeneralCallbackContractModel
export class UpdateSizeCallback extends CommonESB implements ESB {
    public publish(data: UpdateSizeCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_UPDATE_SIZE_CALLBACK, data)
    }

    public subscribe(callback: (data: UpdateSizeCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_UPDATE_SIZE_CALLBACK, callback)
    }
}
