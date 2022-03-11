import {AddWarranty, AddWarrantyCallback, AddWarrantyContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new AddWarranty()
const getBagCallbackESB = new AddWarrantyCallback()

export const SubscribeToShoppingBagAddWarranty = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadApiData(siteUrl, data)
    })
}

class BagAddWarrantyApiModel {
    id = ""
    option = ""
    warranty = ""
    warrantyoptionno = ""
}

const LoadApiData = (url: string, data: AddWarrantyContractModel) => {
    const apiModel = new BagAddWarrantyApiModel()
    apiModel.id = data.id
    apiModel.option = data.optionNumber
    apiModel.warranty = data.warrantyId
    apiModel.warrantyoptionno = data.warrantyOptionNumber

    ShoppingBagApiPost(apiModel, `${url}/bag/addwarranty`, getBagCallbackESB, data.eventId)
}
