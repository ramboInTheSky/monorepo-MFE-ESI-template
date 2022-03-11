import {getCookieDomain} from "./getCookieDomain"

describe("Util: getCookieDomain", () => {
    it("should return cookie attibutes object of https://www.amido.com", () => {
        const siteUrl = "https://www.amido.com"
        expect(getCookieDomain(siteUrl)).toEqual(".amido.com")
    })
    it("should return cookie attibutes object of https://accounts.next.mx", () => {
        const siteUrl = "https://accounts.next.mx"
        expect(getCookieDomain(siteUrl)).toEqual(".next.mx")
    })
    it("should return cookie attibutes object of https://uk2-uat23.test.ecomm.systems.next", () => {
        const siteUrl = "https://uk2-uat23.test.ecomm.systems.next"
        expect(getCookieDomain(siteUrl)).toEqual(".systems.next")
    })
    it("should return cookie attibutes object of https://accounts.next.com.ee", () => {
        const siteUrl = "https://accounts.next.com.ee"
        expect(getCookieDomain(siteUrl)).toEqual(".next.com.ee")
    })
    it("should return attibutes object of http://localhost:3000", () => {
        const siteUrl = "http://localhost:3000"
        expect(getCookieDomain(siteUrl)).toBe("")
    })
})
