import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface UpdateSizeContractModel extends GeneralContractModel {
    id: string;
    optionNumber: string;
    itemNumber: string;
}
export declare class UpdateSize extends CommonESB implements ESB {
    publish(data: UpdateSizeContractModel): void;
    subscribe(callback: (data: UpdateSizeContractModel) => void): SubscribeToEvent;
}
export declare type UpdateSizeCallbackContractModel = GeneralCallbackContractModel;
export declare class UpdateSizeCallback extends CommonESB implements ESB {
    publish(data: UpdateSizeCallbackContractModel): void;
    subscribe(callback: (data: UpdateSizeCallbackContractModel) => void): SubscribeToEvent;
}
