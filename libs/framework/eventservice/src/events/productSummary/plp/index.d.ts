import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface AddProductsToMonetateContractModel {
    success: boolean;
    data: string[];
}
export declare class AddProductsToMonetate extends CommonESB implements ESB {
    publish(data: AddProductsToMonetateContractModel): void;
    subscribe(callback: (data: AddProductsToMonetateContractModel) => void): SubscribeToEvent;
}
