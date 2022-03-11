import {formatCdnPathWithVariant} from "."

describe("Format CDN path with variant", () => {
    it("should return a valid URL when passed a path for the Icon", () => {
        const fullUrl = "/icons/footer/amido/socialmedia/icon-social-facebook.svg"
        const result = formatCdnPathWithVariant(fullUrl, "amido", "default")
        const expectedResult = "/icons/footer/amido/default/icon-social-facebook.svg"
        expect(result).toEqual(expectedResult)
    })

    it("should return a valid URL when passed a file name", () => {
        const fileName = "icon-social-facebook.svg"
        const result = formatCdnPathWithVariant(fileName, "amido", "default")
        const expectedResult = "/icons/footer/amido/default/icon-social-facebook.svg"
        expect(result).toEqual(expectedResult)
    })
})
