import {FavouritesGeneralCallbackContractModel, FavouritesGeneralContractModel} from ".."
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export interface AddFavouritesContractModel extends FavouritesGeneralContractModel
{
    itemNumber: number
    optionCode: string
    itemUrl: string
    linkedItemNumber: string
    linkedOptionNo: string
    listId: number
}

export class AddFavourites extends CommonESB implements ESB {
    public publish(data: AddFavouritesContractModel) {
        super.PublishData(Events.FAVOURITES_ADD, data)
    }

    public subscribe(callback: (data: AddFavouritesContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.FAVOURITES_ADD, callback)
    }
}

export type AddFavouritesCallbackContractModel = FavouritesGeneralCallbackContractModel
export class AddFavouritesCallback extends CommonESB implements ESB {
    public publish(data: AddFavouritesCallbackContractModel) {
        super.PublishData(Events.FAVOURITES_ADD_CALLBACK, data)
    }

    public subscribe(callback: (data: AddFavouritesCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.FAVOURITES_ADD_CALLBACK, callback)
    }
}