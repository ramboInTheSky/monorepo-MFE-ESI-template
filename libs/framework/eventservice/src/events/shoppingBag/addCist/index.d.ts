import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralCallbackContractModel, GeneralContractModel } from "..";
export interface AddCistBagContractModel extends GeneralContractModel {
    id: string;
    optionNumber: string;
    chain: string;
    quantity: number;
    cistStoreId: string;
}
export declare class AddCistBag extends CommonESB implements ESB {
    publish(data: AddCistBagContractModel): void;
    subscribe(callback: (data: AddCistBagContractModel) => void): SubscribeToEvent;
}
export declare type AddCistBagCallbackContractModel = GeneralCallbackContractModel;
export declare class AddCistBagCallback extends CommonESB implements ESB {
    publish(data: AddCistBagCallbackContractModel): void;
    subscribe(callback: (data: AddCistBagCallbackContractModel) => void): SubscribeToEvent;
}
