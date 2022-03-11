import {replaceSeoMetadataPlaceholders} from "."

describe("Given `replaceSeoMetadataPlaceholders()`", () => {
    it("should replace the seo metadata placeholders", () => {
        const seoMetadata = {
            title: "Buy {SearchTerm} in {Filters} from | Amido {CountryName}",
            description: "Shop for {SearchTerm} in {Filters} at - Amido {CountryName}",
            keywords: "{SearchTerm}, {Filters}",
            robots: "noindex, nofollow, {SearchTerm}, {Filters}",
        }
        const placeholders = {
            searchTerm: "dress",
            filters: "4 red",
            market: "United Arab Emirates",
        }
        const result = replaceSeoMetadataPlaceholders(seoMetadata, placeholders)
        expect(result).toEqual({
            title: "Buy dress in 4 red from | Amido United Arab Emirates",
            description: "Shop for dress in 4 red at - Amido United Arab Emirates",
            keywords: "dress, 4 red",
            robots: "noindex, nofollow, dress, 4 red",
        })
    })

    it("shouldnt error from special characters", () => {
        const seoMetadata = {
            title: "Buy {SearchTerm} in {Filters} from | Amido {CountryName}",
            description: "Shop for {SearchTerm} in {Filters} at - Amido {CountryName}",
            keywords: "{SearchTerm}, {Filters}",
            robots: "noindex, nofollow, {SearchTerm}, {Filters}",
        }
        const placeholders = {
            searchTerm: "\"\"",
            filters: "4 red",
            market: "United Arab Emirates",
        }
        const result = replaceSeoMetadataPlaceholders(seoMetadata, placeholders)
        expect(result).toEqual({
            title: "Buy \"\" in 4 red from | Amido United Arab Emirates",
            description: "Shop for \"\" in 4 red at - Amido United Arab Emirates",
            keywords: "\"\", 4 red",
            robots: "noindex, nofollow, \"\", 4 red",
        })
    })
})
