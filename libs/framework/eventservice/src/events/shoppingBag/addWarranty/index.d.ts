import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface AddWarrantyContractModel extends GeneralContractModel {
    id: string;
    optionNumber: string;
    warrantyId: string;
    warrantyOptionNumber: string;
}
export declare class AddWarranty extends CommonESB implements ESB {
    publish(data: AddWarrantyContractModel): void;
    subscribe(callback: (data: AddWarrantyContractModel) => void): SubscribeToEvent;
}
export declare type AddWarrantyCallbackContractModel = GeneralCallbackContractModel;
export declare class AddWarrantyCallback extends CommonESB implements ESB {
    publish(data: AddWarrantyCallbackContractModel): void;
    subscribe(callback: (data: AddWarrantyCallbackContractModel) => void): SubscribeToEvent;
}
