import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface AddMultipleContractModel extends GeneralContractModel {
    data: any;
    pageUrl: null | string;
    deliveryWeeks: null | string;
    isGrouped: boolean;
    groupType: null | string;
}
export declare class AddMultiple extends CommonESB implements ESB {
    publish(data: AddMultipleContractModel): void;
    subscribe(callback: (data: AddMultipleContractModel) => void): SubscribeToEvent;
}
export declare type AddMultipleCallbackContractModel = GeneralCallbackContractModel;
export declare class AddMultipleCallback extends CommonESB implements ESB {
    publish(data: AddMultipleCallbackContractModel): void;
    subscribe(callback: (data: AddMultipleCallbackContractModel) => void): SubscribeToEvent;
}
