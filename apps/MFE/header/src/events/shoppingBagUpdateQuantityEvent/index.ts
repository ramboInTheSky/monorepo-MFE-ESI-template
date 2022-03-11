import {UpdateQuantity, UpdateQuantityCallback, UpdateQuantityContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new UpdateQuantity()
const getBagCallbackESB = new UpdateQuantityCallback()

export const SubscribeToShoppingBagUpdateQuantity = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadApiData(siteUrl, data)
    })
}

class UpdateQuantityApiModel {
    id = ""
    quantity = 0
}

const LoadApiData = (url: string, data: UpdateQuantityContractModel) => {
    const apiModel = new UpdateQuantityApiModel()
    apiModel.id = data.id
    apiModel.quantity = data.quantity

    ShoppingBagApiPost(apiModel, `${url}/bag/updatequantity`, getBagCallbackESB, data.eventId)
}
