import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralCallbackContractModel, GeneralContractModel } from "..";
export interface AddEVoucherContractModel extends GeneralContractModel {
    id: string;
    option: string;
    eVoucherTo: string;
    eVoucherFrom: string;
    eVoucherEmail: string;
    eVoucherMessage: string;
    ecardDeliveryDate: string;
}
export declare class AddEVoucher extends CommonESB implements ESB {
    publish(data: AddEVoucherContractModel): void;
    subscribe(callback: (data: AddEVoucherContractModel) => void): SubscribeToEvent;
}
export declare type AddEVoucherCallbackContractModel = GeneralCallbackContractModel;
export declare class AddEVoucherCallback extends CommonESB implements ESB {
    publish(data: AddEVoucherCallbackContractModel): void;
    subscribe(callback: (data: AddEVoucherCallbackContractModel) => void): SubscribeToEvent;
}
