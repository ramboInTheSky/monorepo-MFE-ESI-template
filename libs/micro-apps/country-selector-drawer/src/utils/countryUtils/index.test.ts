import {getCountryFlagPath, getDefaultLanguage} from "."

describe("getCountryFlagPath function", () => {
    it("should return flag path", () => {
        expect(getCountryFlagPath("https://xcdn.amido.com/content/platmod", "GB")).toEqual(
            "https://xcdn.amido.com/content/platmod/icons/shared/countryflags/gb.png",
        )
    })
})

describe("getDefaultLanguage function", () => {
    it("should return default language", () => {
        const country = {
            countryCode: "GB",
            name: "United Kingdom",
            nameWithCurrency: "United Kingdom (£)",
            isNonStandard: false,
            promotedCountryIndex: 1,
            region: "Europe",
            languages: [
                {
                    id: "en",
                    default: true,
                    targetUrl: "//www.amido.com",
                    name: "English",
                },
                {
                    id: "de",
                    default: false,
                    targetUrl: "//www.amido.de",
                    name: "German",
                },
            ],
        }

        expect(getDefaultLanguage(country)).toEqual({
            id: "en",
            default: true,
            targetUrl: "//www.amido.com",
            name: "English",
        })
    })
})
