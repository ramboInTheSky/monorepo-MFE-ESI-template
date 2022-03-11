import formatPrice from "."

// import config from "./config.json"
const batchOneTests = [
    "en-ar",
    "en-am",
    "de-at",
    "en-at",
    "en-az",
    "en-by",
    "en-br",
    "bg-bg",
    "en-bg",
    "fr-ca",
    "en-ca",
    "en-cl",
    "en-hr",
    "en-cy",
    "en-cz",
    "cs-cz",
    "da-dk",
    "en-dk",
    "ar-eg",
    "en-eg",
    "ru-ee",
    "en-ee",
    "en-fi",
    "fr-fr",
    "en-fr",
    "en-ge",
    "en-gi",
    "el-gr",
    "en-gr",
    "en-hu",
    "hu-hu",
    "en-is",
    "en-in",
    "en-id",
    "it-it",
    "en-it",
    "ru-lv",
    "en-lv",
    "ar-lb",
    "en-lb",
    "ru-lt",
    "en-lt",
    "fr-lu",
    "en-lu",
    "ms-my",
    "en-my",
    "en-mx",
    "en-nz",
    "en-no",
    "en-om",
    "ar-om",
    "en-pk",
    "en-pe",
    "en-ph",
    "en-pt",
    "en-rs",
    "en-sg",
    "sl-si",
    "en-si",
    "en-za",
    "ko-kr",
    "en-kr",
    "es-es",
    "en-es",
    "sv-se",
    "en-se",
    "de-ch",
    "en-ch",
    "zh-tw",
    "en-tw",
    "en-th",
    "en-tr",
]

describe("Given a price formatter", () => {
    describe("When formatting the price with the config", () => {
        batchOneTests.forEach(locale => {
            const lowercaseLocale = locale.toLocaleLowerCase()
            describe(`locale: ${lowercaseLocale}`, () => {
                it(`should render with no range `, () => {
                    const minPrice = 10
                    const maxPrice = 10

                    const defaultCurrencyCode = "GBP"

                    const realm = "amido"

                    expect(
                        formatPrice(minPrice, maxPrice, defaultCurrencyCode, lowercaseLocale, realm),
                    ).toMatchSnapshot()
                })
                it(`should render with range`, () => {
                    const minPrice = 10
                    const maxPrice = 15

                    const defaultCurrencyCode = "GBP"
                    const realm = "amido"

                    expect(
                        formatPrice(minPrice, maxPrice, defaultCurrencyCode, lowercaseLocale, realm),
                    ).toMatchSnapshot()
                })
            })
        })
    })

    describe("When formatting the price", () => {
        it("When there is no range, it should return correctly formatted price", () => {
            const realm = "amido"
            expect(formatPrice(10, 10, "GBP", "en-GB", realm)).toEqual("£10")
        })

        it("When there is no range and decimals, it should return correctly formatted price", () => {
            const realm = "amido"
            expect(formatPrice(10.5, 10.5, "GBP", "en-GB", realm)).toEqual("£10.50")
        })

        it("When there is a range, it should return correctly formatted price", () => {
            const realm = "amido"
            expect(formatPrice(10, 15, "GBP", "en-GB", realm)).toEqual("£10 - £15")
        })

        it("When there is no price, it should return correctly formatted price", () => {
            const realm = "amido"
            expect(formatPrice(0, 0, "GBP", "en-GB", realm)).toEqual("£0")
        })

        it("When in Saudi English, it should return correctly formatted price", () => {
            const realm = "amido"
            expect(formatPrice(10, 15, "SAR", "en-SA", realm)).toBe("SAR 10 - SAR 15")
        })

        it("When in Saudi Arabic, it should return correctly formatted price", () => {
            const realm = "amido"
            expect(formatPrice(10, 10, "SAR", "ar-SA", realm)).toBe("10 ر.س‏")
        })

        // Bug 34157
        it("should show 2 digits for Thailand correctly when there are pennies", () => {
            const realm = "amido"
            expect(formatPrice(10.5, 12, "USD", "en-th", realm)).toEqual("$10.50 - $12")
        })

        // Bug 34175
        it("should show 0 digits for Malaysia when no pennies", () => {
            const realm = "amido"
            expect(formatPrice(10.5, 12, "MYR", "ms-my", realm)).toEqual("MYR 10.50 - MYR 12")
        })

        // Bug 34159
        it("should show 1000 delimiter as . for Switzerland DE", () => {
            const realm = "amido"
            expect(formatPrice(10000.5, 12, "CHF", "de-ch", realm)).toEqual("CHF 10.000,50 - CHF 12")
        })
        // Bug 34159
        it("should show 1000 delimiter as , for Switzerland EN", () => {
            const realm = "amido"
            expect(formatPrice(10000.5, 12, "CHF", "en-ch", realm)).toEqual("CHF 10,000.50 - CHF 12")
        })

        // Bug 34158
        it("should show a space correctly for Singapore", () => {
            const realm = "amido"
            expect(formatPrice(10000.5, 12, "SGD", "en-sg", realm)).toEqual("SGD 10,000.50 - SGD 12")
        })

        // Bug 34155
        it("should show a , correctly for Denmark thousand separator for English", () => {
            const realm = "amido"
            expect(formatPrice(10000.5, 12, "DKK", "en-dk", realm)).toEqual("DKK10,000.50 - DKK12")
        })
        it("should show a . correctly for Denmark thousand separator for Danish", () => {
            const realm = "amido"
            expect(formatPrice(10000.5, 12, "DKK", "da-dk", realm)).toEqual("DKK10.000,50 - DKK12")
        })

        // Bug 26597
        it("should show $ correctly for Mexico", () => {
            const realm = "amido"
            expect(formatPrice(10000.5, 12, "USD", "en-mx", realm)).toEqual("$10,000.50 - $12")
        })

    })
})
