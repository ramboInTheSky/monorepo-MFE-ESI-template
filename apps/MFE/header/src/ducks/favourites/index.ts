import {Store, Reducer} from "redux"
import {GetFavouritesCallbackContractModel} from "@monorepo/eventservice"
import {SettingsSdkKeys} from "../../models/settings"

export interface FavouritesDuckState {
    enableFavourites: boolean
    hasFavourites: boolean
}

export const SET_FAVOURITES = "SET_FAVOURITES"

type Action = {
    type: typeof SET_FAVOURITES
    payload: PartialState
}

type PartialState = Partial<FavouritesDuckState>

type FavouritesConf = {
    [SettingsSdkKeys.enableFavourites]: {
        Value: boolean
    }
}

export const setFavourites = (payload: PartialState) => ({
    type: SET_FAVOURITES,
    payload,
})

export const setFavouritesSettings = (store: Store, configuration: FavouritesConf) => {
    const payload: Partial<FavouritesDuckState> = {
        enableFavourites: configuration[SettingsSdkKeys.enableFavourites].Value,
    }
    store.dispatch(setFavourites(payload))
}

export const updateFavouritesInState =
    (getFavouritesData: GetFavouritesCallbackContractModel) => (dispatch: any, getState: any) => {
        if (getFavouritesData.success) {
            const {
                favourites: {enableFavourites},
            } = getState()
            const hasFavourites = getFavouritesData?.data?.ShoppingListItems?.length > 0
            window.AmidoFavourites.Data = getFavouritesData.data
            dispatch(setFavourites({hasFavourites, enableFavourites}))
        } else {
            const {
                favourites: {enableFavourites, hasFavourites},
            } = getState()
            dispatch(setFavourites({hasFavourites, enableFavourites}))
        }
    }

const initialState: FavouritesDuckState = {
    enableFavourites: false,
    hasFavourites: false,
}

const reducer: Reducer<FavouritesDuckState, Action> = (state: FavouritesDuckState = initialState, action) => {
    switch (action.type) {
        case SET_FAVOURITES:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default reducer
