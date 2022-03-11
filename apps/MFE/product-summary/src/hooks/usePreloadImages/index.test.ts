import {useRef} from "react"
import {renderHook} from "@testing-library/react-hooks"

import {usePreloadImages} from "."

jest.mock("react", () => {
    const originReact = jest.requireActual("react")
    const mUseRef = jest.fn(() => ({current: []}))
    return {
        ...originReact,
        useRef: mUseRef,
    }
})

describe("Given a usePreloadImages hook", () => {
    it("should return a function", () => {
        const {result} = renderHook(() => usePreloadImages())

        expect(result.current).toBeInstanceOf(Function)
    })

    describe("When called with image urls", () => {
        const mockedUseRefValue = {current: []}
        ;(useRef as jest.Mock).mockImplementation(() => mockedUseRefValue)
        const mockUrls1 = ["firstUrl", "secondUrl"]
        const mockUrls2 = [...mockUrls1, "thirdUrl", "fourthUrl"]
        let preloadFunc

        beforeAll(() => {
            preloadFunc = renderHook(() => usePreloadImages()).result.current
        })

        it("should cache those image urls", () => {
            preloadFunc(mockUrls1)

            expect(mockedUseRefValue.current).toMatchSnapshot()
        })

        it("should only cache the new urls when called subsequently with other urls", () => {
            preloadFunc(mockUrls2)
            expect(mockedUseRefValue.current).toMatchSnapshot()
        })
    })
})
