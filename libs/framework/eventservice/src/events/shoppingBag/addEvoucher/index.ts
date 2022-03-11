/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralCallbackContractModel, GeneralContractModel} from ".."

export interface AddEVoucherContractModel extends GeneralContractModel {
    id: string
    option: string
    eVoucherTo: string
    eVoucherFrom: string
    eVoucherEmail: string
    eVoucherMessage: string
    ecardDeliveryDate: string
}
export class AddEVoucher extends CommonESB implements ESB {
    public publish(data: AddEVoucherContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_EVOUCHER, data)
    }

    public subscribe(callback: (data: AddEVoucherContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_EVOUCHER, callback)
    }
}

export type AddEVoucherCallbackContractModel = GeneralCallbackContractModel
export class AddEVoucherCallback extends CommonESB implements ESB {
    public publish(data: AddEVoucherCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_EVOUCHER_CALLBACK, data)
    }

    public subscribe(callback: (data: AddEVoucherCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_EVOUCHER_CALLBACK, callback)
    }
}
