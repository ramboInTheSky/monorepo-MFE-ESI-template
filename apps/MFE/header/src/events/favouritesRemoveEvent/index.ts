import {RemoveFavourites, RemoveFavouritesCallback, RemoveFavouritesContractModel} from "@monorepo/eventservice"
import {FavouritesApiPost} from "../../api/favourites"
import {getFormattedItemNumber} from "../../utils/favourites"

const removeFavouritesESB = new RemoveFavourites()
const removeFavouritesCallbackESB = new RemoveFavouritesCallback()

export const SubscribeToFavouritesRemove = (siteUrl: string) => {
    removeFavouritesESB.subscribe(data => {
        LoadFavouritesApiData(siteUrl, data)
    })
}

class FavouritesRemoveApiModel {
    itemNumber = 0
    optionCode = ""
    linkedItemNumber = ""
    linkedOptionNo = ""
    listId = 0
}

const LoadFavouritesApiData = (url: string, data: RemoveFavouritesContractModel) => {
    const apiModel = new FavouritesRemoveApiModel()
    apiModel.itemNumber = getFormattedItemNumber(data.itemNumber)
    apiModel.optionCode = data.optionCode
    apiModel.linkedItemNumber = data.linkedItemNumber
    apiModel.linkedOptionNo = data.linkedOptionNo
    apiModel.listId = data.listId
    FavouritesApiPost(apiModel, `${url}/favourite/remove`, removeFavouritesCallbackESB, data.eventId)
}
