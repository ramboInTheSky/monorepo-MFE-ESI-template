import {Store, Dispatch} from "redux"
import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import {GetFavouritesCallbackContractModel} from "@monorepo/eventservice"
import {createSelector} from "reselect"
import {SummaryType} from "../../models/searchApi"
import {
    ProductType,
    FAV_ERROR_LIMIT_EXCEEDED,
    GTM_FAVOURITES,
    GTM_ADD_FAVOURITES,
    GTM_REMOVE_FAVOURITES,
    GTM_ERROR_ADD_FAVOURITES,
    GTM_ERROR_REMOVE_FAVOURITES,
    FAV_ADD,
    FAV_REMOVE,
} from "../../config/constants"
import {getProductSummary} from "../../api/getProductSummary"
import {ProductSummaryState, SummaryData, FavErrorToolTipType} from "../../models/ProductSummary"
import State from "../../models/state"
import {shoppingListItemsToFavouritedColourways} from "../../utils/favourites"
import {PublishTrackEvent} from "../../events/gtm/trackEvent"
import {getProductTitle} from "../../utils/product"

type GetStateFn = () => State

export const SET_SUMMARY_DATA = "SET_PRODUCT_SUMMARY_DATA"
export const SET_SELECTED_COLOURWAY = "SET_SELECTED_COLOURWAY"
export const ENABLE_FAV = "ENABLE_FAV"
export const SET_ENABLE_REVIEW_STARS = "SET_ENABLE_REVIEW_STARS"
export const SHOW_FAV_ERROR_TOOLTIP = "SHOW_FAV_ERROR_TOOLTIP"
export const SET_ENABLE_SEARCH_DESCRIPTION = "SET_ENABLE_SEARCH_DESCRIPTION"
export const SET_LOADING_FAV = "SET_LOADING_FAV"
export const SET_FAVOURITED_COLOURWAYS = "SET_FAVOURITED_COLOURWAYS"
export const SET_ANIMATE_FAVOURITE_ICON = "SET_ANIMATE_FAVOURITE_ICON"
export const SET_ENABLE_BRAND_DISPLAY = "SET_ENABLE_BRAND_DISPLAY"

const initialState: ProductSummaryState = {
    summaryData: {
        colourways: [],
        id: "",
        title: "",
        brand: "",
        department: "",
        fit: "",
        imageCdnUrl: "",
        productImageUrlPart: "",
        baseUrl: "",
        showNewIn: false,
        saleSash: null,
        saleSashPosition: null,
        type: ProductType,
        currencyCode: "",
    },
    canLoadVisibleColourways: false,
    hasLoadedVisibleColourways: false,
    isFav: false,
    enableFav: false,
    enableReviewStars: false,
    showFavErrorToolTip: null,
    enabledSearchDesc: false,
    isLoadingFav: false,
    animateFavouriteIcon: false,
    enableBrandDisplay: false,
}

interface SetEnableSearchDescription {
    type: typeof SET_ENABLE_SEARCH_DESCRIPTION
    enabledSearchDesc: boolean
}

interface SetSummaryData {
    type: typeof SET_SUMMARY_DATA
    data: SummaryData
}

interface SetLoadingFav {
    type: typeof SET_LOADING_FAV
    isLoadingFav: boolean
}

interface SetAnimateFavouriteIcon {
    type: typeof SET_ANIMATE_FAVOURITE_ICON
    animateFavouriteIcon: boolean
}

interface SetSelectedColourway {
    type: typeof SET_SELECTED_COLOURWAY
    colourwayItemNumber: string
}

interface SetFavouritedColourways {
    type: typeof SET_FAVOURITED_COLOURWAYS
    favouritedColourways: string[]
}

interface SetEnableFav {
    type: typeof ENABLE_FAV
    enableFav: boolean
}
interface SetEnableReviewStars {
    type: typeof SET_ENABLE_REVIEW_STARS
    enableReviewStars: boolean
}
interface SetEnableBrandDisplay {
    type: typeof SET_ENABLE_BRAND_DISPLAY
    enableBrandDisplay: boolean
}
const setEnabledSearchDescription = (enabledSearchDesc: boolean) => ({
    type: SET_ENABLE_SEARCH_DESCRIPTION,
    enabledSearchDesc,
})

interface SetShowFavErrorToolTip {
    type: typeof SHOW_FAV_ERROR_TOOLTIP
    errorType: FavErrorToolTipType
}

const setProductSummaryDataAction = (data: SummaryData): SetSummaryData => {
    return {
        type: SET_SUMMARY_DATA,
        data,
    }
}

export const setLoadingFav = (isLoadingFav: boolean): SetLoadingFav => {
    return {
        type: SET_LOADING_FAV,
        isLoadingFav,
    }
}

export const setAnimateFavouriteIcon = (animateFavouriteIcon: boolean): SetAnimateFavouriteIcon => {
    return {
        type: SET_ANIMATE_FAVOURITE_ICON,
        animateFavouriteIcon,
    }
}

export const setSelectedColourwayAction = (colourwayItemNumber: string): SetSelectedColourway => {
    return {
        type: SET_SELECTED_COLOURWAY,
        colourwayItemNumber,
    }
}

export function canLoadVisibleColourwaysSelector(state: {productSummary: ProductSummaryState}) {
    return state.productSummary.canLoadVisibleColourways
}

export const selectCanLoadVisibleColourways = createSelector(canLoadVisibleColourwaysSelector, val => val)

export const setEnableFav = (enableFav: boolean) => ({
    type: ENABLE_FAV,
    enableFav,
})
export const setEnableReviewStars = (enableReviewStars: boolean) => ({
    type: SET_ENABLE_REVIEW_STARS,
    enableReviewStars,
})
export const setEnableBrandDisplay = (enableBrandDisplay: boolean) => ({
    type: SET_ENABLE_BRAND_DISPLAY,
    enableBrandDisplay,
})

export const setFavouritedColourways = (favouritedColourways: string[]) => ({
    type: SET_FAVOURITED_COLOURWAYS,
    favouritedColourways,
})

export const setShowFavErrorToolTip = (errorType: FavErrorToolTipType | null) => ({
    type: SHOW_FAV_ERROR_TOOLTIP,
    errorType,
})

interface UpdateProductSummaryParameters {
    headers: IncomingHttpHeaders
    itemNumber: string
    type: SummaryType
    showNewIn?: string
}

export const updateProductSummary = async (
    {dispatch}: Store,
    {headers, itemNumber, showNewIn, type}: UpdateProductSummaryParameters,
    enabledSearchDescription: boolean,
) => {
    try {
        dispatch(setEnabledSearchDescription(enabledSearchDescription))
        const {response, responseHeaders} = await getProductSummary(headers, itemNumber, type)
        response.type = response.type.toLowerCase() as SummaryType
        response.showNewIn = !!(showNewIn && showNewIn === "true")
        dispatch(setProductSummaryDataAction(response))
        return responseHeaders
    } catch (error) {
        if (error.response) {
            dispatch(setProductSummaryDataAction(initialState.summaryData))
            return {errorStatusCode: error.response.status}
        }
        logger.error(error)
        dispatch(setProductSummaryDataAction(initialState.summaryData))
    }
}

export const updateFavourites =
    (getFavouritesData: GetFavouritesCallbackContractModel, favType: typeof FAV_ADD | typeof FAV_REMOVE) =>
    (dispatch: Dispatch, getState: GetStateFn) => {
        const state = getState()
        if (getFavouritesData.success) {
            dispatch(
                setFavouritedColourways(
                    shoppingListItemsToFavouritedColourways(getFavouritesData?.data?.ShoppingListItems),
                ),
            )
            dispatch(setLoadingFav(false))
            const eventActionType = favType === FAV_ADD ? GTM_ADD_FAVOURITES : GTM_REMOVE_FAVOURITES
            publishFavTrackEvent(state, eventActionType)
        } else {
            const errorType =
                getFavouritesData?.errorMessage === FAV_ERROR_LIMIT_EXCEEDED
                    ? FavErrorToolTipType.MaxLimit
                    : FavErrorToolTipType.Error
            dispatch(setShowFavErrorToolTip(errorType))
            const eventActionType = favType === FAV_ADD ? GTM_ERROR_ADD_FAVOURITES : GTM_ERROR_REMOVE_FAVOURITES

            publishFavTrackEvent(state, eventActionType)

            logger.error("Product summary: favourites api failed")
            dispatch(setLoadingFav(false))
        }
    }

export const publishFavTrackEvent = (state: State, eventActionType: string) => {
    PublishTrackEvent(GTM_FAVOURITES, {
        event: GTM_FAVOURITES,
        favourites: {
            category: GTM_FAVOURITES,
            action: eventActionType,
            label: getProductTitle(state),
            option: state.productSummary.summaryData.id,
        },
    })
}
export const updateEnablingFavourites = (dispatch: Dispatch, enableFav: boolean): any => {
    dispatch(setEnableFav(enableFav))
}
export const updateEnablingReviewStars = (dispatch: Dispatch, enableReviewStars: boolean): any => {
    dispatch(setEnableReviewStars(enableReviewStars))
}
export const updateEnablingBrandDisplay = (dispatch: Dispatch, enableBrandDisplay: boolean): any => {
    dispatch(setEnableBrandDisplay(enableBrandDisplay))
}

export const getProductId = (state: State) => {
    return state.productSummary.summaryData.id
}

const reducer = (
    state: ProductSummaryState = initialState,
    action:
        | SetSummaryData
        | SetSelectedColourway
        | SetEnableFav
        | SetEnableReviewStars
        | SetShowFavErrorToolTip
        | SetEnableSearchDescription
        | SetLoadingFav
        | SetFavouritedColourways
        | SetAnimateFavouriteIcon
        | SetEnableBrandDisplay,
): ProductSummaryState => {
    switch (action.type) {
        case SET_SUMMARY_DATA:
            return {
                ...state,
                summaryData: {
                    ...action.data,
                },
            }
        case SET_SELECTED_COLOURWAY:
            return {
                ...state,
                summaryData: {
                    ...state.summaryData,
                    colourways: (state.summaryData.colourways as any[]).map(colourway => ({
                        ...colourway,
                        selected: action.colourwayItemNumber === colourway.id,
                    })),
                },
                canLoadVisibleColourways: !state.hasLoadedVisibleColourways,
                hasLoadedVisibleColourways: true,
                isFav: !!(state.summaryData.colourways as any[]).filter(
                    colourway => action.colourwayItemNumber === colourway.id && colourway.isFav,
                ).length,
            }
        case SET_FAVOURITED_COLOURWAYS: {
            return {
                ...state,
                summaryData: {
                    ...state.summaryData,
                    colourways: (state.summaryData.colourways as any[]).map(colourway => ({
                        ...colourway,
                        isFav: action.favouritedColourways.includes(colourway.id),
                    })),
                },
                isFav: !!(state.summaryData.colourways as any[]).filter(
                    colourway => action.favouritedColourways.includes(colourway.id) && colourway.selected,
                ).length,
            }
        }
        case ENABLE_FAV:
            return {...state, enableFav: action.enableFav}
        case SET_ENABLE_REVIEW_STARS:
            return {...state, enableReviewStars: action.enableReviewStars}
        case SET_ENABLE_BRAND_DISPLAY:
            return {...state, enableBrandDisplay: action.enableBrandDisplay}
        case SET_LOADING_FAV:
            return {...state, isLoadingFav: action.isLoadingFav}
        case SET_ANIMATE_FAVOURITE_ICON:
            return {...state, animateFavouriteIcon: action.animateFavouriteIcon}
        case SHOW_FAV_ERROR_TOOLTIP:
            return {...state, showFavErrorToolTip: action.errorType}
        case SET_ENABLE_SEARCH_DESCRIPTION:
            return {...state, enabledSearchDesc: action.enabledSearchDesc}
        default:
            return state
    }
}

export default reducer
