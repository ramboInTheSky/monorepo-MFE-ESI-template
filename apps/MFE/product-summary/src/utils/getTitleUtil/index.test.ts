import getTitleUtil from "."
import {Fits} from "../../config/constants"

jest.mock("../colourwayBuilders", () => ({
    formatTitle: () => "test title",
}))

describe("given a getTitleUtil", () => {
    it("should return the correct title when passed on props", () => {
        const colourWayDataProp = {
            id: "test",
            title: "White T-Shirt",
            url: "",
            selected: true,
            fits: Fits.Regular,
            colour: "Whiue",
            price: "£2",
            salePrice: "£2",
            wasPrice: "£2",
        }

        const props = {
            enabledSearchDesc: true,
            title: "White T-Shirt",
            selectedColourway: colourWayDataProp,
            fit: [Fits.Regular],
            department: "Clothes",
            colourways: colourWayDataProp,
            isEnglishLang: true,
        }

        const res = getTitleUtil(props as any)
        expect(res).toBe("White T-Shirt")
    })

    it("should return the correct title when passed empty string for selectedColourway props", () => {
        const colourWayDataProp = {
            id: "test",
            title: "",
            url: "",
            selected: true,
            fits: Fits.Regular,
            colour: "Whiue",
            price: "£2",
            salePrice: "£2",
            wasPrice: "£2",
        }

        const props = {
            enabledSearchDesc: true,
            title: "White T-Shirt",
            selectedColourway: colourWayDataProp,
            fit: [Fits.Regular],
            department: "Clothes",
            colourways: colourWayDataProp,
            isEnglishLang: true,
        }

        const res = getTitleUtil(props as any)
        expect(res).toBe("")
    })
    it("should return test title using the formatTitle", () => {
        const colourWayDataProp = {
            id: "test",
            title: "",
            url: "",
            selected: true,
            fits: Fits.Regular,
            colour: "Whiue",
            price: "£2",
            salePrice: "£2",
            wasPrice: "£2",
        }

        const props = {
            enabledSearchDesc: false,
            title: "White T-Shirt",
            selectedColourway: colourWayDataProp,
            fit: [Fits.Regular],
            department: "Clothes",
            colourways: colourWayDataProp,
            isEnglishLang: true,
        }

        const res = getTitleUtil(props as any)
        expect(res).toBe("test title")
    })
})
