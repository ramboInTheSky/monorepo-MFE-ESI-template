import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralCallbackContractModel, GeneralContractModel } from "..";
export interface GetBagContractModel extends GeneralContractModel {
    guestAccountConverted: boolean;
}
export declare class GetBag extends CommonESB implements ESB {
    publish(data: GetBagContractModel): void;
    subscribe(callback: (data: GetBagContractModel) => void): SubscribeToEvent;
}
export declare type GetBagCallbackContractModel = GeneralCallbackContractModel;
export declare class GetBagCallback extends CommonESB implements ESB {
    publish(data: GetBagCallbackContractModel): void;
    subscribe(callback: (data: GetBagCallbackContractModel) => void): SubscribeToEvent;
}
