import getPageType from "."

const urls = [
    "amido.com",
    "http://amido.com",
    "http://amido.com/",
    "http://www.amido.com",

    "amido.de/de",
    "http://amido.de/de",
    "http://amido.de/de/",
    "https://www.amido.de/de",

    "amido.com/fr/en",
    "https://amido.com/fr/en",
    "https://amido.com/fr/en/",
    "https://www.amidodirect.com/fr/en",

    "uk-uat0.test.ecomm.systems",
    "https://uk-uat0.test.ecomm.systems",
    "https://uk-uat0.test.ecomm.systems/",
    "https://www.uk-uat0.test.ecomm.systems/",

    "amido.com.local.uat17.test/ca/en",
    "https://amido.com.local.uat17.test/ca/en",
    "https://amido.com.local.uat17.test/ca/en/",
    "https://www.amidodirect.com.local.uat17.test/ca/en",

    "amido.com.local",
    "https://amido.com.local",
    "https://amido.com.local/",
    "https://www.amido.com.local",
]

describe("Given a getPageType", () => {
    const {location} = window
    beforeAll((): void => {
        delete window.location
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.location = {href: jest.fn()}
    })

    afterAll((): void => {
        window.location = location
    })
    describe("when given a siteUrl that matches pagetype records", () => {
        it('should return "searchResults" if passed "/search"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/search`
                expect(getPageType(url)).toBe("searchResults")
            })
        })
        it('should return "productListPage" if passed "/shop/suits"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/shop/suits`
                expect(getPageType(url)).toBe("productListPage")
            })
        })
        it('should return "sale" if passed "sale/search?=red"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/sale/search?=red`
                expect(getPageType(url)).toBe("sale")
            })
        })
        it('should return "sale" if passed "clearance/search?=red"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/clearance/search?=red`
                expect(getPageType(url)).toBe("sale")
            })
        })
        it('should return "clearance" if passed "clearance"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/clearance`
                expect(getPageType(url)).toBe("clearance")
            })
        })
        it('should return "womenLandingPage" if passed "women"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/women`
                expect(getPageType(url)).toBe("womenLandingPage")
            })
        })
        it('should return "homePage" if passed "/"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/`
                expect(getPageType(url)).toBe("homePage")
            })
        })
        it('should return "homePage" if passed ""', () => {
            urls.forEach(url => {
                window.location.href = `${url}`
                expect(getPageType(url)).toBe("homePage")
            })
        })
        it('should return "favouritesListPage" if passed "favourites"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/favourites`
                expect(getPageType(url)).toBe("favouritesListPage")
            })
        })
        it('should return "storeLocator" if passed "stores"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/stores`
                expect(getPageType(url)).toBe("storeLocator")
            })
        })
        it('should return "shoppingBag" if passed "shoppingbag"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/shoppingbag`
                expect(getPageType(url)).toBe("shoppingBag")
            })
        })
        it('should return "sitemap" if passed "site-map"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/site-map`
                expect(getPageType(url)).toBe("sitemap")
            })
        })
        it('should return "termsAndConditions" if passed "terms"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/terms`
                expect(getPageType(url)).toBe("termsAndConditions")
            })
        })
        it('should return "privacy" if passed "privacy"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/privacy`
                expect(getPageType(url)).toBe("privacy")
            })
        })
        it('should return "error" if passed "/error"', () => {
            urls.forEach(url => {
                window.location.href = `${url}/error`
                expect(getPageType(url)).toBe("error")
            })
        })
    })
    describe("on the MVC site, when given a siteUrl that doesn't match pagetype records", () => {
        it('should return "testMvcPage" if the url doesnt match conditions in getPageType', () => {
            urls.forEach(url => {
                window.location.href = `${url}/testMvcPage`
                window.platmodflags = {
                    gtmPageType: "testMvcPage",
                }
                expect(getPageType(url)).toEqual("testMvcPage")
            })
        })
    })
})
