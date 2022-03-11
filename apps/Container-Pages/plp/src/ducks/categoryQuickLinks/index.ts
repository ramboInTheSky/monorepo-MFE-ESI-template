import {Dispatch, AnyAction} from "redux"
import env from "../../config/env"
import State from "../../models/State"
import quickLinksConfig from "../../config/categoryQuickLinks.json"
import {REGION_INTERNATIONAL, REGION_UK, TERRITORY_GB} from "../../config/constants"
import {CategoryQuickLinksData, CategoryQuickLinksState, CategoryQuickLinkItem} from "./types"
import {selectRealm, selectTerritory} from "../request"

type GetStateFn = () => State

const {REACT_APP_CDN_BASEURL} = env

export const ASSIGN_CATEGORY_QUICK_LINKS = "ASSIGN_CATEGORY_QUICK_LINKS"

interface AssignCategoryQuickLinks {
    type: typeof ASSIGN_CATEGORY_QUICK_LINKS
    realm: string
    territory: string
    siteUrl: string
}

export const initialState: CategoryQuickLinksState = {
    items: [],
}

export function assignCategoryQuickLinks(realm: string, territory: string, siteUrl: string): AssignCategoryQuickLinks {
    return {
        type: ASSIGN_CATEGORY_QUICK_LINKS,
        realm,
        territory,
        siteUrl,
    }
}

export function populateCategoryQuickLinks() {
    return (((dispatch: Dispatch, getState: GetStateFn) => {
        const state = getState()
        const realm = selectRealm(state)
        const territory = selectTerritory(state)
        const {siteUrl} = state.request

        dispatch(assignCategoryQuickLinks(realm, territory, siteUrl))
    }) as any) as AnyAction
}

export function getCategoryQuickLinks(
    realm: string,
    territory: string,
    siteUrl: string,
    config: CategoryQuickLinksData,
): CategoryQuickLinkItem[] {
    const stringData = JSON.stringify(config)
        .replace(/{CDN_URL}/g, REACT_APP_CDN_BASEURL)
        .replace(/{SITE_URL}/g, siteUrl)

    const data = JSON.parse(stringData) as CategoryQuickLinksData
    const region = territory === TERRITORY_GB ? REGION_UK : REGION_INTERNATIONAL
    if (!data[realm] || !data[realm][region]) return []
    return data[realm][region]
}

const reducer = (
    state: CategoryQuickLinksState = initialState,
    action: AssignCategoryQuickLinks,
): CategoryQuickLinksState => {
    switch (action.type) {
        case ASSIGN_CATEGORY_QUICK_LINKS: {
            return {
                ...state,
                items: getCategoryQuickLinks(action.realm, action.territory, action.siteUrl, quickLinksConfig),
            }
        }
        default: {
            return state
        }
    }
}

export default reducer
