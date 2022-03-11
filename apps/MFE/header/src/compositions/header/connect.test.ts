import {mapDispatchToProps, mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"
import {TERRITORY_HEADER} from "../../config/constants"

describe("Compositions/Header - Given connect - mapStateToProps()", () => {
    it("should return Header state from the mockState", () => {
        const {textAlignment} = mockState
        const expected = {
            textAlignment,
            siteUrl: mockState.request.siteUrl,
            geolocationUrl: mockState.request.geolocationBaseUrl,
            geolocationVersion: mockState.request.geolocationVersion,
            territory: mockState.request?.headers![TERRITORY_HEADER] as string,
            bloomReachCachingCookieList: "",
            bloomReachCachingEnabled: false,
            itemCount: 2,
            requestedCountryChange: false,
            enableCookieConsent: true,
            cookieDomain: mockState.request.cookieDomain,
            enableFavourites: mockState.favourites.enableFavourites,
            showSaleWarningBag: false,
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })
    it("should throw an error if no data", () => {
        const newMockState = {
            ...mockState,
            data: null,
        }

        expect(() => mapStateToProps(newMockState)).toThrowError("Header: there is no data to render the header")
    })
    it("calls dispatch if requestCountryChange is called", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        expect(got.requestCountryChange).toBeTruthy()

        got.requestCountryChange()
        expect(dispatch).toHaveBeenCalledTimes(1)
    })
})
