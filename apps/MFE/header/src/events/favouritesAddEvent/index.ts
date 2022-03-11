import {AddFavourites, AddFavouritesCallback, AddFavouritesContractModel} from "@monorepo/eventservice"
import {FavouritesApiPost} from "../../api/favourites"
import {getFormattedItemNumber} from "../../utils/favourites"

const addFavouritesESB = new AddFavourites()
const addFavouritesCallbackESB = new AddFavouritesCallback()

export const SubscribeToFavouritesAdd = (siteUrl: string) => {
    addFavouritesESB.subscribe(data => {
        LoadFavouritesApiData(siteUrl, data)
    })
}

class FavouritesAddApiModel {
    itemNumber = 0
    optionCode = ""
    itemUrl = ""
    linkedItemNumber = ""
    linkedOptionNo = ""
    listId = 0
}

const LoadFavouritesApiData = (url: string, data: AddFavouritesContractModel) => {
    const apiModel = new FavouritesAddApiModel()
    apiModel.itemNumber = getFormattedItemNumber(data.itemNumber)
    apiModel.optionCode = data.optionCode
    apiModel.itemUrl = data.itemUrl
    apiModel.linkedItemNumber = data.linkedItemNumber
    apiModel.linkedOptionNo = data.linkedOptionNo
    apiModel.listId = data.listId

    FavouritesApiPost(apiModel, `${url}/favourite`, addFavouritesCallbackESB, data.eventId)
}
