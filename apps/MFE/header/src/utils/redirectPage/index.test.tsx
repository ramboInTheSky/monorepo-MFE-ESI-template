import redirectPage from "."

describe("Utils: getTextAlignment() - ", () => {
    describe("When the selectedCountry does not have the selectedLanguage", () => {
        const selectedCountryMock = {
            Name: "nl",
            Country: "Netherlands",
            CountryCode: "NL",
            DisplayText: "Netherlands (€)",
            NativeCountryText: "",
            RedirectUrl: "",
            DefaultLanguageName: "nl",
            Languages: [
                {
                    Name: "en",
                    Value: "English",
                    TargetUrl: "http://www.amido.com/nl/en",
                    AccountDomainUrl: "account.amido.com/nl/en",
                },
                {
                    Name: "nl",
                    Value: "Nederlands ",
                    TargetUrl: "http://www.amido.com/nl/nl",
                    AccountDomainUrl: "account.amido.com/nl/nl",
                },
            ],
            iconUrl: "spiderman/platmod/icons/shared/countryflags/nl.png",
            DisplaySequenceAttribute: "",
            PromotedFlagIndex: 0,
            Region: "Europe",
            DomainType: "",
            HideInDropdown: false,
            HideInPage: false,
            IsROW: false,
        }
        it("should not redirect", () => {
            // eslint-disable-next-line
            window = Object.create(window)
            const url = "http://dummyurl.co.uk"
            Object.defineProperty(window, "location", {
                value: {
                    href: url,
                },
            })

            redirectPage(selectedCountryMock, "de")

            expect(window.location.href).toBe("http://dummyurl.co.uk")
        })
    })
    describe("When the selectedCountry has the selectedLanguage", () => {
        const selectedCountryMock = {
            Name: "nl",
            Country: "Netherlands",
            CountryCode: "NL",
            DisplayText: "Netherlands (€)",
            NativeCountryText: "",
            RedirectUrl: "",
            DefaultLanguageName: "nl",
            Languages: [
                {
                    Name: "en",
                    Value: "English",
                    TargetUrl: "http://www.amido.com/nl/en",
                    AccountDomainUrl: "account.amido.com/nl/en",
                },
                {
                    Name: "nl",
                    Value: "Nederlands ",
                    TargetUrl: "http://www.amido.com/nl/nl",
                    AccountDomainUrl: "account.amido.com/nl/nl",
                },
            ],
            iconUrl: "spiderman/platmod/icons/shared/countryflags/nl.png",
            DisplaySequenceAttribute: "",
            PromotedFlagIndex: 0,
            Region: "Europe",
            DomainType: "",
            HideInDropdown: false,
            HideInPage: false,
            IsROW: false,
        }
        it("should redirect", () => {
            // eslint-disable-next-line
            window = Object.create(window)
            const url = "http://dummyurl.co.uk"
            Object.defineProperty(window, "location", {
                value: {
                    href: url,
                },
            })

            redirectPage(selectedCountryMock, "nl")

            expect(window.location.href).toBe("http://www.amido.com/nl/nl")
        })
    })
})
