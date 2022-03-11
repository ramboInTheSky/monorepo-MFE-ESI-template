import { FavouritesGeneralCallbackContractModel, FavouritesGeneralContractModel } from "..";
import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface RemoveFavouritesContractModel extends FavouritesGeneralContractModel {
    itemNumber: number;
    optionCode: string;
    itemUrl: string;
    linkedItemNumber: string;
    linkedOptionNo: string;
    listId: number;
}
export declare class RemoveFavourites extends CommonESB implements ESB {
    publish(data: RemoveFavouritesContractModel): void;
    subscribe(callback: (data: RemoveFavouritesContractModel) => void): SubscribeToEvent;
}
export declare type RemoveFavouritesCallbackContractModel = FavouritesGeneralCallbackContractModel;
export declare class RemoveFavouritesCallback extends CommonESB implements ESB {
    publish(data: RemoveFavouritesCallbackContractModel): void;
    subscribe(callback: (data: RemoveFavouritesCallbackContractModel) => void): SubscribeToEvent;
}
