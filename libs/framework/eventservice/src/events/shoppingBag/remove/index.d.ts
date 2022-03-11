import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface RemoveBagContractModel extends GeneralContractModel {
    id: string;
}
export declare class RemoveBag extends CommonESB implements ESB {
    publish(data: RemoveBagContractModel): void;
    subscribe(callback: (data: RemoveBagContractModel) => void): SubscribeToEvent;
}
export declare type RemoveBagCallbackContractModel = GeneralCallbackContractModel;
export declare class RemoveBagCallback extends CommonESB implements ESB {
    publish(data: RemoveBagCallbackContractModel): void;
    subscribe(callback: (data: RemoveBagCallbackContractModel) => void): SubscribeToEvent;
}
