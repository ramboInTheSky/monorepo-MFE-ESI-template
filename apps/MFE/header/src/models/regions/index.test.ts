import {SupportedRegionTypes, RegionsModel} from "."
import {SUPPORTED_QUICKLINK_TYPES, SUPPORTED_MY_ACCOUNT_TYPES} from "../../config/constants"

describe("QuickLinks: ", () => {
    it("should match the snapshot - SUPPORTED_QUICKLINK_TYPES", () => {
        expect(SUPPORTED_QUICKLINK_TYPES).toMatchSnapshot()
    })
    it("should match the snapshot - SUPPORTED_MY_ACCOUNT_TYPES", () => {
        expect(SUPPORTED_MY_ACCOUNT_TYPES).toMatchSnapshot()
    })
})

describe("Models/regions - ", () => {
    describe("SupportedRegionTypes: ", () => {
        it("should match the SupportedRegionTypes", () => {
            expect(SupportedRegionTypes.Brand).toMatchSnapshot()
            expect(SupportedRegionTypes.SearchBox).toMatchSnapshot()
            expect(SupportedRegionTypes.QuickLinks).toMatchSnapshot()
            expect(SupportedRegionTypes.Checkout).toMatchSnapshot()
            expect(SupportedRegionTypes.CountryLangSelector).toMatchSnapshot()
            expect(SupportedRegionTypes.Favourites).toMatchSnapshot()
            expect(SupportedRegionTypes.ShoppingBag).toMatchSnapshot()
            expect(SupportedRegionTypes.PrimaryNav).toMatchSnapshot()
        })
    })
    // TODO get rid of this
    describe("RegionsModel: ", () => {
        const regionStyling = {
            Brand: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            SearchBox: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            QuickLinks: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            Checkout: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            CountryLangSelector: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            Favourites: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            ShoppingBag: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            PrimaryNav: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
            BurgerButton: {
                containerSpacing: 1,
                background: "#fff",
                borderColor: "#fff",
                color: "#000000",
            },
        }
        it("should match the RegionsModel", () => {
            expect(regionStyling).toMatchSnapshot()
        })

        it("should snapshot the RegionsModel", () => {
            expect(
                new RegionsModel(
                    regionStyling.Brand,
                    regionStyling.SearchBox,
                    regionStyling.QuickLinks,
                    regionStyling.Checkout,
                    regionStyling.CountryLangSelector,
                    regionStyling.Favourites,
                    regionStyling.ShoppingBag,
                    regionStyling.PrimaryNav,
                    regionStyling.BurgerButton
                ),
            ).toMatchSnapshot()
        })
    })
})
