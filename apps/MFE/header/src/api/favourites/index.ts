import Logger from "@monorepo/core-logger"
import {ESB} from "@monorepo/eventservice/lib/esb"
import {FavouritesGeneralCallbackContractModel} from "@monorepo/eventservice"
import {axiosInstance as axios} from "../../utils/axios"
import {shouldUseSessionStorage, setCacheVersion, setSessionStorageHasFavouriteItems} from "../../utils/favourites"

export const FavouritesApiGet = (url: string, callbackEventService: ESB) => {
    axios
        .get(url, {
            withCredentials: true,
        })
        .then(response => {
            handleSuccess(response, callbackEventService)
        })
        .catch(error => handleError(error, callbackEventService))
}

export const FavouritesApiPost = (apiModel: any, url: string, callbackEventService: ESB, eventId?: string) => {
    axios
        .post(url, apiModel, {
            withCredentials: true,
            headers: {Pragma: "no-cache"},
        })
        .then(response => {
            handleSuccess(response, callbackEventService, eventId)
            if (shouldUseSessionStorage()) {
                setCacheVersion(true)
            }
        })
        .catch(error => handleError(error, callbackEventService, eventId))
}

const handleSuccess = (response, callbackEventService: ESB, eventId?: string) => {
    const defaultEventData = {
        status: response.status,
        textStatus: response.statusText,
        eventId: eventId ?? "",
    }

    const data = response.data?.data || null

    const success = response.data?.Success

    const errorMessage = response.data?.Success
        ? null
        : response.data?.ErrorMessage || "Favourites - something went wrong!"

    const callbackEventData: FavouritesGeneralCallbackContractModel = {
        ...defaultEventData,
        data,
        success,
        errorMessage,
    }

    if (response.data?.Success && shouldUseSessionStorage()) {
        setSessionStorageHasFavouriteItems(response.data?.data)
    }
    callbackEventService.publish(callbackEventData)
}

const handleError = (error, callbackEventService: ESB, eventId?: string) => {
    let callbackEventData: FavouritesGeneralCallbackContractModel
    if (error.response) {
        callbackEventData = {
            data: error.response.data,
            status: error.response.status,
            success: false,
            textStatus: error.response.statusText,
            eventId: eventId ?? "",
        }
    } else if (error.request) {
        callbackEventData = {
            data: null,
            status: error.request.status,
            success: false,
            textStatus: error.request.statusText,
            eventId: eventId ?? "",
        }
    } else {
        callbackEventData = {
            data: null,
            status: 500,
            success: false,
            textStatus: error.message,
            eventId: eventId ?? "",
        }
    }
    Logger.error(new Error(error))
    callbackEventService.publish(callbackEventData)
}
