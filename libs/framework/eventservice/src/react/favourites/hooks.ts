import {useCommonObservable} from "../useObservable"
import {GetFavouritesCallback, GetFavouritesCallbackContractModel} from "../../events/favourites/get"
import { AddFavouritesCallback, AddFavouritesCallbackContractModel } from "../../events/favourites/add"
import { RemoveFavouritesCallbackContractModel, RemoveFavouritesCallback } from "../../events/favourites/remove"

export const useFavouritesGetCallbackObservable = (callback: (data: GetFavouritesCallbackContractModel) => void) => {
    return useCommonObservable(new GetFavouritesCallback(), callback)
}
export const useFavouritesAddCallbackObservable = (callback: (data: AddFavouritesCallbackContractModel) => void) => {
    return useCommonObservable(new AddFavouritesCallback(), callback)
}
export const useFavouritesRemoveCallbackObservable = (callback: (data: RemoveFavouritesCallbackContractModel) => void) => {
    return useCommonObservable(new RemoveFavouritesCallback(), callback)
}
