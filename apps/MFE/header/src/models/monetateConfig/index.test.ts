import {MonetateData} from "."

describe("Model - MonetateData: ", () => {
    it("Given a MonetateData, it should match the MonetateData snapshot", () => {
        expect(new MonetateData()).toMatchSnapshot()
    })
})