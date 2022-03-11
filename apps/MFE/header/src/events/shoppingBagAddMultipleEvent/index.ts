import {AddMultiple, AddMultipleCallback, AddMultipleContractModel} from "@monorepo/eventservice"
import {ShoppingBagApiPost} from "../../api/shoppingbag"

const getBagESB = new AddMultiple()
const getBagCallbackESB = new AddMultipleCallback()

export const SubscribeToShoppingBagAddMultiple = (siteUrl: string) => {
    getBagESB.subscribe(data => {
        LoadApiData(siteUrl, data)
    })
}

class BagAddMultipleApiModel {
    data: any
    pageurl: null | string = null
    deliveryweeks: null | string = null
    grouped = false
    groupType: null | string = null
}

const LoadApiData = (url: string, data: AddMultipleContractModel) => {
    const apiModel = new BagAddMultipleApiModel()
    apiModel.data = data.data
    apiModel.pageurl = data.pageUrl
    apiModel.deliveryweeks = data.deliveryWeeks
    apiModel.grouped = data.isGrouped
    apiModel.groupType = data.groupType

    ShoppingBagApiPost(apiModel, `${url}/bag/addmultiple`, getBagCallbackESB, data.eventId)
}
