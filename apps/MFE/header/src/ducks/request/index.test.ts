import {getSettingsHeaders} from "@monorepo/utils"
import logger from "@monorepo/core-logger"
import reducer, {
    SET_COOKIE_DOMAIN,
    setRequestAction,
    SET_GEOLOCATION,
    setGeolocationUrlAction,
    SET_COOKIE_INFO,
    setBrCookieInfoAction,
    SET_BLOOMREACH_INFO,
    setBloomreachInfoAction,
    SET_USE_TIME_MACHINE_COOKIE,
    setUseTimeMachineCookieAction,
    SET_TERRITORY_DETAILS,
    setTerritoryDetailsAction,
    SET_MONETATE_INFO,
    setMonetateInfoAction,
    SET_REQUEST,
    setCokieDomainAction,
    SET_SALE_WARNING_MODAL,
    setSaleWarningModalAction,
} from "."

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(() => ({myHeader: "test 2"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    warn: jest.fn(),
}))

const mockDispatch = jest.fn()
const mockStore = {
    dispatch: mockDispatch,
}

const mockRequest = {
    url: "www.test.co.uk",
    headers: {myHeader: "test", "x-monorepo-territory": "gb"},
    siteUrl: {url: "http://test.com", token: "/footerstatic"},
    query: {"time-machine-date": "20200102"},
    cookieDomain: "",
}

const initialState = {
    headers: null,
    url: null,
    siteUrl: "",
    timeMachineDate: null,
    isInternationalCountry: false,
    geolocationBaseUrl: "",
    geolocationVersion: 0,
    bloomReachCachingCookieList: "",
    bloomReachCachingEnabled: false,
    bloomreachDomainKey: "",
    bloomreachGroupLocation: "",
    useTimeMachineCookie: false,
    currencyCode: "",
    fullTerritoryName: "",
    monetateSDK: false,
    accountMonetateSDK: "",
    cookieDomain: "",
    showSaleWarningBag: false,
}

const expectedState = {
    headers: {myHeader: "test 2"},
    url: "www.test.co.uk",
    siteUrl: "http://test.com",
    timeMachineDate: "20200102",
    geolocationBaseUrl: "",
    geolocationVersion: 0,
    bloomReachCachingCookieList: "",
    bloomReachCachingEnabled: false,
    bloomreachDomainKey: "",
    bloomreachGroupLocation: "",
    useTimeMachineCookie: false,
    currencyCode: "",
    fullTerritoryName: "",
    monetateSDK: false,
    accountMonetateSDK: "",
    cookieDomain: "",
    showSaleWarningBag: false,
}

describe("reducers: request", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    payload: null,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    payload: null,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_REQUEST", () => {
        it(`should update the state when x-monorepo-territory is mx`, () => {
            const newMockRequest = {
                ...mockRequest,
                headers: {
                    "x-monorepo-territory": "mx",
                },
            }
            expect(
                reducer(initialState, {
                    type: SET_REQUEST,
                    payload: newMockRequest,
                }),
            ).toEqual({
                ...expectedState,
                isInternationalCountry: true,
            })
        })
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_REQUEST,
                    payload: mockRequest,
                }),
            ).toEqual({
                ...expectedState,
                isInternationalCountry: false,
            })
        })

        it("should call getSettingsHeaders", () => {
            expect(getSettingsHeaders).toBeCalledWith(mockRequest.headers)
        })
    })

    describe("When called with SET_GEOLOCATION", () => {
        const mockGeolocationData = {
            url: "/geotest",
            version: 6,
        }

        const expectedGeoState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "/geotest",
            geolocationVersion: 6,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: false,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: false,
        }
        it(`should update the state with geolocation env variables`, () => {
            expect(
                reducer(initialState, {
                    type: SET_GEOLOCATION,
                    payload: mockGeolocationData,
                }),
            ).toEqual({
                ...expectedGeoState,
            })
        })
    })

    describe("When called with SET_COOKIE_INFO", () => {
        const mockCookieData = {
            bloomReachCachingCookieList: "_br_val_1,_br_val_2,_br_val_3,_br_val_4",
            bloomReachCachingEnabled: true,
        }

        const expectedCookieState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "_br_val_1,_br_val_2,_br_val_3,_br_val_4",
            bloomReachCachingEnabled: true,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: false,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: false,
        }
        it(`should update the state with geolocation env variables`, () => {
            expect(
                reducer(initialState, {
                    type: SET_COOKIE_INFO,
                    payload: mockCookieData,
                }),
            ).toEqual({
                ...expectedCookieState,
            })
        })
    })

    describe("When called with SET_BLOOMREACH_INFO", () => {
        const mockPayload = {
            bloomreachDomainKey: "test-domain-key",
            bloomreachGroupLocation: "test-group-location",
        }

        const expectedBloomreachInfoState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "test-domain-key",
            bloomreachGroupLocation: "test-group-location",
            useTimeMachineCookie: false,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: false,
        }
        it(`should update the state with bloomreachGroupLocation and bloomreachDomainKey test values`, () => {
            expect(
                reducer(initialState, {
                    type: SET_BLOOMREACH_INFO,
                    payload: mockPayload,
                }),
            ).toEqual({
                ...expectedBloomreachInfoState,
            })
        })
    })

    describe("When called with SET_COOKIE_DOMAIN", () => {
        const mockPayload = "www.cookie.com"
        const expectedBloomreachInfoState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: false,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "www.cookie.com",
            showSaleWarningBag: false,
        }
        it(`should update the state with the cookie domain`, () => {
            expect(
                reducer(initialState, {
                    type: SET_COOKIE_DOMAIN,
                    payload: mockPayload,
                }),
            ).toEqual({
                ...expectedBloomreachInfoState,
            })
        })
    })

    describe("When called with SET_USE_TIME_MACHINE_COOKIE", () => {
        const mockUseTimeMachineCookie = true

        const expectedTimeMachineState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: true,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: false,
        }
        it(`should update the state with useTimeMachineCookie as  true`, () => {
            expect(
                reducer(initialState, {
                    type: SET_USE_TIME_MACHINE_COOKIE,
                    payload: mockUseTimeMachineCookie,
                }),
            ).toEqual({
                ...expectedTimeMachineState,
            })
        })
    })

    describe("When called with SET_MONETATE_INFO", () => {
        const mockEnableMonetateSDK = true

        const expectedMonetateState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: false,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: true,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: false,
        }
        it(`should update the state with monetateSDK as true`, () => {
            expect(
                reducer(initialState, {
                    type: SET_MONETATE_INFO,
                    payload: {monetateEnabled: mockEnableMonetateSDK},
                }),
            ).toEqual({
                ...expectedMonetateState,
            })
        })
    })

    describe("When called with SET_CURRENCY_CODE", () => {
        const mockTerritoryDetails = {
            currencyCode: "EUR",
            fullTerritoryName: "Cape Verde",
        }

        const expectedTerritoryDetailsState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: false,
            currencyCode: "EUR",
            fullTerritoryName: "Cape Verde",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: false,
        }
        it(`should update the state with mockTerritoryDetails values`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TERRITORY_DETAILS,
                    payload: mockTerritoryDetails,
                }),
            ).toEqual({
                ...expectedTerritoryDetailsState,
            })
        })
    })
    describe("When called with SET_SALE_WARNING_MODAL", () => {
        const expectedTerritoryDetailsState = {
            headers: null,
            url: null,
            siteUrl: "",
            timeMachineDate: null,
            isInternationalCountry: false,
            geolocationBaseUrl: "",
            geolocationVersion: 0,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            bloomreachDomainKey: "",
            bloomreachGroupLocation: "",
            useTimeMachineCookie: false,
            currencyCode: "",
            fullTerritoryName: "",
            monetateSDK: false,
            accountMonetateSDK: "",
            cookieDomain: "",
            showSaleWarningBag: true,
        }
        it(`should update the state with showSaleWarningBag as true`, () => {
            expect(
                reducer(initialState, {
                    type: SET_SALE_WARNING_MODAL,
                    payload: true,
                }),
            ).toEqual({
                ...expectedTerritoryDetailsState,
            })
        })
    })
})

describe("Request - setRequestAction()", () => {
    describe("When called", () => {
        it("should call dispatch with a set request action", () => {
            setRequestAction(mockStore as any, mockRequest)
            expect(mockDispatch).toBeCalledWith({
                type: SET_REQUEST,
                payload: {...mockRequest},
            })
        })
    })
})

describe("Request - setCokieDomainAction()", () => {
    describe("When called", () => {
        it("should call dispatch with a set request action", () => {
            setCokieDomainAction(mockStore as any, "www.cookie.com")
            expect(mockDispatch).toBeCalledWith({
                type: SET_COOKIE_DOMAIN,
                payload: "www.cookie.com",
            })
        })
    })
})

describe("Request - setGeolocationUrlAction()", () => {
    const expectedPayload = {
        url: "/geotest",
        version: 6,
    }
    const mockConfig = {
        "header.frontend.geolocationVersion": {Value: 6},
    }

    describe("When called", () => {
        it("should call dispatch with a set geolocation action", () => {
            setGeolocationUrlAction(mockStore as any, "/geotest", mockConfig)
            expect(mockDispatch).toBeCalledWith({
                type: SET_GEOLOCATION,
                payload: expectedPayload,
            })
        })
    })
})

describe("Request - setBrCookieInfoAction()", () => {
    const expectedPayload = {
        bloomReachCachingCookieList: "_br_val_1,_br_val_2,_br_val_3,_br_val_4",
        bloomReachCachingEnabled: true,
    }
    const mockConfig = {
        "header.frontend.bloomReachCachingCookieList": {
            Value: "_br_val_1,_br_val_2,_br_val_3,_br_val_4",
        },
        "header.frontend.bloomReachCachingEnabled": {
            Value: true,
        },
    }

    describe("When called", () => {
        it("should call dispatch with a set cookie action", () => {
            setBrCookieInfoAction(mockStore as any, mockConfig)
            expect(mockDispatch).toBeCalledWith({
                type: SET_COOKIE_INFO,
                payload: expectedPayload,
            })
        })
    })
})

describe("Request - setBloomreachInfoAction()", () => {
    const expectedPayload = {
        bloomreachGroupLocation: "SouthernHemisphere",
        bloomreachDomainKey: "amido_global",
    }
    const mockConfig = {
        "header.frontend.bloomreachGroupLocation": {
            Value: "SouthernHemisphere",
        },
        "header.frontend.bloomreachDomainKey": {
            Value: "amido_global",
        },
    }

    describe("When called", () => {
        it("should call dispatch with a set bloomreach info action", () => {
            setBloomreachInfoAction(mockStore as any, mockConfig)
            expect(mockDispatch).toBeCalledWith({
                type: SET_BLOOMREACH_INFO,
                payload: expectedPayload,
            })
        })
    })
})

describe("Request - setUseTimeMachineCookieAction()", () => {
    afterEach(() => {
        jest.resetAllMocks()
    })
    it("should call dispatch with the payload as true", () => {
        const expectedPayload = true
        setUseTimeMachineCookieAction(mockStore as any, "true")
        expect(mockDispatch).toBeCalledWith({
            type: SET_USE_TIME_MACHINE_COOKIE,
            payload: expectedPayload,
        })
    })
    it("should call dispatch with the payload as false", () => {
        const expectedPayload = false
        setUseTimeMachineCookieAction(mockStore as any, "false")
        expect(mockDispatch).toBeCalledWith({
            type: SET_USE_TIME_MACHINE_COOKIE,
            payload: expectedPayload,
        })
    })
    it("should call dispatch with the payload as true when it is uppercase", () => {
        const expectedPayload = true
        setUseTimeMachineCookieAction(mockStore as any, "TRUE")
        expect(mockDispatch).toBeCalledWith({
            type: SET_USE_TIME_MACHINE_COOKIE,
            payload: expectedPayload,
        })
    })
    it("should call logger warn when value is a string but not acceptable value", () => {
        const value = "amido"
        setUseTimeMachineCookieAction(mockStore as any, value)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.warn).toHaveBeenCalled()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.warn).toHaveBeenCalledWith(
            `Warning: invalid value set for use time machine cookie: ${value} should be either 'true' or 'false'. useTimeMachineCookie is set to false`,
        )
    })
})

describe("Request - setMonetateInfoAction()", () => {
    const mockConfig = {
        "header.frontend.monetateSDK": {
            enabled: true,
        },
    }

    describe("When called", () => {
        it("should call dispatch with a set monetate info action", () => {
            setMonetateInfoAction(mockStore as any, mockConfig)
            expect(mockDispatch).toBeCalledWith({
                type: SET_MONETATE_INFO,
                payload: {monetateEnabled: true},
            })
        })
    })
})
describe("Request - setSaleWarningModalAction()", () => {
    const mockConfig = {
        "header.frontend.enableSaleWarningModal": {
            Value: true,
        },
    }

    describe("When called", () => {
        it("should call dispatch with a set monetate info action", () => {
            setSaleWarningModalAction(mockStore as any, mockConfig)
            expect(mockDispatch).toBeCalledWith({
                type: SET_SALE_WARNING_MODAL,
                payload: true,
            })
        })
    })
})

describe("Request - setTerritoryDetailsAction()", () => {
    const mockConfig = {
        "header.frontend.fullTerritoryName": {
            Value: "Cape Verde",
        },
        "header.frontend.currencyCode": {
            Value: "EUR",
        },
    }

    const expectedPayload = {
        fullTerritoryName: "Cape Verde",
        currencyCode: "EUR",
    }

    describe("When called", () => {
        it("should call dispatch with a set territory details action", () => {
            setTerritoryDetailsAction(mockStore as any, mockConfig)
            expect(mockDispatch).toBeCalledWith({
                type: SET_TERRITORY_DETAILS,
                payload: expectedPayload,
            })
        })
    })
})
