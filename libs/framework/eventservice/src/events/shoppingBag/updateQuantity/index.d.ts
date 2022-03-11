import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface UpdateQuantityContractModel extends GeneralContractModel {
    id: string;
    quantity: number;
}
export declare class UpdateQuantity extends CommonESB implements ESB {
    publish(data: UpdateQuantityContractModel): void;
    subscribe(callback: (data: UpdateQuantityContractModel) => void): SubscribeToEvent;
}
export declare type UpdateQuantityCallbackContractModel = GeneralCallbackContractModel;
export declare class UpdateQuantityCallback extends CommonESB implements ESB {
    publish(data: UpdateQuantityCallbackContractModel): void;
    subscribe(callback: (data: UpdateQuantityCallbackContractModel) => void): SubscribeToEvent;
}
