import {AddEVoucher, AddEVoucherCallback, AddEVoucherContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new AddEVoucher()
const getBagCallbackESB = new AddEVoucherCallback()

export const SubscribeToShoppingBagAddEVoucher = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadShoppingBagApiData(siteUrl, data)
    })
}
class BagAddApiModel {
    id = ""
    option = ""
    eVoucherTo = ""
    eVoucherFrom = ""
    eVoucherEmail = ""
    eVoucherMessage = ""
    ecardDeliveryDate = ""
}

const LoadShoppingBagApiData = (url: string, data: AddEVoucherContractModel) => {
    const apiModel = new BagAddApiModel()
    apiModel.id = data.id
    apiModel.option = data.option
    apiModel.eVoucherTo = data.eVoucherTo
    apiModel.eVoucherFrom = data.eVoucherFrom
    apiModel.eVoucherEmail = data.eVoucherEmail
    apiModel.eVoucherMessage = data.eVoucherMessage
    apiModel.ecardDeliveryDate = data.ecardDeliveryDate

    ShoppingBagApiPost(apiModel, `${url}/bag/addevoucher`, getBagCallbackESB, data.eventId)
}
