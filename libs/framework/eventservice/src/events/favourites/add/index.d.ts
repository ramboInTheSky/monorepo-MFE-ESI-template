import { FavouritesGeneralCallbackContractModel, FavouritesGeneralContractModel } from "..";
import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface AddFavouritesContractModel extends FavouritesGeneralContractModel {
    itemNumber: number;
    optionCode: string;
    itemUrl: string;
    linkedItemNumber: string;
    linkedOptionNo: string;
    listId: number;
}
export declare class AddFavourites extends CommonESB implements ESB {
    publish(data: AddFavouritesContractModel): void;
    subscribe(callback: (data: AddFavouritesContractModel) => void): SubscribeToEvent;
}
export declare type AddFavouritesCallbackContractModel = FavouritesGeneralCallbackContractModel;
export declare class AddFavouritesCallback extends CommonESB implements ESB {
    publish(data: AddFavouritesCallbackContractModel): void;
    subscribe(callback: (data: AddFavouritesCallbackContractModel) => void): SubscribeToEvent;
}
