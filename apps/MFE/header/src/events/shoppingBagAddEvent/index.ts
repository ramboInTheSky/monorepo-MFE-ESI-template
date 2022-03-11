import {AddBag, AddBagCallback, AddBagContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new AddBag()
const getBagCallbackESB = new AddBagCallback()

export const SubscribeToShoppingBagAdd = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadShoppingBagApiData(siteUrl, data)
    })
}

// legacy model for MVC to work
class BagAddApiModel {
    id = ""
    option = ""
    chain = ""
    quantity = 0
    modalItemUrl = ""
    SaleClearanceSofaImage = ""
}

const LoadShoppingBagApiData = (url: string, data: AddBagContractModel) => {
    const apiModel = new BagAddApiModel()
    apiModel.id = data.id
    apiModel.option = data.optionNumber
    apiModel.chain = data.chain
    apiModel.quantity = data.quantity
    apiModel.modalItemUrl = data.modalItemUrl
    apiModel.SaleClearanceSofaImage = data.saleClearanceSofaImage

    ShoppingBagApiPost(apiModel, `${url}/bag/add`, getBagCallbackESB, data.eventId)
}
