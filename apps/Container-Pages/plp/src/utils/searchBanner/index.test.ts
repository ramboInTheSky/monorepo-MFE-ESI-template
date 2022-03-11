import {
    getSearchBannerUrl,
    handleVisualPillsImpression,
    setupSeoPillsEventListeners,
    setupVisualPillsEventListeners,
    handleSeoPillsImpression,
} from "."
import TrackVisualPillsImpression from "../../events/trackEvent/events/trackVisualPillsImpression"
import TrackSeoPillsClick from "../../events/trackEvent/events/trackSeoPillsClick"
import TrackVisualPillsClick from "../../events/trackEvent/events/trackVisualPillsClick"

jest.mock("../../events/trackEvent/events/trackVisualPillsImpression")
jest.mock("../../events/trackEvent/events/trackSeoPillsClick")
jest.mock("../../events/trackEvent/events/trackVisualPillsClick")

describe("Util: searchBanner", () => {
    describe("getSearchBannerUrl", () => {
        it("should return correct url", () => {
            const result = getSearchBannerUrl({language: "en", realm: "Amido", territory: "mx"}, "url")

            expect(result).toEqual("banneresiurl/Amido/mx/en/v1/search-banners/url")
        })

        it("should return correct url for matching search-banner", () => {
            const result = getSearchBannerUrl({language: "en", realm: "Amido", territory: "mx"}, "/search-banners/")

            expect(result).toEqual("banneresiurl/Amido/mx/en/v1/search-banners/")
        })
    })

    describe("setupSeoPillsEventListeners", () => {
        describe("When there are elements to add listeners to", () => {
            it("should add event listeners correctly", () => {
                const mockQuerySelectorAll = jest.fn()
                const mockAddEventListener = jest.fn()
                const document = {
                    querySelectorAll: mockQuerySelectorAll,
                }
                mockQuerySelectorAll.mockReturnValue([
                    {
                        addEventListener: mockAddEventListener,
                    },
                ])
                setupSeoPillsEventListeners(document as any)
                expect(mockAddEventListener).toHaveBeenCalledWith("click", expect.any(Function))
            })
        })
        describe("When there are not elements to add listeners to", () => {
            it("should not add event listeners", () => {
                const mockQuerySelectorAll = jest.fn()
                const mockAddEventListener = jest.fn()
                const document = {
                    querySelectorAll: mockQuerySelectorAll,
                }
                mockQuerySelectorAll.mockReturnValue([])
                setupSeoPillsEventListeners(document as any)
                expect(mockAddEventListener).not.toHaveBeenCalledWith("click", expect.any(Function))
            })
        })

        describe("When there are seo pills present", () => {
            it("should read the item names", () => {
                const mockElement = {
                    target: {
                        textContent: "text content",
                        getAttribute: jest.fn(() => "test href"),
                    },
                }
                let actualCallback: any = null
                const mockAddEventListener = jest.fn((_eventName, cb) => {
                    actualCallback = cb
                })
                const mockSeoPills = [
                    {
                        addEventListener: mockAddEventListener,
                    },
                ]
                const mockQuerySelectorForSeoPill = jest.fn(() => mockSeoPills)

                const mockDocument = {
                    querySelectorAll: mockQuerySelectorForSeoPill,
                }
                setupSeoPillsEventListeners(mockDocument as any)
                if (actualCallback) actualCallback(mockElement)
                expect(mockQuerySelectorForSeoPill).toHaveBeenCalledWith("a.search-quick-link")
                expect(TrackSeoPillsClick).toHaveBeenCalledWith("text content", "test href")
            })
        })
    })

    describe("setupVisualPillsEventListeners", () => {
        describe("When there are elements to add listeners to", () => {
            it("should add event listeners correctly", () => {
                const mockQuerySelectorAll = jest.fn()
                const mockAddEventListener = jest.fn()
                const document = {
                    querySelectorAll: mockQuerySelectorAll,
                }
                mockQuerySelectorAll.mockReturnValue([
                    {
                        addEventListener: mockAddEventListener,
                    },
                ])
                setupVisualPillsEventListeners(document as any)
                expect(mockAddEventListener).toHaveBeenCalledWith("click", expect.any(Function))
            })
        })
        describe("When there are not elements to add listeners to", () => {
            it("should not add event listeners", () => {
                const mockQuerySelectorAll = jest.fn()
                const mockAddEventListener = jest.fn()
                const document = {
                    querySelectorAll: mockQuerySelectorAll,
                }
                mockQuerySelectorAll.mockReturnValue([])
                setupVisualPillsEventListeners(document as any)
                expect(mockAddEventListener).not.toHaveBeenCalledWith("click", expect.any(Function))
            })
        })

        describe("When there are visual pills present", () => {
            it("should read the item names", () => {
                const mockElement = {
                    currentTarget: {
                        querySelector: jest.fn(() => ({
                            textContent: "visual content",
                            getAttribute: jest.fn(() => "visual href"),
                        })),
                    },
                }

                let actualCallback: any = null
                const mockAddEventListener = jest.fn((_eventName, cb) => {
                    actualCallback = cb
                })
                const mockVisualPills = [
                    {
                        addEventListener: mockAddEventListener,
                    },
                ]
                const mockQuerySelectorForVisualPill = jest.fn(() => mockVisualPills)

                const mockDocument = {
                    querySelectorAll: mockQuerySelectorForVisualPill,
                }
                setupVisualPillsEventListeners(mockDocument as any)
                if (actualCallback) actualCallback(mockElement)
                expect(mockQuerySelectorForVisualPill).toHaveBeenCalledWith("div.roundelsItem")
                expect(TrackVisualPillsClick).toHaveBeenCalledWith("visual content", "visual href")
            })
        })
    })

    describe("handleVisualPillsImpression", () => {
        describe("When there are visual pills present", () => {
            it("should read the item names", () => {
                const mockGetElementsByClassName = jest.fn()
                const mockGetAttribute1 = jest.fn()
                const mockGetAttribute2 = jest.fn()
                const document = {
                    getElementsByClassName: mockGetElementsByClassName,
                }
                mockGetElementsByClassName.mockReturnValue([
                    {
                        getAttribute: mockGetAttribute1,
                    },
                    {
                        getAttribute: mockGetAttribute2,
                    },
                ])
                mockGetAttribute1.mockReturnValue("test-1")
                mockGetAttribute2.mockReturnValue("test-2")
                handleVisualPillsImpression(document as any)
                expect(TrackVisualPillsImpression).toHaveBeenCalledWith("test-1 | test-2")
            })
        })
    })

    describe("handleSeoPillsImpression", () => {
        describe("When there are visual pills present", () => {
            it("should read the item names", () => {
                const mockGetElementsByClassName = jest.fn()
                const mockTextContent1 = jest.fn()
                const mockTextContent2 = jest.fn()
                const document = {
                    getElementsByClassName: mockGetElementsByClassName,
                }
                mockGetElementsByClassName.mockReturnValue([
                    {
                        textContent: mockTextContent1,
                    },
                    {
                        textContent: mockTextContent2,
                    },
                ])
                mockTextContent1.mockReturnValue("test-1")
                mockTextContent2.mockReturnValue("test-2")
                handleSeoPillsImpression(document as any)
                expect(TrackVisualPillsImpression).toHaveBeenCalledWith("test-1 | test-2")
            })
        })
    })
})
