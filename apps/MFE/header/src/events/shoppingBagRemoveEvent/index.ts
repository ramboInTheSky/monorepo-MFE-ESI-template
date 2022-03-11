import {RemoveBag, RemoveBagCallback, RemoveBagContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new RemoveBag()
const getBagCallbackESB = new RemoveBagCallback()

export const SubscribeToShoppingBagRemove = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadApiData(siteUrl, data)
    })
}

class BagRemoveApiModel {
    id = ""
}

const LoadApiData = (url: string, data: RemoveBagContractModel) => {
    const apiModel = new BagRemoveApiModel()
    apiModel.id = data.id

    ShoppingBagApiPost(apiModel, `${url}/bag/Remove`, getBagCallbackESB, data.eventId)
}
