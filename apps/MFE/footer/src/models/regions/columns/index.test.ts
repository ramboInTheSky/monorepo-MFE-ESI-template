import {DefaultColumns} from "."

describe("Model: Regions/columns", () => {
    it("should match the snapshot - DefaultColumns", () => {
        expect(DefaultColumns).toMatchSnapshot()
    })
})
