import {getProductTitle} from "."

describe("Given connect - getProductTitle()", () => {
    let state

    it("enabledSearchDesc: true - should return 'test title'", () => {
        state = {
            productSummary: {
                enabledSearchDesc: true,
                summaryData: {
                    colourways: [{title: "test title", selected: true}],
                    fit: "fit",
                    department: "department",
                },
            },
            request: {
                isEnglishLang: true,
            },
        }
        expect(getProductTitle(state)).toEqual("test title")
    })

    it("enabledSearchDesc: false - should return 'test title'", () => {
        state = {
            productSummary: {
                enabledSearchDesc: false,
                summaryData: {
                    title: "apples",
                    colourways: [{title: "test title", selected: true}],
                    fit: "fit",
                    department: "department",
                },
            },
            request: {
                isEnglishLang: true,
            },
        }
        expect(getProductTitle(state)).toEqual("apples")
    })
})
