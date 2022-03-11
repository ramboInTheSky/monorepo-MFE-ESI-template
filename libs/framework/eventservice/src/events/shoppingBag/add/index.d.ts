import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralCallbackContractModel, GeneralContractModel } from "..";
export interface AddBagContractModel extends GeneralContractModel {
    id: string;
    optionNumber: string;
    chain: string;
    quantity: number;
    modalItemUrl: string;
    saleClearanceSofaImage: string;
}
export declare class AddBag extends CommonESB implements ESB {
    publish(data: AddBagContractModel): void;
    subscribe(callback: (data: AddBagContractModel) => void): SubscribeToEvent;
}
export declare type AddBagCallbackContractModel = GeneralCallbackContractModel;
export declare class AddBagCallback extends CommonESB implements ESB {
    publish(data: AddBagCallbackContractModel): void;
    subscribe(callback: (data: AddBagCallbackContractModel) => void): SubscribeToEvent;
}
