import calcScrollOffset from "."

const position = 50
const clickedElement = {
    getBoundingClientRect: () => ({right: position + 50, width: 200, left: position}),
} as HTMLElement
const event = {clientX: 50, type: "click"} as React.MouseEvent<EventTarget>
const snapPosition = 44

describe("calculateScrollOffset", () => {
    it("Should return scroll offset in case of click event", () => {
        const got = calcScrollOffset(event, clickedElement, snapPosition)

        expect(got).toEqual(-200)
    })
    it("Should return scroll offset in case of hover event", () => {
        const got = calcScrollOffset({...event, type: "mousein"}, clickedElement, snapPosition)

        expect(got).toEqual(-200)
    })
})
