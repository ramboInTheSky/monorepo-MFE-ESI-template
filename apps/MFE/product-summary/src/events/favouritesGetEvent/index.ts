import {GetFavouritesCallback} from "@monorepo/eventservice"

export const getFavourtiesSubscriptionCallBack = (cb: Function, setFavouritedColourways: Function) => {
    const getFavCallback = new GetFavouritesCallback()

    const callBack = data => {
        getFavCallback.UnsubscribeAll()
        cb(data, setFavouritedColourways)
    }

    return getFavCallback.subscribe(callBack)
}
