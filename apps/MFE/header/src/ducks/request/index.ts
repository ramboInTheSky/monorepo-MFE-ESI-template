import {getSettingsHeaders} from "@monorepo/utils"
import {IncomingHttpHeaders} from "http"
import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {SettingsSdkKeys} from "../../models/settings"
import {QUERY_PARAMETER_TIME_MACHINE_DATE, COUNTRY_GB, TERRITORY_HEADER} from "../../config/constants"

import getConfigurationValue from "../../utils/getConfigurationValue"

export const SET_REQUEST = "SET_REQUEST"
export const SET_COOKIE_DOMAIN = "SET_COOKIE_DOMAIN"
export const SET_GEOLOCATION = "SET_GEOLOCATION"
export const SET_COOKIE_INFO = "SET_COOKIE_INFO"
export const SET_USE_TIME_MACHINE_COOKIE = "SET_USE_TIME_MACHINE_COOKIE"
export const SET_TERRITORY_DETAILS = "SET_TERRITORY_DETAILS"
export const SET_BLOOMREACH_INFO = "SET_BLOMREACH_INFO"
export const SET_MONETATE_INFO = "SET_MONETATE_INFO"
export const SET_SALE_WARNING_MODAL = "SET_SALE_WARNING_MODAL"

interface SetRequest {
    type: typeof SET_REQUEST
    payload: any
}

interface SetCookieDomain {
    type: typeof SET_COOKIE_DOMAIN
    payload: string
}

interface SetGeolocationData {
    type: typeof SET_GEOLOCATION
    payload: GeolocationData
}

interface SetUseTimeMachineCookie {
    type: typeof SET_USE_TIME_MACHINE_COOKIE
    payload: boolean
}

interface SetBrCookieInfo {
    type: typeof SET_COOKIE_INFO
    payload: CookieData
}

interface SetBloomreachInfo {
    type: typeof SET_BLOOMREACH_INFO
    payload: BloomreachData
}

interface SetTerritoryDetails {
    type: typeof SET_TERRITORY_DETAILS
    payload: TerritoryDetails
}

interface SetMonetateInfo {
    type: typeof SET_MONETATE_INFO
    payload: MonetateData
}
interface SetSaleWarningBag {
    type: typeof SET_SALE_WARNING_MODAL
    payload: boolean
}

type Actions =
    | SetRequest
    | SetGeolocationData
    | SetBrCookieInfo
    | SetUseTimeMachineCookie
    | SetTerritoryDetails
    | SetBloomreachInfo
    | SetMonetateInfo
    | SetCookieDomain
    | SetSaleWarningBag

export interface RequestDuckState {
    headers: IncomingHttpHeaders | null
    siteUrl: string
    url: string | null
    timeMachineDate: string | null
    isInternationalCountry: boolean
    geolocationBaseUrl: string
    geolocationVersion: number
    bloomReachCachingCookieList: string
    bloomReachCachingEnabled: boolean
    bloomreachGroupLocation: string
    bloomreachDomainKey: string
    useTimeMachineCookie: boolean
    currencyCode: string
    fullTerritoryName: string
    monetateSDK: boolean
    accountMonetateSDK: string
    cookieDomain: string
    showSaleWarningBag: boolean
}

const initialState: RequestDuckState = {
    headers: null,
    siteUrl: "",
    url: null,
    timeMachineDate: null,
    isInternationalCountry: false,
    geolocationBaseUrl: "",
    geolocationVersion: 0,
    bloomReachCachingCookieList: "",
    bloomReachCachingEnabled: false,
    bloomreachGroupLocation: "",
    bloomreachDomainKey: "",
    useTimeMachineCookie: false,
    currencyCode: "",
    fullTerritoryName: "",
    monetateSDK: false,
    accountMonetateSDK: "",
    cookieDomain: "",
    showSaleWarningBag: false,
}

export const setRequestAction = (store: Store, request: any) => {
    store.dispatch({
        type: SET_REQUEST,
        payload: request,
    })
}

export const setCokieDomainAction = (store: Store, cookieDomain: string) => {
    store.dispatch({
        type: SET_COOKIE_DOMAIN,
        payload: cookieDomain,
    })
}

export const setSaleWarningModalAction = (store: Store, conf) => {
    const enableSaleWarningModal = getConfigurationValue(conf, SettingsSdkKeys.enableSaleWarningModal, "Value")
    store.dispatch({
        type: SET_SALE_WARNING_MODAL,
        payload: enableSaleWarningModal,
    })
}

interface GeolocationData {
    url: string
    version: number
}

interface CookieData {
    bloomReachCachingCookieList: string
    bloomReachCachingEnabled: boolean
}

interface BloomreachData {
    bloomreachGroupLocation: string
    bloomreachDomainKey: string
}

interface MonetateData {
    monetateEnabled: boolean
}

interface TerritoryDetails {
    currencyCode: string
    fullTerritoryName: string
}

type BrCookieConf = {
    [SettingsSdkKeys.bloomReachCachingCookieList]: any
    [SettingsSdkKeys.bloomReachCachingEnabled]: any
}

type BloomreachConf = {
    [SettingsSdkKeys.bloomreachGroupLocation]: any
    [SettingsSdkKeys.bloomreachDomainKey]: any
}

type MonetateConf = {
    [SettingsSdkKeys.monetateSDK]: any
}

type TerritoryDetailsConf = {
    [SettingsSdkKeys.currencyCode]: any
    [SettingsSdkKeys.fullTerritoryName]: any
}

const setUseTimeMachineCookie = (payload: boolean): Actions => ({
    type: SET_USE_TIME_MACHINE_COOKIE,
    payload,
})
const setGeolocationUrl = (payload: GeolocationData): Actions => ({
    type: SET_GEOLOCATION,
    payload,
})

const setBrCookieInfo = (payload: CookieData): Actions => ({
    type: SET_COOKIE_INFO,
    payload,
})

const setBloomreachInfo = (payload: BloomreachData): Actions => ({
    type: SET_BLOOMREACH_INFO,
    payload,
})

const setTerritoryDetails = (payload: TerritoryDetails): Actions => ({
    type: SET_TERRITORY_DETAILS,
    payload,
})

const setMonetateInfo = (payload: MonetateData): Actions => ({
    type: SET_MONETATE_INFO,
    payload,
})

export const setTerritoryDetailsAction = (store: Store, configuration: TerritoryDetailsConf) => {
    const currencyCode = configuration[SettingsSdkKeys.currencyCode]?.Value
    const fullTerritoryName = configuration[SettingsSdkKeys.fullTerritoryName]?.Value
    store.dispatch(setTerritoryDetails({currencyCode, fullTerritoryName}))
}

export const setMonetateInfoAction = (store: Store, configuration: MonetateConf) => {
    const monetateSDK = configuration[SettingsSdkKeys.monetateSDK]?.enabled
    store.dispatch(setMonetateInfo({monetateEnabled: monetateSDK}))
}

export const setBrCookieInfoAction = (store: Store, configuration: BrCookieConf) => {
    const bloomReachCachingCookieList = configuration[SettingsSdkKeys.bloomReachCachingCookieList]?.Value
    const bloomReachCachingEnabled = configuration[SettingsSdkKeys.bloomReachCachingEnabled]?.Value
    store.dispatch(setBrCookieInfo({bloomReachCachingCookieList, bloomReachCachingEnabled}))
}

export const setBloomreachInfoAction = (store: Store, configuration: BloomreachConf) => {
    const bloomreachGroupLocation = configuration[SettingsSdkKeys.bloomreachGroupLocation]?.Value
    const bloomreachDomainKey = configuration[SettingsSdkKeys.bloomreachDomainKey]?.Value
    store.dispatch(setBloomreachInfo({bloomreachGroupLocation, bloomreachDomainKey}))
}

const getGeolocationVersion = (configuration: any) => configuration[SettingsSdkKeys.geolocationVersion]?.Value

export const setGeolocationUrlAction = (store: Store, url: string, configuration: any) => {
    const version = getGeolocationVersion(configuration)
    store.dispatch(setGeolocationUrl({url, version}))
}
export const setUseTimeMachineCookieAction = (store: Store, useTimeMachineCookie: string) => {
    const acceptableValues = ["true", "false"]
    const lowerCaseUseTMCookie = useTimeMachineCookie.toLowerCase()
    if (acceptableValues.includes(lowerCaseUseTMCookie)) {
        const useTimeMachineCookieValue = lowerCaseUseTMCookie === "true"
        store.dispatch(setUseTimeMachineCookie(useTimeMachineCookieValue))
    } else {
        logger.warn(
            `Warning: invalid value set for use time machine cookie: ${useTimeMachineCookie} should be either 'true' or 'false'. useTimeMachineCookie is set to false`,
        )
    }
}

const reducer = (state: RequestDuckState = initialState, action: Actions): RequestDuckState => {
    switch (action.type) {
        case SET_REQUEST:
            return {
                ...state,
                headers: getSettingsHeaders(action.payload.headers),
                siteUrl: action.payload.siteUrl.url,
                url: action.payload.url,
                timeMachineDate: action.payload.query[QUERY_PARAMETER_TIME_MACHINE_DATE],
                isInternationalCountry:
                    action.payload.headers![TERRITORY_HEADER] &&
                    action.payload.headers![TERRITORY_HEADER].toLowerCase() !== COUNTRY_GB,
            }
        case SET_COOKIE_DOMAIN:
            return {...state, cookieDomain: action.payload}
        case SET_GEOLOCATION:
            return {...state, geolocationBaseUrl: action.payload.url, geolocationVersion: action.payload.version}
        case SET_USE_TIME_MACHINE_COOKIE:
            return {...state, useTimeMachineCookie: action.payload}
        case SET_COOKIE_INFO:
            return {
                ...state,
                bloomReachCachingCookieList: action.payload.bloomReachCachingCookieList,
                bloomReachCachingEnabled: action.payload.bloomReachCachingEnabled,
            }
        case SET_BLOOMREACH_INFO:
            return {
                ...state,
                bloomreachGroupLocation: action.payload.bloomreachGroupLocation,
                bloomreachDomainKey: action.payload.bloomreachDomainKey,
            }
        case SET_TERRITORY_DETAILS:
            return {
                ...state,
                currencyCode: action.payload.currencyCode,
                fullTerritoryName: action.payload.fullTerritoryName,
            }
        case SET_MONETATE_INFO:
            return {...state, monetateSDK: action.payload.monetateEnabled}
        case SET_SALE_WARNING_MODAL:
            return {...state, showSaleWarningBag: action.payload}
        default:
            return state
    }
}

export default reducer
