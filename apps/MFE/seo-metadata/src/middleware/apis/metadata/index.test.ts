import Logger from "@monorepo/core-logger"
import axios from "../../core/xhr"
import metadataRouter, {getMetadataTemplate} from "."

import {SeoMetadataProps} from "../../../models/Metadata"

import {CACHE_HEADER_LAST_MODIFIED, CACHE_HEADER_CACHE_TAGS} from "../../../config/constants"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../../core/xhr", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(headers => {
        if (headers.isError) throw new Error("ERROR")
        return {
            language: "en",
            realm: "Amido",
            territory: "GB",
        }
    }),
}))

const mockRequest = {
    headers: {
        "x-monorepo-correlation-id": "123",
        "x-monorepo-time-machine-date": "01-01-2000",
    },
    query: {urlPath: "Mock/UrlPath"},
    siteUrl: {
        url: "www.test.com",
    },
}

const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
    type: jest.fn(() => mockResponse),
    end: jest.fn(),
    set: jest.fn(),
}
const mockLastModified = "Tue, 11 May 2021 08:09:26 GMT"
const mockCacheTag = "sx-seometadata-0D926095BBB2C4CDD53DB3AC67518287A8224EF00987429898D287624DF988D9"

function mockSuccessfulAxiosResponse(metadata: SeoMetadataProps | null) {
    const data = metadata || null
    const headers = {
        [CACHE_HEADER_LAST_MODIFIED]: mockLastModified,
        [CACHE_HEADER_CACHE_TAGS]: mockCacheTag,
    }
    ;(axios as any).mockImplementationOnce(async () => {
        return Promise.resolve({
            status: 200,
            data,
            headers,
        })
    })
}

describe("Given a seo metadata api", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("When api returns no data", () => {
        beforeEach(async done => {
            mockSuccessfulAxiosResponse(null)

            await getMetadataTemplate(mockRequest as any, mockResponse)

            done()
        })

        it("should call the seo metadata api with the correct params", () => {
            expect(axios).toHaveBeenCalledWith({
                url: "superman/api/seo-metadata/Amido/GB/en/v1/seo-metadata/Mock/UrlPath",
                method: "get",
            })
        })

        it("should respond with the correct failure response", () => {
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.set).toHaveBeenCalledWith({
                "x-monorepo-override-seo": "false",
                "Content-Length": 0,
                "Content-Type": "text/html",
            })
            expect(mockResponse.send).toHaveBeenCalled()
        })
    })
    describe("When api returns data", () => {
        beforeEach(async done => {
            mockSuccessfulAxiosResponse({
                seoTitle: "title",
                seoDescription: "descr",
                seoRobots: "robots",
                seoKeywords: "keywords",
                seoCanonical: "Canonical",
            })

            await getMetadataTemplate(mockRequest as any, mockResponse)

            done()
        })

        it("should call the seo metadata api with the correct params", () => {
            expect(axios).toHaveBeenCalledWith({
                url: "superman/api/seo-metadata/Amido/GB/en/v1/seo-metadata/Mock/UrlPath",
                method: "get",
            })
        })

        it("should respond with the correct response for res.set", () => {
            expect(mockResponse.set.mock.calls[0]).toEqual(["last-modified", mockLastModified])
            expect(mockResponse.set.mock.calls[1]).toEqual(["edge-cache-tag", mockCacheTag])
            expect(mockResponse.set.mock.calls[2]).toEqual([
                {
                    "Content-Length": 188,
                    "Content-Type": "text/html",
                    "x-monorepo-override-seo": "true",
                },
            ])
        })

        it("should have match the snapshot", () => {
            expect(mockResponse.send).toMatchSnapshot()
        })
    })

    describe("When there is an internal server error", () => {
        const error = new Error("Ooops...")

        beforeEach(async done => {
            ;(axios as any).mockImplementationOnce(() => {
                throw error
            })
            await getMetadataTemplate(mockRequest as any, mockResponse)
            done()
        })

        it("should respond with the correct failure response", () => {
            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(mockResponse.end).toHaveBeenCalledWith()
        })

        it("should log the error", () => {
            // eslint-disable-next-line
            expect(Logger.error).toHaveBeenCalledWith(error)
        })
    })
})

describe("given a products fragment router", () => {
    it("should define a 'get' route with the correct parameters", () => {
        const mockExpressRouter = {get: jest.fn()}

        metadataRouter(mockExpressRouter as any)

        expect(mockExpressRouter.get).toHaveBeenCalledWith("/seo/seo-metadata*?", expect.any(Function))
    })
})
