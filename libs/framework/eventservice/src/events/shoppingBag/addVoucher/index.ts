/* eslint-disable class-methods-use-this */
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"
import Events from "../.."
import {GeneralContractModel, GeneralCallbackContractModel} from ".."

export interface AddVoucherContractModel extends GeneralContractModel {
    data: any
}

export class AddVoucher extends CommonESB implements ESB {
    public publish(data: AddVoucherContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_VOUCHER, data)
    }

    public subscribe(callback: (data: AddVoucherContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_VOUCHER, callback)
    }
}

export type AddVoucherCallbackContractModel = GeneralCallbackContractModel

export class AddVoucherCallback extends CommonESB implements ESB {
    public publish(data: AddVoucherCallbackContractModel) {
        super.PublishData(Events.SHOPPING_BAG_ADD_VOUCHER_CALLBACK, data)
    }

    public subscribe(callback: (data: AddVoucherCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.SHOPPING_BAG_ADD_VOUCHER_CALLBACK, callback)
    }
}
