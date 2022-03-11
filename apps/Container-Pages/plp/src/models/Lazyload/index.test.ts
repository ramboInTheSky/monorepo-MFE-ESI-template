import {LAZYLOADING_TYPE, PREV_PAGE, NEXT_PAGE, FILTERING, NO_LAZYLOAD} from "."

describe("Model - Lazyload: ", () => {
    it("should match the FILTERING", () => {
        const mockTestState: LAZYLOADING_TYPE = FILTERING
        expect(mockTestState).toMatchSnapshot()
    })
    it("should match the NEXT_PAGE", () => {
        const mockTestState: LAZYLOADING_TYPE = NEXT_PAGE
        expect(mockTestState).toMatchSnapshot()
    })
    it("should match the PREV_PAGE", () => {
        const mockTestState: LAZYLOADING_TYPE = PREV_PAGE
        expect(mockTestState).toMatchSnapshot()
    })
    it("should match the NO_LAZYLOAD", () => {
        const mockTestState: LAZYLOADING_TYPE = NO_LAZYLOAD
        expect(mockTestState).toMatchSnapshot()
    })
})
