import {mockState} from "../__mocks__/mockStore"
import {mapStateToProps, mapDispatchToProps} from "./connect"
import mockCountriesData from "../__mocks__/amido.json"
import {changeCountry} from "../ducks"

jest.mock("../ducks")

describe("Components/Search - Given connect - mapStateToProps()", () => {
    const props = {
        territory: "GB",
        textAlignment: "ltr",
        cdnBaseUrl: "http://amido.com",
    }
    it("should return required state from mockState", () => {
        const expected = {
            territory: "GB",
            textAlignment: "ltr",
            cdnBaseUrl: "http://amido.com",
            selectedCountry: null,
            countriesList: null,
        }
        const got = mapStateToProps(mockState, props)
        expect(got).toEqual(expected)
    })
    it("should return required state from mockState when countriesList is populated", () => {
        const newMockStateWithCountries = {
            ...mockState,
            countriesList: mockCountriesData.results,
        }
        const expected = {
            territory: "GB",
            textAlignment: "ltr",
            cdnBaseUrl: "http://amido.com",
            selectedCountry: null,
            countriesList: mockCountriesData.results,
        }
        const got = mapStateToProps(newMockStateWithCountries, props)
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
