import {AddCistBag, AddCistBagCallback, AddCistBagContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const addBagESB = new AddCistBag()
const addBagCallbackESB = new AddCistBagCallback()

export const SubscribeToShoppingBagAddCist = (siteUrl: string) => {
    addBagESB.subscribe(data => {
        LoadShoppingBagApiData(siteUrl, data)
    })
}

class BagAddApiModel {
    id = ""
    option = ""
    chain = ""
    quantity = 0
    ciststoreid = ""
}

const LoadShoppingBagApiData = (url: string, data: AddCistBagContractModel) => {
    const apiModel = new BagAddApiModel()
    apiModel.id = data.id
    apiModel.option = data.optionNumber
    apiModel.chain = data.chain
    apiModel.quantity = data.quantity
    apiModel.ciststoreid = data.cistStoreId

    ShoppingBagApiPost(apiModel, `${url}/bag/AddCist`, addBagCallbackESB, data.eventId)
}
