import React from "react"
import {Provider} from "react-redux"
import {render, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {useShoppingBagGetCallbackObservable} from "@monorepo/eventservice"
import BFFLogger from "../../server/core/BFFLogger"
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"
import {getHeaderDataThunk} from "../../ducks/headerdata"
import {PerformCountryRedirectCheck} from "../../utils/countryRedirect"
import useBloomreachCookieCheck from "../../hooks/useBloomreachCookieCheck"
import {getServerSideProps} from "./index.server"
import {Header, HeaderProps} from "."
import {
    usePushSiteDetails,
    usePushBloomreachDetails,
    usePushMonetateDetails,
    usePushUCMDetails,
} from "../../hooks/useTrackingEvents"
import * as utils from "../../utils/window"
import * as featureSwitches from "../../utils/featureSwitch"
import DefaultHeader from "./default-composition"

let actualUseGetBagCallBack
jest.mock("@monorepo/eventservice", () => ({
    ...jest.requireActual("@monorepo/eventservice"),
    useShoppingBagGetCallbackObservable: jest.fn(cb => {
        actualUseGetBagCallBack = cb
    }),
}))
jest.mock("../../events")

jest.mock("@app/utils/axios")

jest.mock("../../components/MeganavESI", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>MeganavESI</div>,
}))
jest.mock("../../components/UpperHeader", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>UpperHeader</div>,
}))
jest.mock("../../components/CookieConsent", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>CookieConsent</div>,
}))

jest.mock("../../hooks/useTrackingEvents", () => ({
    usePushSiteDetails: jest.fn(),
    usePushBloomreachDetails: jest.fn(),
    usePushMonetateDetails: jest.fn(),
    usePushUCMDetails: jest.fn(),
}))

jest.mock("@app/utils/setApiUrlSettings", () => {
    const mock = jest.fn()
    mock.mockReturnValue({
        realm: "testRealm",
        territory: "testTerritory",

        language: "testLanguage",
    })
    return {
        setApiUrlSettings: mock,
    }
})

jest.mock("../../ducks/headerdata", () => ({
    getHeaderDataThunk: jest.fn(store => {
        if (store.error) throw new Error("ERROR")

        return {}
    }),
}))
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../../server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("../../utils/countryRedirect", () => ({PerformCountryRedirectCheck: jest.fn()}))
jest.mock("../../hooks/useBloomreachCookieCheck", () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe("Pages: Header - ", () => {
    jest.spyOn(utils, "IS_BROWSER").mockImplementation(() => {
        return true
    })
    jest.spyOn(featureSwitches, "doSearchABAdaptor").mockImplementation(() => {
        return true
    })
    describe("When the header renders with regions ", () => {
        let fragment
        beforeAll(() => {
            jest.useFakeTimers()
            const props: HeaderProps = {
                textAlignment: "ltr",
                siteUrl: "www.test.com",
                geolocationUrl: "www.geo.com",
                geolocationVersion: 12,
                territory: "GB",
                useDevEsi: false,
                bloomReachCachingCookieList: "",
                bloomReachCachingEnabled: false,
                itemCount: 1,
                requestedCountryChange: false,
                requestCountryChange: jest.fn(),
                headerComponent: DefaultHeader,
                cookieDomain: "www.cookie.com",
                enableCookieConsent: true,
                enableFavourites: false,
                showSaleWarningBag: false,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <Header {...props} />
                    </Provider>
                </SCThemeProvider>,
            )
            fragment = asFragment()
        })
        afterAll(() => {
            jest.clearAllTimers()
        })
        it("should show the header", () => {
            expect(fragment).toMatchSnapshot()
        })
        it("should call useShoppingBagGetCallbackObservable", () => {
            expect(useShoppingBagGetCallbackObservable).toHaveBeenCalled()
        })

        it("should pass a call back to the use get bag hook that checks for redirect", () => {
            actualUseGetBagCallBack({data: {CountryRedirect: "test"}})
            expect(PerformCountryRedirectCheck).toHaveBeenCalledWith("test", "GB", 12, "www.test.com", "www.geo.com")
        })

        it("should call useBloomreachCookieCheck", () => {
            expect(useBloomreachCookieCheck).toHaveBeenCalledWith({
                bloomReachCachingCookieList: "",
                bloomReachCachingEnabled: false,
                cookieDomain: "www.cookie.com",
            })
        })

        it("should use GTM onload page", () => {
            expect(usePushSiteDetails).toHaveBeenCalledWith()
            expect(usePushBloomreachDetails).toHaveBeenCalledWith()
            expect(usePushMonetateDetails).toHaveBeenCalledWith()
            expect(usePushUCMDetails).toHaveBeenCalledWith()
        })
    })

    describe("When the header renders with regions with a requestedCountryChange", () => {
        let fragment
        beforeAll(() => {
            const props: HeaderProps = {
                textAlignment: "ltr",
                siteUrl: "www.test.com",
                geolocationUrl: "www.geo.com",
                geolocationVersion: 12,
                territory: "GB",
                useDevEsi: false,
                itemCount: 1,
                bloomReachCachingCookieList: "",
                bloomReachCachingEnabled: false,
                requestedCountryChange: true,
                requestCountryChange: jest.fn(),
                headerComponent: DefaultHeader,
                enableCookieConsent: true,
                cookieDomain: "www.cookie.com",
                enableFavourites: false,
                showSaleWarningBag: false,
            }
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Header {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            fragment = asFragment()
        })
        it("should show the header", () => {
            expect(fragment).toMatchSnapshot()
        })
    })

    describe("When the header renders with a requestedCountryChange", () => {
        let wrapper
        const props: HeaderProps = {
            textAlignment: "ltr",
            siteUrl: "www.test.com",
            geolocationUrl: "www.geo.com",
            geolocationVersion: 12,
            territory: "GB",
            useDevEsi: false,
            itemCount: 1,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            requestedCountryChange: true,
            requestCountryChange: jest.fn(),
            headerComponent: DefaultHeader,
            enableCookieConsent: true,
            cookieDomain: "www.cookie.com",
            enableFavourites: false,
            showSaleWarningBag: false,
        }
        it("should show the header", () => {
            wrapper = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <Header {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            const cancelButton = wrapper.getByTestId("header-country-change-modal-cancel")
            expect(cancelButton).toBeVisible()

            fireEvent.click(cancelButton)
            expect(props.requestCountryChange).toBeCalled()
        })
    })

    describe("When the header getServerSideProps function is called ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps(
                {},
                {
                    locals: {
                        configuration: {
                            "header.frontend.defaultDataVersion": {
                                Value: "v1.4.5",
                            },
                        },
                    },
                },
                mockStore,
            )
        })
        it("should call GetHeaderData", () => {
            expect(getHeaderDataThunk).toHaveBeenCalledWith(mockStore, "v1.4.5")
        })
        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({})
        })
    })

    describe("When the header getServerSideProps throws an error ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps({}, {}, {error: true} as any)
        })

        it("should call the error logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })

        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({})
        })
    })
})
