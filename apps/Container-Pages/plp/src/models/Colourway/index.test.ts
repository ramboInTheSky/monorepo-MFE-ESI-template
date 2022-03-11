import {Colourway} from "."

describe("Model - Colourway: ", () => {
    it("should match the Colourway", () => {
        expect(new Colourway()).toMatchSnapshot()
    })
})
