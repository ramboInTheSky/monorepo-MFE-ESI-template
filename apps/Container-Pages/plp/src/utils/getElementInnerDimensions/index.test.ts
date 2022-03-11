import {getElementInnerDimensions} from "."

describe("Given a getElementInnerDimensions() function", () => {
    beforeAll(() => {
        const mockComputedStyle = {
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
        }
        jest.spyOn(window, "getComputedStyle").mockImplementation(() => mockComputedStyle as any)
    })

    afterAll(() => {
        const windowComputedStyleMock = window.getComputedStyle as jest.Mock
        windowComputedStyleMock.mockRestore()
    })
    it("should return height and width for element", () => {
        expect(getElementInnerDimensions({clientHeight: 10, clientWidth: 10} as any)).toEqual({height: 10, width: 10})
    })
})
