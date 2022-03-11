import {RemoveFavourites, RemoveFavouritesCallback} from "@monorepo/eventservice"
import {updateFavourites} from "../../ducks/productSummary"
import {FAV_REMOVE} from "../../config/constants"

const removeFavouritesESB = new RemoveFavourites()

export const PublishRemoveFromFav = data => (dispatch: any) => {
    const removeFavCallback = new RemoveFavouritesCallback()
    const SubscribeRemoveFromFav = cb => {
        return removeFavCallback.subscribe(cb)
    }
    SubscribeRemoveFromFav(d => {
        if (d.eventId === data.eventId) {
            removeFavCallback.UnsubscribeAll()
            dispatch(updateFavourites(d, FAV_REMOVE))
        }
    })
    removeFavouritesESB.publish(data)
}
