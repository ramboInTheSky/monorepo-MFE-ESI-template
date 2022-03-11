import {Dimensions, PlpSectionSizes} from "."

describe("Model - dimensions: ", () => {
    it("should match the Dimensions", () => {
        const dimensions: Dimensions = {
            plpStyleConfig: {
                productWidthSize: 75,
                inPageFiltersBreakpoint: "lg",
                itemsPerRow: {
                    xs: 4,
                    sm: 4,
                    md: 6,
                    lg: 6,
                    xl: 8,
                },
            },
        }
        expect(dimensions).toMatchSnapshot()
    })
    it("should match the PlpSectionSizes", () => {
        const plpSectionSizes: PlpSectionSizes = {
            productWidthSize: 75,
            inPageFiltersBreakpoint: "lg",
            itemsPerRow: {
                xs: 4,
                sm: 4,
                md: 6,
                lg: 6,
                xl: 8,
            },
        }
        expect(plpSectionSizes).toMatchSnapshot()
    })
})
