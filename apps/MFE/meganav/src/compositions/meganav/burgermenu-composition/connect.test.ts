import {mapDispatchToProps} from "./connect"

describe("Burgermenu Composition - Given connect - mapStateToProps()", () => {
    it("should return expected data from store", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        expect(got).toHaveProperty("setCompositionSettings")
    })

    it("should fire dispatch when setCompositionSettings is called", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        got.setCompositionSettings()
        expect(dispatch).toHaveBeenCalledTimes(1)
    })
})
