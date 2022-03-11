import seoRedirectMiddlware from "."

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockResponse = {
    set: jest.fn(),
    redirect: jest.fn(),
}

const mockNext = jest.fn()

describe("SEO Redirect Middleware ", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should redirect if category search filters not alphabetically ordered  ", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/use-weddingguest-brand-roman-brand-yours-isort-score",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware({...mockRequest}, mockResponse, mockNext)
        expect(mockResponse.redirect).toHaveBeenCalled()
    })
    it("Should redirect if category search filters not alphabetically ordered  with price", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/use-weddingguest-brand-roman-brand-yours-minprice-12000-maxprice-32000-isort-score",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware({...mockRequest}, mockResponse, mockNext)
        expect(mockResponse.redirect).toHaveBeenCalled()
    })
    it("Should redirect if category search filters not alphabetically ordered due to price", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/minprice-12000-maxprice-32000-brand-roman-brand-yours-use-weddingguest-isort-score",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware({...mockRequest}, mockResponse, mockNext)
        expect(mockResponse.redirect).toHaveBeenCalled()
    })
    it("Should redirect if category search filters not alphabetically ordered due to price with page number", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/minprice-12000-maxprice-32000-brand-roman-brand-yours-use-weddingguest-isort-score?p=12",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware({...mockRequest}, mockResponse, mockNext)
        expect(mockResponse.redirect).toHaveBeenCalled()
    })
    it("Should not redirect if category search filters alphabetically ordered due to price with page number", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/brand-roman-brand-yours-use-weddingguest-minprice-12000-maxprice-32000-isort-score?p=12",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware({...mockRequest}, mockResponse, mockNext)
        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).not.toHaveBeenCalled()
    })
    it("Should redirect if category search filters not alphabetically ordered with country and language in site url ", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/use-weddingguest-brand-roman-brand-yours-isort-score",
            siteUrl: {url: "https://amidodirect.com/com/de"},
        }
        seoRedirectMiddlware({...mockRequest}, mockResponse, mockNext)
        expect(mockResponse.redirect).toHaveBeenCalled()
    })
    it("Should call NextOperation if category search filters are alphabetically ordered", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/brand-roman-brand-yours-use-weddingguest-isort-score",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware(mockRequest, mockResponse, mockNext)
        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).not.toHaveBeenCalled()
    })
    it("Should call NextOperation if is keyword search", () => {
        const mockRequest = {originalUrl: "/search?w=dress", siteUrl: {url: "https://amido.com/de"}}
        seoRedirectMiddlware(mockRequest, mockResponse, mockNext)
        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).not.toHaveBeenCalled()
    })
    it("Should call  if category search has no filters", () => {
        const mockRequest = {
            originalUrl:
                "/shop/gender-women-productaffiliation-clothing/brand-roman-brand-yours-use-weddingguest-isort-score",
            siteUrl: {url: "https://amidodirect.com/com/de"},
        }
        seoRedirectMiddlware(mockRequest, mockResponse, mockNext)
        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).not.toHaveBeenCalled()
    })
    it("Should call NextOperation if only isort score is applied as a filter", () => {
        const mockRequest = {
            originalUrl: "/shop/gender-women-productaffiliation-clothing/isort-score",
            siteUrl: {url: "https://amido.com/de"},
        }
        seoRedirectMiddlware(mockRequest, mockResponse, mockNext)
        expect(mockNext).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).not.toHaveBeenCalled()
    })
})
