/* eslint-disable no-unused-expressions */
export const shouldUseSessionStorage = () => {
    let useSessionStorage = false
    if (typeof Storage !== "undefined") {
        try {
            const testKey = "test"
            window.sessionStorage.setItem(testKey, "1")
            window.sessionStorage.removeItem(testKey)
            useSessionStorage = true
        } catch (error) {
            useSessionStorage = false
        }
    }

    return useSessionStorage
}

export const setCacheVersion = (shouldSetCacheVersion = false) => {
    const favouriteCacheVersion = "favouriteCacheVersion"
    if (localStorage.getItem(favouriteCacheVersion) === null || shouldSetCacheVersion) {
        const cacheBuster = Math.round(new Date().getTime() / 1000).toString()
        localStorage.setItem(favouriteCacheVersion, cacheBuster)
    }
    return localStorage.getItem(favouriteCacheVersion)
}

export const setSessionStorageHasFavouriteItems = data => {
    const hasFavourites = data?.ShoppingListItems?.length > 0 ? "true" : "false"
    window.sessionStorage?.setItem("AmidoFavourites:HasFavouriteItems", hasFavourites)
}

export const getFormattedItemNumber = itemNumber => {
    const splitItemNumber = itemNumber.split("-")

    return splitItemNumber.length === 1 ? [itemNumber.substr(0, 3), itemNumber.substr(3, 3)].join("-") : itemNumber
}
