import {FavouritesGeneralCallbackContractModel} from ".."
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class GetFavourites extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.FAVOURITES_GET)
    }

    public subscribe(callback: (data) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.FAVOURITES_GET, callback)
    }
}

export type GetFavouritesCallbackContractModel = FavouritesGeneralCallbackContractModel
export class GetFavouritesCallback extends CommonESB implements ESB {
    public publish(data: GetFavouritesCallbackContractModel) {
        super.PublishData(Events.FAVOURITES_GET_CALLBACK, data)
    }

    public subscribe(callback: (data: GetFavouritesCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.FAVOURITES_GET_CALLBACK, callback)
    }
}