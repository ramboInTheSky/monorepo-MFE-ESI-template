// placeholderimport {SettingsModel} from "../../models/settings"
import {HeadersModel, Api, HTTPMethod, buildExport, apiURL, localEndpoint, routeDefinition, apiMethod} from "."

describe("Config - endpoints - utils and Api class: ", () => {
    let testApi
    beforeEach(() => {
        class TestApi implements Api {
            baseURL = `base-url`
            version = "v1"
            endpoints = {
                myLovelyApiEndpoint: {
                    routeDefinition: "/test/:id",
                    getLocalURL: (id?: string) => `/test/${id ?? ""}`,
                    getRemoteURL: (id?: string) => `/external-test-api-URL/${id ?? ""}`,
                    method: HTTPMethod.get,
                },
                myClientSideApiEndpoint: {
                    routeDefinition: "/test/:id",
                    getLocalURL: (id?: string) => `/test/${id ?? ""}`,
                    getRemoteURL: (id?: string) => `/external-test-api-URL/${id ?? ""}`,
                    method: HTTPMethod.get,
                },
            }
        }
        testApi = new TestApi()
    })

    it("should build an api config object with buildExport", () => {
        expect(buildExport(testApi, "myLovelyApiEndpoint")).toEqual({
            localEndpoint: expect.any(Function),
            method: "get",
            routeDefinition: "/test/:id",
            url: expect.any(Function),
        })
    })
    it("should build an api config object for a cient-side-only endpoint with buildExport", () => {
        expect(buildExport(testApi, "myClientSideApiEndpoint")).toEqual({
            localEndpoint: expect.any(Function),
            method: "get",
            routeDefinition: "/test/:id",
            url: expect.any(Function),
        })
    })
    it("should build an api config object with buildExport with realmOnly is true", () => {
        const realmOnly = true
        const mockedSettings = {...new HeadersModel(), realm: "Amido"}
        const mockedBuildExport = buildExport(testApi, "myLovelyApiEndpoint", realmOnly)
        const mockedApiUrl = mockedBuildExport.url(mockedSettings)("param")
        expect(mockedBuildExport).toEqual({
            localEndpoint: expect.any(Function),
            method: "get",
            routeDefinition: "/test/:id",
            url: expect.any(Function),
        })
        expect(mockedApiUrl).toEqual("base-url/Amido/v1/external-test-api-URL/param")
    })
    it("should build an external URL with apiURL", () => {
        const mockedSettings = {...new HeadersModel(), realm: "Amido", territory: "GB", language: "en"}
        expect(apiURL(testApi)("myLovelyApiEndpoint")(mockedSettings)()).toEqual(
            "base-url/Amido/GB/en/v1/external-test-api-URL/",
        )
    })
    it("should build an external URL ith parameters with apiURL", () => {
        const mockedSettings = {...new HeadersModel(), realm: "Amido", territory: "GB", language: "en"}
        expect(apiURL(testApi)("myLovelyApiEndpoint")(mockedSettings)("param")).toEqual(
            "base-url/Amido/GB/en/v1/external-test-api-URL/param",
        )
    })
    it("should build an external URL with parameters and realmOnly is true with apiURL", () => {
        const realmOnly = true
        const mockedSettings = {...new HeadersModel(), realm: "Amido"}
        expect(apiURL(testApi, realmOnly)("myLovelyApiEndpoint")(mockedSettings)("param")).toEqual(
            "base-url/Amido/v1/external-test-api-URL/param",
        )
    })
    it("should return a function with localEndpoint", () => {
        expect(localEndpoint(testApi)("myLovelyApiEndpoint")).toBeInstanceOf(Function)
    })
    it("should build an internal URL with localEndpoint", () => {
        expect(localEndpoint(testApi)("myLovelyApiEndpoint")()).toEqual("/test/")
    })
    it("should build an internal URL with params with localEndpoint", () => {
        expect(localEndpoint(testApi)("myLovelyApiEndpoint")("param")).toEqual("/test/param")
    })
    it("should retrieve a route definition with routeDefinition", () => {
        expect(routeDefinition(testApi)("myLovelyApiEndpoint")).toEqual("/test/:id")
    })
    it("should retrieve a route definition with apiMethod", () => {
        expect(apiMethod(testApi)("myLovelyApiEndpoint")).toEqual("get")
    })
})
