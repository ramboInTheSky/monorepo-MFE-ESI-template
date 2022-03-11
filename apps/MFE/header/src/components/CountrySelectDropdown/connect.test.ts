import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mapDispatchToProps} from "./connect"
import {mockCountriesData} from "../../../__mocks__/mockCountryData"
import {changeCountry} from "../../ducks/country-selector"

jest.mock("../../ducks/country-selector")

describe("Components/Search - Given connect - mapStateToProps()", () => {
    const newMockState = {
        ...mockState,
        request: {
            ...mockState.request,
            headers: {
                ...mockState.request.headers,
                "x-monorepo-territory": "gb",
                "x-monorepo-language": "en",
            },
        },
    }
    it("should return required state from mockState", () => {
        const expected = {
            territory: "GB",
            textAlignment: "ltr",
            selectedCountry: null,
            countriesList: null,
        }
        const got = mapStateToProps(newMockState)
        expect(got).toEqual(expected)
    })
    it("should return required state from mockState when countriesList is populated", () => {
        const newMockStateWithCountries = {
            ...mockState,
            request: {
                ...mockState.request,
                headers: {
                    ...mockState.request.headers,
                    "x-monorepo-territory": "gb",
                    "x-monorepo-language": "en",
                },
            },
            countrySelector: {
                ...mockState.countrySelector,
                countriesList: mockCountriesData,
            },
        }
        const expected = {
            territory: "GB",
            textAlignment: "ltr",
            selectedCountry: null,
            countriesList: mockCountriesData,
        }
        const got = mapStateToProps(newMockStateWithCountries)
        expect(got).toEqual(expected)
    })

    it("should called the dispatch once when selectCountry is called", () => {
        const mockDispatch = jest.fn()
        const got = mapDispatchToProps(mockDispatch)
        expect(got.selectCountry).toBeTruthy()

        got.selectCountry("test")
        expect(changeCountry).toHaveBeenCalledWith("test")
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
})
