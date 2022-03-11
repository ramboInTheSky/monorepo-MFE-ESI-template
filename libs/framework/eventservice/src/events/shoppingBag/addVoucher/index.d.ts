import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface AddVoucherContractModel extends GeneralContractModel {
    data: any;
}
export declare class AddVoucher extends CommonESB implements ESB {
    publish(data: AddVoucherContractModel): void;
    subscribe(callback: (data: AddVoucherContractModel) => void): SubscribeToEvent;
}
export declare type AddVoucherCallbackContractModel = GeneralCallbackContractModel;
export declare class AddVoucherCallback extends CommonESB implements ESB {
    publish(data: AddVoucherCallbackContractModel): void;
    subscribe(callback: (data: AddVoucherCallbackContractModel) => void): SubscribeToEvent;
}
