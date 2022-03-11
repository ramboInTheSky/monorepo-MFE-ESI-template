import api from "."

describe("Config - endpoints - products - getApi: ", () => {
    const mockSettings = {
        realm: "string",
        theme: "object",
        alignment: "string",
        territory: "string",
        language: "string",
    }

    describe("Given `getSeoHeadings`", () => {
        const seoMetadataApi = api("getSeoHeadings")
        it("should return the correct internal endpoint", () => {
            expect(seoMetadataApi.localEndpoint()).toEqual("")
        })
        it("should return the correct method", () => {
            expect(seoMetadataApi.method).toEqual("get")
        })
        it("should return the correct routeDefinition", () => {
            expect(seoMetadataApi.routeDefinition).toEqual("/seo/seo-headings*?")
        })

        it("should return the correct external URL", () => {
            const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
            expect(seoMetadataApi.url(mockedSettings)("shop/clothes")).toEqual(
                "superman/api/seo-metadata/Amido/GB/en/v1/seo-headings/shop/clothes",
            )
        })
    })

    describe("Given `getSeoMetadata`", () => {
        const seoMetadataApi = api("getSeoMetadata")
        it("should return the correct internal endpoint", () => {
            expect(seoMetadataApi.localEndpoint()).toEqual("")
        })
        it("should return the correct method", () => {
            expect(seoMetadataApi.method).toEqual("get")
        })
        it("should return the correct routeDefinition", () => {
            expect(seoMetadataApi.routeDefinition).toEqual("/seo/seo-metadata*?")
        })

        it("should return the correct external URL", () => {
            const mockedSettings = {...mockSettings, realm: "Amido", territory: "GB", language: "en"}
            expect(seoMetadataApi.url(mockedSettings)("shop/clothes")).toEqual(
                "superman/api/seo-metadata/Amido/GB/en/v1/seo-metadata/shop/clothes",
            )
        })
    })
})
