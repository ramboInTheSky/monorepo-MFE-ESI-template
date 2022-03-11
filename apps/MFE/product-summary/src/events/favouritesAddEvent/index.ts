import {AddFavourites, AddFavouritesCallback} from "@monorepo/eventservice"
import {updateFavourites} from "../../ducks/productSummary"
import {FAV_ADD} from "../../config/constants"

const addFavouritesESB = new AddFavourites()

export const PublishAddToFav = data => (dispatch: any) => {
    const addFavCallback = new AddFavouritesCallback()
    const SubscribeToFav = cb => {
        return addFavCallback.subscribe(cb)
    }
    SubscribeToFav(d => {
        if (d.eventId === data.eventId) {
            addFavCallback.UnsubscribeAll()
            dispatch(updateFavourites(d, FAV_ADD))
        }
    })
    addFavouritesESB.publish(data)
}
