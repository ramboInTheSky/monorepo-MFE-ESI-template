import build from "."
import {SearchApiRequestTypes} from "../../config/constants"
import {IS_BROWSER} from "../window"

jest.mock("../window", () => ({
    IS_BROWSER: jest.fn(),
}))

describe("Given a searchApiRequestBuilder", () => {
    const bloomreachCookiesInitialVal = {
        brUid2: "testBRUID2",
        brMtSearch: "testBRMTSeach",
    }
    const bloomreachPersonalizationEnabled = true

    describe("When building a Search request", () => {
        let testRequest
        beforeAll(() => {
            testRequest = build(
                "http://amido.com/search?w=red",
                "1234",
                SearchApiRequestTypes.Keyword,
                1,
                1,
                24,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            )
        })

        it("Create a keyword request object", () => {
            expect(testRequest.type).toBe(SearchApiRequestTypes.Keyword)
            expect(testRequest).toMatchSnapshot()
        })
    })

    describe("When building a Category request", () => {
        let testRequest
        beforeAll(() => {
            testRequest = build(
                "http://amido.com/shop/gender-men-category-shirts/use-formal",
                "1234",
                SearchApiRequestTypes.Category,
                1,
                1,
                24,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            )
        })

        it("Create a category request object", () => {
            expect(testRequest.type).toBe(SearchApiRequestTypes.Category)
            expect(testRequest).toMatchSnapshot()
        })
    })

    describe("When building a data shaped request", () => {
        let testRequest
        beforeAll(() => {
            testRequest = build(
                "http://amido.com/shop/gender-men-category-shirts/use-formal",
                "1234",
                SearchApiRequestTypes.Category,
                2,
                2,
                24,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
                ["items", "sorting"],
            )
        })

        it("Create a category request object", () => {
            expect(testRequest).toMatchSnapshot()
        })
    })

    describe('When building a request with disabled bloomreachPersonalization cookies', () => {
        let testRequest
        const bloomreachPersonalizationDisabled = false
        beforeAll(() => {
            testRequest = build(
                "http://amido.com/shop/gender-men-category-shirts/use-formal",
                "1234",
                SearchApiRequestTypes.Category,
                1,
                1,
                24,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationDisabled,
            )
        })

        it("Create a category request object", () => {
            expect(testRequest.type).toBe(SearchApiRequestTypes.Category)
            expect(testRequest).toMatchSnapshot()
        })
    })
    

    describe("When searching for a particular page, client-side", () => {
        describe.each([
            [5, 5, 20, 5],
            [2, 3, 5, 10],
        ])(
            "When the `startPage` is %i and the end page is %i",
            (startPage, endPage, expectedParamsStart, expectedParamsEnd) => {
                it("should create the appropriate param", () => {
                    ;(IS_BROWSER as any).mockImplementation(() => true)
                    const url = "foo"
                    const searchTerm = "bar"
                    const type = SearchApiRequestTypes.Keyword
                    const pageSize = 5
                    const params = build(
                        url,
                        searchTerm,
                        type,
                        startPage,
                        endPage,
                        pageSize,
                        bloomreachCookiesInitialVal,
                        bloomreachPersonalizationEnabled,
                    )
                    expect(params.start).toBe(expectedParamsStart)
                    expect(params.pagesize).toBe(expectedParamsEnd)
                })
            },
        )
    })
    describe("When searching for a particular page, server-side", () => {
        describe.each([
            [5, 5, 20, 5],
            [2, 3, 5, 10],
        ])(
            "When the `startPage` is %i and the end page is %i",
            (startPage, endPage, expectedParamsStart, expectedParamsEnd) => {
                it("should create the appropriate param", () => {
                    ;(IS_BROWSER as any).mockImplementation(() => false)
                    const url = "foo"
                    const searchTerm = "bar"
                    const type = SearchApiRequestTypes.Keyword
                    const pageSize = 5
                    const params = build(
                        url,
                        searchTerm,
                        type,
                        startPage,
                        endPage,
                        pageSize,
                        bloomreachCookiesInitialVal,
                        bloomreachPersonalizationEnabled,
                    )
                    expect(params.start).toBe(expectedParamsStart)
                    expect(params.pagesize).toBe(expectedParamsEnd)
                })
            },
        )
    })
})
