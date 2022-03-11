import {breakpoints} from "./index"

describe("Given a set of breakpoints", () => {
    it("should match snapshot", () => {
        expect(breakpoints).toMatchSnapshot()
    })
})
