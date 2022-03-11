import {FavouritesGeneralCallbackContractModel, FavouritesGeneralContractModel} from ".."
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export interface RemoveFavouritesContractModel extends FavouritesGeneralContractModel {
    itemNumber: number
    optionCode: string
    itemUrl: string
    linkedItemNumber: string
    linkedOptionNo: string
    listId: number
}

export class RemoveFavourites extends CommonESB implements ESB {
    public publish(data: RemoveFavouritesContractModel) {
        super.PublishData(Events.FAVOURITES_REMOVE, data)
    }

    public subscribe(callback: (data: RemoveFavouritesContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.FAVOURITES_REMOVE, callback)
    }
}

export type RemoveFavouritesCallbackContractModel = FavouritesGeneralCallbackContractModel
export class RemoveFavouritesCallback extends CommonESB implements ESB {
    public publish(data: RemoveFavouritesCallbackContractModel) {
        super.PublishData(Events.FAVOURITES_REMOVE_CALLBACK, data)
    }

    public subscribe(callback: (data: RemoveFavouritesCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.FAVOURITES_REMOVE_CALLBACK, callback)
    }
}