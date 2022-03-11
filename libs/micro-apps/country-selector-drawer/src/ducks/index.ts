import {applyMiddleware, createStore, Store} from "redux"
import logger from "@monorepo/core-logger"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {Country as CountryType} from "../models/countryselector"
import {getDefaultLanguage} from "../utils/countryUtils"

export const SHOW_COUNTRY_SELECT = "SHOW_COUNTRY_SELECT"
export const SHOW_DRAWER = "SHOW_DRAWER"
export const GET_COUNTRIES_LIST = "GET_COUNTRIES_LIST"
export const SET_COUNTRY_SELECTOR = "SET_COUNTRY_SELECTOR"
export const SELECT_COUNTRY = "SELECT_COUNTRY"
export const SET_DEFAULT_COUNTRY_CODE = "SET_DEFAULT_COUNTRY_CODE"
export const SELECT_LANGUAGE = "SELECT_LANGUAGE"
export const SHOW_BFPO_FLAG = "SHOW_BFPO_FLAG"

export type State = {
    showCountrySelector: boolean
    countriesList: CountryType[] | null
    showOverlay: boolean
    selectedCountry: CountryType | null
    selectedLanguage: string | null
    defaultCountryCode: string | null
    showBFPOFlag: boolean
    loaded: boolean
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
    payload: boolean | string | CountryType
}

const getCountrySelectorActive = (configuration: any) =>
    configuration["header.frontend.countrySelector"]?.ShowCountrySelector === true

const getBFPOActive = (configuration: any) =>
    configuration["header.frontend.countrySelector"]?.ShowBFPOFlag === true

export const updateCountrySelectorSettings = (store: Store, configuration: any) => {
    store.dispatch(setCountrySelectorActive(getCountrySelectorActive(configuration)))
    store.dispatch(setShowBFPO(getBFPOActive(configuration)))
}

export const changeCountry = (countryCode: string) => (dispatch: any, getState: any) => {
    const {countriesList} = getState() as State
    const searchCountryCode = countryCode

    const selected = countriesList?.find(c => c.countryCode === searchCountryCode)
    if (selected) {
        const defaultLanguage = getDefaultLanguage(selected)
        dispatch(selectCountry(selected))
        dispatch(selectLanguage(defaultLanguage.name))
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

export const closeCountrySelector = () => (dispatch: any) => {
    dispatch(showCountrySelector(false))
}

export const openDrawer = (showOverlay: boolean) => (dispatch: any) => {
    dispatch(showDrawerAction(showOverlay))
    dispatch(showCountrySelector(true))
}

export const getCountriesListThunk =
    // eslint-disable-next-line @typescript-eslint/require-await
    (cdnBaseUrl: string, territory: string, language: string) => async (dispatch: any, getState: () => State) => {
        try {
            const {showBFPOFlag} = getState()

            // TODO Api goes here: const data = await getCountriesList(siteUrl, headers)
            const data = []

            let filteredData = data.filter(c => c.languages?.length !== 0)

            const getIconUrl = (area: string) =>
                `${cdnBaseUrl.replace(/\/$/, "")}/icons/shared/countryflags/${area.toLowerCase()}.png`

            if (!showBFPOFlag) {
                filteredData = filteredData.filter(c => !c.isNonStandard)
            }

            const filteredDataWithIconUrl = filteredData.map(country => ({
                ...country,
                iconUrl: getIconUrl(country.name),
            }))
            const finalFilteredData = filteredDataWithIconUrl.map(c => ({
                ...c,
                countryCode: c.countryCode.toUpperCase(),
            }))
            // latest state is needed after the API is called to get the correct defaultCountryCode
            const {defaultCountryCode} = getState()
            const initialCountryCode = (defaultCountryCode ?? territory).toUpperCase()
            const country = finalFilteredData.find(c => c.countryCode === initialCountryCode)
            if (country) {
                dispatch(selectCountry(country))
            }
            if (country && defaultCountryCode) {
                const defaultLanguageName = country.languages.find(l => l.default).name
                dispatch(selectLanguage(defaultLanguageName))
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

export const redirectToAlternativeLanguageThunk =
    (cdnBaseUrl: string, territory: string, language: string) => async (dispatch: any, getState: () => State) => {
        const {loaded} = getState()

        if (!loaded) {
            await dispatch(getCountriesListThunk(cdnBaseUrl, territory, language))
        }

        const {selectedCountry, selectedLanguage} = getState()

        const selectedLang = selectedCountry?.languages.find(l => l.name !== selectedLanguage)
        if (selectedLang) {
            window.location.href = selectedLang.targetUrl
        }
    }

const initialState: State = {
    showCountrySelector: false,
    countriesList: null,
    showOverlay: true,
    selectedCountry: null,
    selectedLanguage: null,
    defaultCountryCode: null,
    showBFPOFlag: false,
    loaded: false,
}

const reducer = (state: State = initialState, action) => {
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
        default:
            return state
    }
}

export default reducer

const makeStore = (initState?: State) => {
    return createStore(reducer, initState, composeWithDevTools(applyMiddleware(thunk)))
}

export const store = makeStore(initialState)
