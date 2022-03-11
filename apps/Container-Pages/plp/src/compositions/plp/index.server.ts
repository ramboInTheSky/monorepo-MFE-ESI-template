import {Store} from "redux"
import Logger from "@monorepo/core-logger"

import getFilterCookie from "../../utils/getFilterCookie"
import getDebounceTime from "../../utils/getDebounceTime"
import {getItemsPerPage} from "../../utils/getItemsPerPage"
import {getItemsPerRowConfig} from "../../utils/getItemsPerRow"
import getFetchTriggerOffset from "../../utils/getFetchTriggerOffset"
import getFetchTriggerOffsetRows from "../../utils/getFetchTriggerOffsetRows"
import getFeatureSwitch from "../../utils/getFeatureSwitch"
import {GenericSearchResponse} from "../../models/searchApi"
import redirectErrorPage from "../../utils/redirectErrorPage"
import getBloomreachCookies from "../../utils/getBloomreachCookies"
import getSubsequentPagesNonLazyloadRows from "../../utils/getSubsequentPagesNonLazyloadRows"
import getHideSearchFilterModalElements from "../../utils/getHideSearchFilterModalElements"
import {
    updateProducts,
    setInitialPageRangeFromPageAction,
    setDebounceTimeAction,
    setSingleOptionFacetList,
    assignSearchStateAction,
    setBloomreachCookiesInitialLoad,
} from "../../ducks/search"
import {setHideSearchFilterModalElements} from "../../ducks/viewAllModal"
import {deviceBreakpoints} from "../../models/ViewportSize"
import {SettingsSdkKeys} from "../../models/settings"

export interface GetServerSideResponse {
    isConfError: boolean
    searchResponse?: GenericSearchResponse
}

export const getServerSideProps = async (req: any, res: any, store: Store): Promise<GetServerSideResponse> => {
    try {
        const state = store.getState()
        const {page, viewportSize} = state.request
        const cookie = getFilterCookie(req, res, store)
        const debounceTime = getDebounceTime(res.locals.configuration)
        const fetchOffset = getFetchTriggerOffset(res.locals.configuration)
        const fetchTriggerOffsetRows = getFetchTriggerOffsetRows(res.locals.configuration)
        const {enablePageInFilters} = getFeatureSwitch(res.locals.configuration)
        const itemsPerPage = getItemsPerPage(res.locals.configuration)
        const itemsPerRow = getItemsPerRowConfig(res.locals.configuration)
        const hideSearchFilterModalElementsConfig = getHideSearchFilterModalElements(res.locals.configuration)
        const subsequentPagesNonLazyloadRows = getSubsequentPagesNonLazyloadRows(res.locals.configuration)
        const subsequentItemsPerPage = itemsPerPage.subsequent[viewportSize]
        const initialItemsPerPage = page === 1 ? itemsPerPage.initial[viewportSize] : subsequentItemsPerPage
        const fetchTriggerOffset = enablePageInFilters ? fetchOffset.inPageFiltersEnabled : fetchOffset.default

        const bloomreachCookies = getBloomreachCookies(req)

        store.dispatch(setBloomreachCookiesInitialLoad(bloomreachCookies))
        store.dispatch(setHideSearchFilterModalElements(hideSearchFilterModalElementsConfig))
        store.dispatch(setInitialPageRangeFromPageAction(page))
        store.dispatch(setDebounceTimeAction(debounceTime))

        store.dispatch(setSingleOptionFacetList(res.locals.configuration[SettingsSdkKeys.SingleOptionFacetList]?.Value))

        store.dispatch(
            assignSearchStateAction({
                initialItemsPerPage,
                fetchTriggerOffset,
                fetchTriggerOffsetRows,
                itemsPerRow,
                currentBreakpoint: deviceBreakpoints[viewportSize],
                itemsPerPage,
                subsequentPagesNonLazyloadRows,
            }),
        )

        const searchResponse = await updateProducts(store, cookie)

        return {isConfError: false, searchResponse}
    } catch (err) {
        Logger.error(new Error(err))
        res.redirect(302, redirectErrorPage(res.req.siteUrl.url))
        return {isConfError: true}
    }
}

export default getServerSideProps
