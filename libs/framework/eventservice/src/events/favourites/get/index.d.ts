import { FavouritesGeneralCallbackContractModel } from "..";
import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class GetFavourites extends CommonESB implements ESB {
    publish(): void;
    subscribe(callback: (data: any) => void): SubscribeToEvent;
}
export declare type GetFavouritesCallbackContractModel = FavouritesGeneralCallbackContractModel;
export declare class GetFavouritesCallback extends CommonESB implements ESB {
    publish(data: GetFavouritesCallbackContractModel): void;
    subscribe(callback: (data: GetFavouritesCallbackContractModel) => void): SubscribeToEvent;
}
