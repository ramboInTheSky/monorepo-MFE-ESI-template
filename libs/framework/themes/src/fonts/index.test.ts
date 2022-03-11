import {FONTS, fontBuilder, buildFont} from "./index"
import {mockColors as theme} from "../../__mocks__/mockTheme"

describe("Given a azoRegular font", () => {

    describe("FONTS", () => {
        it("match snapshot", () => {
            expect(FONTS(theme as any, "/fonts", "#product")).toMatchSnapshot()
        })
    })
    it("buildFont returns correct string", () => {
        expect(buildFont("Test-Font", "woff", "/fonts")).toMatchSnapshot()
    })

    it("fontBuilder returns several font declarations", () => {
        expect(fontBuilder("Test-Font", "/fonts")("woff", "ttf", "otf")).toMatchSnapshot()
    })
})
