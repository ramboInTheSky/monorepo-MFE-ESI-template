import {amidoMaterialUITheme} from "./index"
import {mockColors} from "../../__mocks__/mockTheme"

describe("Given a Material UI Theme creator", () => {
    describe("When direction is ltr", () => {
        it("should match snapshot when colors are passed in", () => {
            expect(amidoMaterialUITheme(mockColors, "ltr")).toMatchSnapshot()
        })
    })
    describe("When direction is rtl", () => {
        it("should match snapshot when colors are passed in", () => {
            expect(amidoMaterialUITheme(mockColors, "ltr")).toMatchSnapshot()
        })
    })
})
