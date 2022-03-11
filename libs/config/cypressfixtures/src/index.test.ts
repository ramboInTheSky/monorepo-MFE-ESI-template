import fixture from "./index"

describe("Given a cypress fixture config", () => {
    it("should match snapshot", () => {
        expect(fixture).toMatchSnapshot()
    })
})
