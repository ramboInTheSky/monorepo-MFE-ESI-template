import {Store} from "redux"
import {
    mockCountriesData,
    mockCountriesDataWithBFPOCorrected,
    mockCountriesDataWithoutBFPO,
} from "../../../__mocks__/mockCountryData"
import reducer, {
    closeCountrySelector,
    openDrawer,
    changeCountry,
    requestCountryChange,
    SELECT_COUNTRY,
    SELECT_LANGUAGE,
    SHOW_COUNTRY_SELECT,
    SET_COUNTRY_SELECTOR,
    GET_COUNTRIES_LIST,
    COUNTRY_CHANGE_REQ,
    updateCountrySelectorSettings,
    getCountriesListThunk,
    setDefaultCountryCode,
    SHOW_DRAWER,
    SET_DEFAULT_COUNTRY_CODE,
    SHOW_BFPO_FLAG,
    redirectToAlternativeLanguageThunk,
} from "."

const mockStoreDispatch = jest.fn()
const mockStoreGetState = jest.fn(() => ({
    countrySelector: {
        showCountrySelector: true,
        isActive: false,
        countriesList: mockCountriesData,
        defaultCountryCode: null,
        showBFPOFlag: true,
    },
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
}))
const mockStoreGetDefaultCountryState = jest.fn(() => ({
    countrySelector: {
        showCountrySelector: true,
        isActive: false,
        countriesList: mockCountriesData,
        defaultCountryCode: "GB",
        showBFPOFlag: true,
    },
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
}))

const mockStoreGetDefaultCountryStateWithoutBFPO = jest.fn(() => ({
    countrySelector: {
        showCountrySelector: true,
        isActive: false,
        countriesList: mockCountriesDataWithoutBFPO,
        defaultCountryCode: "GB",
        showBFPOFlag: false,
    },
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
}))

const mockStoreSelectedLanguageGetState = jest.fn(() => ({
    countrySelector: {
        showCountrySelector: true,
        isActive: false,
        countriesList: mockCountriesData,
        defaultCountryCode: null,
        showBFPOFlag: true,
        selectedCountry: mockCountriesData[0],
        selectedLanguage: "en",
        loaded: true,
    },
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
}))

const mockStoreGetStateError = jest.fn(() => ({
    countrySelector: {showCountrySelector: true, isActive: false, countriesList: null, showBFPOFlag: true},
}))

const mockStore = {
    dispatch: mockStoreDispatch,
    getState: mockStoreGetState,
}

const mockDefaultCountryStore = {
    dispatch: mockStoreDispatch,
    getState: mockStoreGetDefaultCountryState,
}

const mockDefaultCountryStoreWithoutBFPO = {
    dispatch: mockStoreDispatch,
    getState: mockStoreGetDefaultCountryStateWithoutBFPO,
}

const mockStoreError = {
    dispatch: mockStoreDispatch,
    getState: mockStoreGetStateError,
}

const mockStoreSelectedLanguage = {
    dispatch: mockStoreDispatch,
    getState: mockStoreSelectedLanguageGetState,
}

const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {"x-monorepo-siteurl": "Test siteurl"},
    },
    locals: {
        configuration: {
            "header.frontend.countrySelector": {
                Value: false,
            },
        },
    },
}

jest.mock("../../api/countries", () => ({
    getCountriesList: jest.fn(async () => Promise.resolve(mockCountriesData)),
}))

const initialState = {
    showCountrySelector: false,
    countriesList: null,
    isActive: true,
    selectedCountry: null,
    selectedLanguage: null,
    defaultCountryCode: null,
    showOverlay: true,
    showBFPOFlag: false,
    loaded: false,
    requestedCountryChange: false,
    countrySelectorEndpoint: "/ChannelSelector/GetCountrySelection",
}

describe("reducers: country selector", () => {
    describe("when called initially with no store", () => {
        it("should return the initial state", () => {
            expect(
                reducer(undefined, {
                    type: "Test" as any,
                    payload: "",
                }),
            ).toEqual(initialState)
        })
        it("should set the showCountrySelector when type is SHOW_COUNTRY_SELECT", () => {
            expect(
                reducer(initialState, {
                    type: SHOW_COUNTRY_SELECT,
                    payload: true,
                }),
            ).toEqual({
                ...initialState,
                showCountrySelector: true,
            })
        })
        it("should set the showBFPOFlag when type is SHOW_BFPO_FLAG", () => {
            expect(
                reducer(initialState, {
                    type: SHOW_BFPO_FLAG,
                    payload: true,
                }),
            ).toEqual({
                ...initialState,
                showBFPOFlag: true,
            })
        })
        it("should set the selectedCountry when type is SELECT_COUNTRY", () => {
            expect(
                reducer(initialState, {
                    type: SELECT_COUNTRY,
                    payload: mockCountriesDataWithBFPOCorrected[0],
                }),
            ).toEqual({
                ...initialState,
                selectedCountry: mockCountriesDataWithBFPOCorrected[0],
            })
        })
        it("should set the selectedLanguage when type is SELECT_LANGUAGE", () => {
            expect(
                reducer(initialState, {
                    type: SELECT_LANGUAGE,
                    payload: "nl",
                }),
            ).toEqual({
                ...initialState,
                selectedLanguage: "nl",
            })
        })
        it("should set the countriesList when type is GET_COUNTRIES_LIST", () => {
            expect(
                reducer(initialState, {
                    type: GET_COUNTRIES_LIST,
                    payload: mockCountriesDataWithBFPOCorrected,
                }),
            ).toEqual({
                ...initialState,
                countriesList: mockCountriesDataWithBFPOCorrected,
                loaded: true,
            })
        })
        it("should set requestedCountryChange when type is COUNTRY_CHANGE_REQ", () => {
            expect(
                reducer(initialState, {
                    type: COUNTRY_CHANGE_REQ,
                    payload: true,
                }),
            ).toEqual({
                ...initialState,
                requestedCountryChange: true,
            })
        })

        it(`should set the isActive when type is SET_COUNTRY_SELECTOR`, () => {
            expect(
                reducer(initialState, {
                    type: SET_COUNTRY_SELECTOR,
                    payload: true,
                }),
            ).toEqual({
                ...initialState,
                isActive: true,
            })
        })

        it(`should set the showOverlay when type is SHOW_DRAWER`, () => {
            expect(
                reducer(initialState, {
                    type: SHOW_DRAWER,
                    payload: true,
                }),
            ).toEqual({
                ...initialState,
                showOverlay: true,
            })
        })

        it(`should set the defaultCountryCode when type is SET_DEFAULT_COUNTRY_CODE`, () => {
            expect(
                reducer(initialState, {
                    type: SET_DEFAULT_COUNTRY_CODE,
                    payload: true,
                }),
            ).toEqual({
                ...initialState,
                defaultCountryCode: true,
            })
        })
    })
    describe("Store: Helpers: closeCountrySelector() - ", () => {
        it("should set showCountrySelector to false ", () => {
            const mockDispatch = jest.fn()
            closeCountrySelector()(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: false,
                type: SHOW_COUNTRY_SELECT,
            })
        })
    })

    describe("Store: Helpers: requestCountryChange() - ", () => {
        it("should set showCountrySelector to false ", () => {
            const mockDispatch = jest.fn()
            requestCountryChange(true)(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: true,
                type: COUNTRY_CHANGE_REQ,
            })
        })
    })

    describe("Store: Helpers: setDefaultCountryCode", () => {
        const mockDispatch = jest.fn()
        beforeAll(() => {
            setDefaultCountryCode("nl")(mockDispatch)
        })
        it("should dispatch default country code", () => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_DEFAULT_COUNTRY_CODE",
                payload: "NL",
            })
        })
        it("should dispatch a country change", () => {
            expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
        })
    })

    describe("Store: Helpers: openDrawer() - ", () => {
        it("should set countryselector to true and autocomplete and recent search to false ", () => {
            const mockDispatch = jest.fn()
            openDrawer(true)(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: true,
                type: "SHOW_DRAWER",
            })
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: true,
                type: "SHOW_COUNTRY_SELECT",
            })
        })
    })

    describe("Store: Helpers: changeCountry() - ", () => {
        it("should select the country and language when called ", () => {
            const mockDispatch = jest.fn()
            changeCountry(mockCountriesDataWithBFPOCorrected[0].CountryCode)(mockDispatch, mockStore.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: mockCountriesDataWithBFPOCorrected[0],
                type: "SELECT_COUNTRY",
            })
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: "nl",
                type: "SELECT_LANGUAGE",
            })
        })
    })

    describe("Store: Helpers: updateCountrySelectorSettings() - ", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        describe("When updateCountrySelectorSettings is called", () => {
            it("dispatch should be called with SET_COUNTRY_SELECTOR ", () => {
                updateCountrySelectorSettings(mockStore as unknown as Store, mockResponse.locals.configuration)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_COUNTRY_SELECTOR,
                    payload: false,
                })
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SHOW_BFPO_FLAG,
                    payload: false,
                })
            })
        })
    })
    describe("Store: getCountriesListThunk() ", () => {
        beforeEach(() => mockStoreDispatch.mockClear())
        describe("When loading countries in next realm", () => {
            it("should call the store dispatch when ", async () => {
                await getCountriesListThunk()(mockStore.dispatch, mockStore.getState as any)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SELECT_COUNTRY,
                    payload: mockCountriesDataWithBFPOCorrected[0],
                })
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SELECT_LANGUAGE,
                    payload: "en",
                })
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: GET_COUNTRIES_LIST,
                    payload: mockCountriesDataWithBFPOCorrected,
                })
            })
            it("should call the store dispatch when BFPO is false", async () => {
                await getCountriesListThunk()(
                    mockDefaultCountryStoreWithoutBFPO.dispatch,
                    mockDefaultCountryStoreWithoutBFPO.getState as any,
                )
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SELECT_COUNTRY,
                    payload: mockCountriesData[2],
                })
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SELECT_LANGUAGE,
                    payload: "en",
                })
            })

            it("should not contain an object that has HideInDropdown false and has empty Languages array", async () => {
                await getCountriesListThunk()(mockStore.dispatch, mockStore.getState as any)
                expect(mockCountriesDataWithBFPOCorrected).not.toHaveProperty("Test Country")
                expect(mockCountriesDataWithBFPOCorrected).not.toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            Languages: [],
                        }),
                    ]),
                )
            })

            it("should call the store dispatch when a default country code is set", async () => {
                await getCountriesListThunk()(mockStore.dispatch, mockDefaultCountryStore.getState as any)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SELECT_COUNTRY,
                    payload: mockCountriesDataWithBFPOCorrected[2],
                })
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SELECT_LANGUAGE,
                    payload: "en",
                })
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: GET_COUNTRIES_LIST,
                    payload: mockCountriesDataWithBFPOCorrected,
                })
            })
            it("should set the country list as null if there is error ", async () => {
                await getCountriesListThunk()(mockStore.dispatch, mockStoreError.getState as any)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: GET_COUNTRIES_LIST,
                    payload: null,
                })
            })
        })
    })

    describe("When calling redirectToAlternativeLanguageThunk()", () => {
        beforeEach(() => mockStoreDispatch.mockClear())

        it("should call the getCountriesThunk to load country api data, if data is not already loaded ", async () => {
            await redirectToAlternativeLanguageThunk()(mockStore.dispatch, mockStore.getState as any)
            expect(mockStoreDispatch).toHaveBeenCalledWith(expect.any(Function))
        })

        it("should not call the getCountriesThunk if the data is already loaded ", async () => {
            await redirectToAlternativeLanguageThunk()(mockStore.dispatch, mockStoreSelectedLanguage.getState as any)
            expect(mockStoreDispatch).not.toHaveBeenCalled()
        })

        it("should redirect the url to the alternative language", async () => {
            // eslint-disable-next-line
            window = Object.create(window)
            const url = "http://dummyurl.co.uk"
            Object.defineProperty(window, "location", {
                value: {
                    href: url,
                },
            })
            await redirectToAlternativeLanguageThunk()(mockStore.dispatch, mockStoreSelectedLanguage.getState as any)

            expect(window.location.href).toBe("http://www.amido.com/nl/nl")
        })
    })
})
