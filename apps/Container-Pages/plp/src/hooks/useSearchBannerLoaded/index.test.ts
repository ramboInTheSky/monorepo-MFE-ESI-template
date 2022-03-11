import {renderHook} from "@testing-library/react-hooks"
import {useSearchBannerLoaded} from "."
import {
    handleSeoPillsImpression,
    handleVisualPillsImpression,
    setupSeoPillsEventListeners,
    setupVisualPillsEventListeners,
} from "../../utils/searchBanner"

jest.mock("../../utils/searchBanner")

describe("Util: useSearchBannerLoaded", () => {
    const searchBannerHtml = "<div></div>"

    it("should return true if element is found", () => {
        const mockElement = {
            id: "search-banner-read-more-content",
        }
        const spy = jest.spyOn(Document.prototype, "getElementById").mockImplementationOnce(() => mockElement as any)

        const {result} = renderHook(() => useSearchBannerLoaded(searchBannerHtml))

        expect(result.current).toEqual(true)
        spy.mockRestore()
    })

    it("should return false if element is not found", () => {
        const spy = jest.spyOn(Document.prototype, "getElementById").mockImplementationOnce(() => null)

        const {result} = renderHook(() => useSearchBannerLoaded(searchBannerHtml))

        expect(result.current).toEqual(false)
        spy.mockRestore()
    })

    it("should return true if element is found for search banner text", () => {
        const mockElement = {
            id: "search-banner-read-more-content",
        }
        const spy = jest.spyOn(Document.prototype, "getElementById").mockImplementationOnce(() => mockElement as any)
        const spySearchBanner = jest
            .spyOn(Document.prototype, "getElementById")
            .mockImplementationOnce(() => mockElement as any)

        const {result} = renderHook(() => useSearchBannerLoaded(searchBannerHtml))

        expect(result.current).toEqual(true)
        spy.mockRestore()
        spySearchBanner.mockRestore()
    })

    it("should return true if element is found for search banner text and mobile search banner text", () => {
        const mockElement = {
            id: "search-banner-read-more-content",
        }

        const mockElementMobile = {
            id: "search-banner-mobile-read-more-content",
        }
        const spy = jest.spyOn(Document.prototype, "getElementById").mockImplementationOnce(() => mockElement as any)
        const spySearchBanner = jest
            .spyOn(Document.prototype, "getElementById")
            .mockImplementationOnce(() => mockElement as any)
        const spySearchBannerMobile = jest
            .spyOn(Document.prototype, "getElementById")
            .mockImplementationOnce(() => mockElementMobile as any)

        const {result} = renderHook(() => useSearchBannerLoaded(searchBannerHtml))

        expect(result.current).toEqual(true)
        spy.mockRestore()
        spySearchBanner.mockRestore()
        spySearchBannerMobile.mockRestore()
    })

    it("should initiate GA events and event listeners", () => {
        const spy = jest.spyOn(Document.prototype, "getElementById").mockImplementationOnce(() => null)

        renderHook(() => useSearchBannerLoaded(searchBannerHtml))

        expect(handleSeoPillsImpression).toHaveBeenCalled()
        expect(handleVisualPillsImpression).toHaveBeenCalled()
        expect(setupSeoPillsEventListeners).toHaveBeenCalled()
        expect(setupVisualPillsEventListeners).toHaveBeenCalled()

        spy.mockRestore()
    })
})
