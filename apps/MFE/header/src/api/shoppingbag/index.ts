import Logger from "@monorepo/core-logger"
import qs from "qs"
import {ESB} from "@monorepo/eventservice/lib/esb"
import {GeneralCallbackContractModel} from "@monorepo/eventservice"
import {axiosInstance as axios} from "../../utils/axios"
import setMainSiteBagCookie from "../../utils/setMainSiteBagCookie"

export const ShoppingBagApiGet = (
    apiModel: any,
    url: string,
    callbackEventService: ESB,
    sdkCallback: (res) => void,
) => {
    const cacheBustedParams = {...apiModel, _: Date.now()}
    axios
        .get(url, {
            withCredentials: true,
            params: cacheBustedParams,
        })
        .then(response => {
            handleSuccess(response, callbackEventService)
            sdkCallback(response)
            setMainSiteBagCookie(response)
        })
        .catch(error => handleError(error, callbackEventService))
}

export const ShoppingBagApiPost = (apiModel: any, url: string, callbackEventService: ESB, eventId?: string) => {
    const params = qs.stringify(apiModel)

    axios
        .post(url, params, {
            withCredentials: true,
        })
        .then(response => {
            handleSuccess(response, callbackEventService, eventId)
            setMainSiteBagCookie(response)
        })
        .catch(error => handleError(error, callbackEventService, eventId))
}

const handleSuccess = (response, callbackEventService: ESB, eventId?: string) => {
    const callbackEventData: GeneralCallbackContractModel = {
        eventId,
        data: response.data,
        status: response.status,
        success: true,
        textStatus: response.statusText,
    }

    callbackEventService.publish(callbackEventData)
}

const handleError = (error, callbackEventService: ESB, eventId?: string) => {
    let callbackEventData: GeneralCallbackContractModel
    if (error.response) {
        callbackEventData = {
            eventId,
            data: error.response.data,
            status: error.response.status,
            success: false,
            textStatus: error.response.statusText,
        }
    } else if (error.request) {
        callbackEventData = {
            eventId,
            data: null,
            status: error.request.status,
            success: false,
            textStatus: error.request.statusText,
        }
    } else {
        callbackEventData = {
            eventId,
            data: null,
            status: 500,
            success: false,
            textStatus: error.message,
        }
    }
    Logger.error(new Error(error))
    callbackEventService.publish(callbackEventData)
}
