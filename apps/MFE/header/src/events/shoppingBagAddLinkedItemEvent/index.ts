import {AddLinkedItem, AddLinkedItemCallback, AddLinkedItemContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new AddLinkedItem()
const getBagCallbackESB = new AddLinkedItemCallback()

export const SubscribeToShoppingBagAddLinkedItem = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadApiData(siteUrl, data)
    })
}

class BagAddApiModel {
    id = ""
    option = ""
    linkeditem = ""
    linkeditemoption = ""
}

const LoadApiData = (url: string, data: AddLinkedItemContractModel) => {
    const apiModel = new BagAddApiModel()
    apiModel.id = data.id
    apiModel.option = data.optionNumber
    apiModel.linkeditem = data.linkedItemId
    apiModel.linkeditemoption = data.linkedItemOption

    ShoppingBagApiPost(apiModel, `${url}/bag/addlinkeditem`, getBagCallbackESB, data.eventId)
}
