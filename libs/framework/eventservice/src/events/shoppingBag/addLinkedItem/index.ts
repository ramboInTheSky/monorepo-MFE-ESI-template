/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface AddLinkedItemContractModel extends GeneralContractModel {
    id: string
    optionNumber: string
    linkedItemId: string
    linkedItemOption: string
}

export class AddLinkedItem extends CommonESB implements ESB {
    public publish(data: AddLinkedItemContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_LINKED_ITEM, data)
    }

    public subscribe(callback: (data: AddLinkedItemContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_LINKED_ITEM, callback)
    }
}

export type AddLinkedItemCallbackContractModel = GeneralCallbackContractModel

export class AddLinkedItemCallback extends CommonESB implements ESB {
    public publish(data: AddLinkedItemCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK, data)
    }

    public subscribe(callback: (data: AddLinkedItemCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK, callback)
    }
}
