import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
import { GeneralContractModel, GeneralCallbackContractModel } from "..";
export interface AddLinkedItemContractModel extends GeneralContractModel {
    id: string;
    optionNumber: string;
    linkedItemId: string;
    linkedItemOption: string;
}
export declare class AddLinkedItem extends CommonESB implements ESB {
    publish(data: AddLinkedItemContractModel): void;
    subscribe(callback: (data: AddLinkedItemContractModel) => void): SubscribeToEvent;
}
export declare type AddLinkedItemCallbackContractModel = GeneralCallbackContractModel;
export declare class AddLinkedItemCallback extends CommonESB implements ESB {
    publish(data: AddLinkedItemCallbackContractModel): void;
    subscribe(callback: (data: AddLinkedItemCallbackContractModel) => void): SubscribeToEvent;
}
