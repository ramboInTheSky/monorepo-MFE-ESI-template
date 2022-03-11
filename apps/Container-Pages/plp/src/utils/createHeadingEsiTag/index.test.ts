import createHeadingEsiTag from "."

jest.mock("../../config/env", () => ({
    REACT_APP_APP_URL: "www.test123.com",
}))

describe(`Given a ${createHeadingEsiTag.name}`, () => {
    describe("When supplied with heading params", () => {
        it("should return an ESI tag", () => {
            const tag = createHeadingEsiTag("www.test.com", true, `/shop/women`, 10, "t-shirts")
            expect(tag).toMatchSnapshot()
        })

        it("When not using the devEsi solution it should return an ESI tag", () => {
            const tag = createHeadingEsiTag("www.test.com", false, "www.test.com/shop/women", 10, "t-shirts")
            expect(tag).toMatchSnapshot()
        })
    })
})
