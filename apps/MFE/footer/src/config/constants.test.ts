import {
    REPLACE_USERNAME,
    BASELINECSS_MATERIALUI,
    HIDE_LINKS_FOR_AMIDO_INTERNATIONAL,
    SITE_URL_HEADER,
    REALM_HEADER,
    TERRITORY_HEADER,
    REPLACE_YEAR,
    VARIANT_DEFAULT,
} from "./constants"

describe("config: constants", () => {
    it("should match the snapshot for REPLACE_USERNAME", () => {
        expect(REPLACE_USERNAME).toMatchSnapshot()
    })
    it("should match the snapshot for BASELINECSS_MATERIALUI", () => {
        expect(BASELINECSS_MATERIALUI).toMatchSnapshot()
    })
    it("should match the snapshot for HIDE_LINKS_FOR_AMIDO_INTERNATIONAL", () => {
        expect(HIDE_LINKS_FOR_AMIDO_INTERNATIONAL).toMatchSnapshot()
    })
    it("should match the snapshot for SITE_URL_HEADER", () => {
        expect(SITE_URL_HEADER).toMatchSnapshot()
    })
    it("should match the snapshot for REALM_HEADER", () => {
        expect(REALM_HEADER).toMatchSnapshot()
    })
    it("should match the snapshot for TERRITORY_HEADER", () => {
        expect(TERRITORY_HEADER).toMatchSnapshot()
    })
    it("should match the snapshot for REPLACE_YEAR", () => {
        expect(REPLACE_YEAR).toMatchSnapshot()
    })
    it("should match the snapshot for VARIANT_DEFAULT", () => {
        expect(VARIANT_DEFAULT).toMatchSnapshot()
    })
})
