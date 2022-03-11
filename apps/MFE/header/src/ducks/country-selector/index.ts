import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {getCountriesList} from "../../api/countries"
import {Country as CountryType} from "../../models/countryselector"
import {SettingsSdkKeys} from "../../models/settings"
import {TERRITORY_HEADER, LANGUAGE_HEADER, BFPO, ENGLISH_LANGUAGE_CODE} from "../../config/constants"
import type State from "../state"
import {formatCdnPath} from "../../utils/getCdnUrl"

export const SHOW_COUNTRY_SELECT = "SHOW_COUNTRY_SELECT"
export const SHOW_DRAWER = "SHOW_DRAWER"
export const GET_COUNTRIES_LIST = "GET_COUNTRIES_LIST"
export const SET_COUNTRY_SELECTOR = "SET_COUNTRY_SELECTOR"
export const SELECT_COUNTRY = "SELECT_COUNTRY"
export const SET_DEFAULT_COUNTRY_CODE = "SET_DEFAULT_COUNTRY_CODE"
export const SELECT_LANGUAGE = "SELECT_LANGUAGE"
export const SHOW_BFPO_FLAG = "SHOW_BFPO_FLAG"
export const SET_COUNTRY_SELECTOR_ENDPOINT = "SET_COUNTRY_SELECTOR_ENDPOINT"
export const COUNTRY_CHANGE_REQ = "COUNTRY_CHANGE_REQ"

export type CountrySelectorDuckState = {
    showCountrySelector: boolean
    countriesList: CountryType[] | null
    isActive: boolean
    showOverlay: boolean
    selectedCountry: CountryType | null
    selectedLanguage: string | null
    defaultCountryCode: string | null
    showBFPOFlag: boolean
    loaded: boolean
    requestedCountryChange: boolean
    countrySelectorEndpoint: string
}

type Actions = {
    type:
        | typeof SHOW_COUNTRY_SELECT
        | typeof SET_COUNTRY_SELECTOR
        | typeof SELECT_LANGUAGE
        | typeof SELECT_COUNTRY
        | typeof SET_DEFAULT_COUNTRY_CODE
        | typeof SHOW_DRAWER
        | typeof SHOW_BFPO_FLAG
        | typeof GET_COUNTRIES_LIST
        | typeof COUNTRY_CHANGE_REQ
        | typeof SET_COUNTRY_SELECTOR_ENDPOINT
    payload: boolean | string | CountryType
}

const getCountrySelectorActive = (configuration: any) =>
    configuration[SettingsSdkKeys.countrySelector]?.ShowCountrySelector === true

const getBFPOActive = (configuration: any) => configuration[SettingsSdkKeys.countrySelector]?.ShowBFPOFlag === true
const getCountrySelectorEndpoint = (configuration: any) => configuration[SettingsSdkKeys.countrySelector]?.Endpoint

export const updateCountrySelectorSettings = (store: Store, configuration: any) => {
    store.dispatch(setCountrySelectorActive(getCountrySelectorActive(configuration)))
    store.dispatch(setShowBFPO(getBFPOActive(configuration)))
    store.dispatch(setCountrySelectorEndpoint(getCountrySelectorEndpoint(configuration)))
}

export const changeCountry = (countryCode: string) => (dispatch: any, getState: any) => {
    const {
        countrySelector: {countriesList},
    } = getState() as State
    const searchCountryCode = countryCode

    const selected = countriesList?.find(c => c.CountryCode === searchCountryCode)
    if (selected) {
        dispatch(selectCountry(selected))
        dispatch(selectLanguage(selected.DefaultLanguageName))
    }
}

export const setDefaultCountryCode = (countryCode: string) => (dispatch: any) => {
    const formattedCountryCode = countryCode.trim().toUpperCase()
    dispatch(setDefaultCountryCodeAction(formattedCountryCode))
    dispatch(changeCountry(formattedCountryCode))
}

export const selectCountry = (payload: CountryType): Actions => ({
    type: SELECT_COUNTRY,
    payload,
})

export const selectLanguage = (payload: string): Actions => ({
    type: SELECT_LANGUAGE,
    payload,
})

const setDefaultCountryCodeAction = (payload: string): Actions => ({
    type: SET_DEFAULT_COUNTRY_CODE,
    payload,
})

export const showCountrySelector = (payload: boolean): Actions => ({
    type: SHOW_COUNTRY_SELECT,
    payload,
})

const showDrawerAction = (payload: boolean): Actions => ({
    type: SHOW_DRAWER,
    payload,
})

export const setCountrySelectorActive = (payload: boolean): Actions => ({
    type: SET_COUNTRY_SELECTOR,
    payload,
})

export const setShowBFPO = (payload: boolean): Actions => ({
    type: SHOW_BFPO_FLAG,
    payload,
})

export const setCountrySelectorEndpoint = (payload: string): Actions => ({
    type: SET_COUNTRY_SELECTOR_ENDPOINT,
    payload,
})

export const toggleCountryChangeReq = (payload: boolean): Actions => ({
    type: COUNTRY_CHANGE_REQ,
    payload,
})

export const requestCountryChange = (value: boolean) => (dispatch: any) => {
    dispatch(toggleCountryChangeReq(value))
}

export const closeCountrySelector = () => (dispatch: any) => {
    dispatch(showCountrySelector(false))
}

export const openDrawer = (showOverlay: boolean) => (dispatch: any) => {
    dispatch(showDrawerAction(showOverlay))
    dispatch(showCountrySelector(true))
}

export const getCountriesListThunk = () => async (dispatch: any, getState: () => State) => {
    try {
        const {
            request: {headers, siteUrl},
            countrySelector: {showBFPOFlag, countrySelectorEndpoint},
        } = getState()
        const data = await getCountriesList(siteUrl, headers!, countrySelectorEndpoint)

        let filteredData = data.filter(c => !c.HideInDropdown && c.Languages?.length !== 0)

        const getIconUrl = (area: string) => formatCdnPath(`/icons/shared/countryflags/${area.toLowerCase()}.png`)

        if (showBFPOFlag) {
            filteredData = filteredData.map(country => {
                const countryObject = {...country}
                if (countryObject.Name === "") {
                    countryObject.Name = BFPO
                    countryObject.CountryCode = BFPO
                    countryObject.DefaultLanguageName = ENGLISH_LANGUAGE_CODE
                }
                return countryObject
            })
        } else {
            filteredData = filteredData.filter(c => c.Name !== "")
        }
        const filteredDataWithIconUrl = filteredData.map(country => ({
            ...country,
            iconUrl: getIconUrl(country.Name),
        }))
        const finalFilteredData = filteredDataWithIconUrl.map(c => ({...c, CountryCode: c.CountryCode.toUpperCase()}))
        const territory = headers![TERRITORY_HEADER] as string
        const language = headers![LANGUAGE_HEADER] as string
        // latest state is needed after the API is called to get the correct defaultCountryCode
        const {
            countrySelector: {defaultCountryCode},
        } = getState()
        const initialCountryCode = (defaultCountryCode ?? territory).toUpperCase()
        const country = finalFilteredData.find(c => c.CountryCode === initialCountryCode)
        if (country) {
            dispatch(selectCountry(country))
        }
        if (country && defaultCountryCode) {
            dispatch(selectLanguage(country.DefaultLanguageName))
        } else {
            dispatch(selectLanguage(language))
        }
        dispatch({
            type: GET_COUNTRIES_LIST,
            payload: finalFilteredData,
        })
    } catch (error) {
        dispatch({
            type: GET_COUNTRIES_LIST,
            payload: null,
        })
        logger.error(error)
    }
}

export const redirectToAlternativeLanguageThunk = () => async (dispatch: any, getState: () => State) => {
    const {
        countrySelector: {loaded},
    } = getState()

    if (!loaded) {
        await dispatch(getCountriesListThunk())
    }

    const {
        countrySelector: {selectedCountry, selectedLanguage},
    } = getState()

    const selectedLang = selectedCountry?.Languages.find(l => l.Name !== selectedLanguage)
    if (selectedLang) {
        window.location.href = selectedLang.TargetUrl
    }
}

const initialState: CountrySelectorDuckState = {
    showCountrySelector: false,
    countriesList: null,
    isActive: true,
    showOverlay: true,
    selectedCountry: null,
    selectedLanguage: null,
    defaultCountryCode: null,
    showBFPOFlag: false,
    loaded: false,
    requestedCountryChange: false,
    countrySelectorEndpoint: "/ChannelSelector/GetCountrySelection",
}

const reducer = (state: CountrySelectorDuckState = initialState, action) => {
    switch (action.type) {
        case SHOW_COUNTRY_SELECT:
            return {...state, showCountrySelector: action.payload}
        case SELECT_COUNTRY:
            return {...state, selectedCountry: action.payload}
        case SELECT_LANGUAGE:
            return {...state, selectedLanguage: action.payload}
        case GET_COUNTRIES_LIST:
            return {...state, countriesList: action.payload, loaded: true}
        case SET_COUNTRY_SELECTOR:
            return {...state, isActive: action.payload}
        case SET_DEFAULT_COUNTRY_CODE:
            return {...state, defaultCountryCode: action.payload}
        case SHOW_DRAWER:
            return {...state, showOverlay: action.payload}
        case SHOW_BFPO_FLAG:
            return {...state, showBFPOFlag: action.payload}
        case COUNTRY_CHANGE_REQ:
            return {...state, requestedCountryChange: action.payload}
        case SET_COUNTRY_SELECTOR_ENDPOINT:
            return {...state, countrySelectorEndpoint: action.payload}
        default:
            return state
    }
}
export default reducer
