import {renderHook} from "@testing-library/react-hooks"
import * as Redux from "react-redux"

import {useColourChipsLazyLoadImage, useProductLazyLoadImage} from "."
import * as LazyLoadDuckMD from "../../ducks/lazyload"

function mockColourChipsLazyLoadSelector(value: boolean) {
    jest.spyOn(LazyLoadDuckMD, "selectColourChipsLazyLoadEnabled").mockReturnValue(value)
}
function mockProductsLazyLoadSelector(value: boolean) {
    jest.spyOn(LazyLoadDuckMD, "selectProductLazyLoadEnabled").mockReturnValue(value)
}

describe("Given a useColourChipsLazyLoadImage() hook", () => {
    beforeAll(() => {
        jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
    })

    describe("When lazy load is enabled", () => {
        it("should have the lazy load image props", () => {
            mockColourChipsLazyLoadSelector(true)
            const {result} = renderHook(() => useColourChipsLazyLoadImage("test-image-url", "AltText"))
            expect(result.current.imageProps).toEqual({
                alt: "AltText",
                className: "lazyload",
                "data-src": "test-image-url",
                src: "spiderman/Common/Items/Default/Default/ItemImages/AltItemSwatch/21x21/greySquarePlaceholder.jpg",
            })
        })
    })

    describe("When lazy load is disabled", () => {
        it("should have normal image props", () => {
            mockColourChipsLazyLoadSelector(false)
            const {result} = renderHook(() => useColourChipsLazyLoadImage("test-image-url", "AltText"))
            expect(result.current.imageProps).toEqual({
                src: "test-image-url",
            })
        })
    })
})
describe("Given a useProductLazyLoadImage() hook", () => {
    beforeAll(() => {
        jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
    })

    describe("When lazy load is enabled", () => {
        it("should have the LAZYSIZES lazy load image props for multiple images", () => {
            mockProductsLazyLoadSelector(true)
            const {result} = renderHook(() => useProductLazyLoadImage("test-image-url"))
            expect(result.current.imageProps).toEqual({
                className: "lazyload",
                "data-src": "test-image-url",
                src: "spiderman/Common/Items/Default/Default/ItemImages/Search/224x336/greyPlaceholder.jpg?X56",
            })
        })
    })

    describe("When lazy load is disabled", () => {
        it("should have normal image props", () => {
            mockProductsLazyLoadSelector(false)
            const {result} = renderHook(() => useProductLazyLoadImage("test-image-url"))
            expect(result.current.imageProps).toEqual({
                src: "test-image-url",
            })
        })
    })
})
