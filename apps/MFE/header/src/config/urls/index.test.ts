import urls from "."

describe("Url content", () => {
    it("Should match snapshot", () => {
        expect(urls).toMatchSnapshot()
    })
})
