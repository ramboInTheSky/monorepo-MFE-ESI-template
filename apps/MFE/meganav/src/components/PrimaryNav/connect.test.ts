import {mergeProps} from "./connect"

describe("Components/PrimaryNav - Given connect - mapDispatchToProps()", () => {
    it("should return dispatch methods from connect", () => {
        const dispatch = jest.fn()
        const got = mergeProps({}, {dispatch}, {})
        expect(got).toHaveProperty("closeNav")
    })
    it("should fire dispatch twice when closeNav is called", () => {
        const dispatch = jest.fn()
        const got = mergeProps({}, {dispatch}, {})
        got.closeNav({currentTarget: {scrollLeft: 1}})
        expect(dispatch).toHaveBeenCalledTimes(2)
    })
})
