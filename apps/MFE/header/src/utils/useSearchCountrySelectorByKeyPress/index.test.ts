import {renderHook, act} from "@testing-library/react-hooks"
import {mockCountriesData} from "../../../__mocks__/mockCountryData"
import {useSearchCountrySelectorByKeyPress} from "."

describe("Utils: searchCountrySelectorByKeyPress() - onKeyPress ", () => {
    it("should call the filtered country CountryCode", () => {
        const selectCountry = jest.fn()
        const {result} = renderHook(() => useSearchCountrySelectorByKeyPress(mockCountriesData, selectCountry))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.onKeyPress("n")
            result.current.onKeyPress("e")
            result.current.onKeyPress("t")
            result.current.onKeyPress("h")
        })
        expect(selectCountry).toBeCalledWith("NL")
    })
    it("should call the first country that fits the filter", () => {
        const selectCountry = jest.fn()
        const {result} = renderHook(() => useSearchCountrySelectorByKeyPress(mockCountriesData, selectCountry))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.onKeyPress("u")
            result.current.onKeyPress("n")
            result.current.onKeyPress("i")
            result.current.onKeyPress("t")
        })
        expect(selectCountry).toBeCalledWith("AE")
    })
    it("should not call the selectCountry function", () => {
        const selectCountry = jest.fn()
        const {result} = renderHook(() => useSearchCountrySelectorByKeyPress(mockCountriesData, selectCountry))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.onKeyPress("x")
            result.current.onKeyPress("x")
        })
        expect(selectCountry).not.toHaveBeenCalled()
    })
    it("should not call the selectCountry function if countriesList is null", () => {
        const selectCountry = jest.fn()
        const {result} = renderHook(() => useSearchCountrySelectorByKeyPress(null, selectCountry))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.onKeyPress("u")
            result.current.onKeyPress("n")
            result.current.onKeyPress("i")
            result.current.onKeyPress("t")
        })
        expect(selectCountry).not.toHaveBeenCalled()
    })
})
