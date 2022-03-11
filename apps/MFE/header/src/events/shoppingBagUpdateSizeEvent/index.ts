import {UpdateSize, UpdateSizeCallback, UpdateSizeContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new UpdateSize()
const getBagCallbackESB = new UpdateSizeCallback()

export const SubscribeToShoppingBagUpdateSize = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadApiData(siteUrl, data)
    })
}

class UpdateSizeApiModel {
    id = ""
    option = ""
    itemNumber = ""
}

const LoadApiData = (url: string, data: UpdateSizeContractModel) => {
    const apiModel = new UpdateSizeApiModel()
    apiModel.id = data.id
    apiModel.option = data.optionNumber
    apiModel.itemNumber = data.itemNumber

    ShoppingBagApiPost(apiModel, `${url}/bag/updatesize`, getBagCallbackESB, data.eventId)
}
