import api from "."

describe("Config - endpoints - products - getApi: ", () => {
    const mockSettings = {
        realm: "string",
        theme: "object",
        alignment: "string",
        territory: "string",
        language: "string",
    }

    describe("Given `getProducts`", () => {
        const productsApi = api("getProducts")
        it("should return the correct internal endpoint", () => {
            expect(productsApi.localEndpoint()).toEqual("/products")
        })
        it("should return the correct method", () => {
            expect(productsApi.method).toEqual("get")
        })
        it("should return the correct routeDefinition", () => {
            expect(productsApi.routeDefinition).toEqual("/products")
        })

        it("should return the correct external URL", () => {
            const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
            expect(productsApi.url(mockedSettings)()).toEqual("superman/Amido/GB/en/v1/item-numbers")
        })
    })

    describe("Given `getProductsFragment`", () => {
        const productsFragmentApi = api("getProductsFragment")
        it("should return the correct internal endpoint", () => {
            expect(productsFragmentApi.localEndpoint()).toEqual("/products-fragment")
        })
        it("should return the correct method", () => {
            expect(productsFragmentApi.method).toEqual("get")
        })
        it("should return the correct routeDefinition", () => {
            expect(productsFragmentApi.routeDefinition).toEqual("/products-fragment")
        })

        it("should return the correct external URL", () => {
            const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
            expect(productsFragmentApi.url(mockedSettings)()).toEqual("superman/Amido/GB/en/v1/item-numbers")
        })
    })
    describe("Given `getSeoData`", () => {
        const getSeoDataApi = api("getSeoData")
        it("should return the correct internal endpoint", () => {
            expect(getSeoDataApi.localEndpoint()).toEqual("")
        })
        it("should return the correct method", () => {
            expect(getSeoDataApi.method).toEqual("get")
        })
        it("should return the correct routeDefinition", () => {
            expect(getSeoDataApi.routeDefinition).toEqual("/plpstatic/seo-filters/shop/:page/:filters?")
        })

        it("should return the correct external URL", () => {
            const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
            expect(getSeoDataApi.url(mockedSettings)()).toEqual("superman/Amido/GB/en/v1/item-numbers")
        })
    })
})
