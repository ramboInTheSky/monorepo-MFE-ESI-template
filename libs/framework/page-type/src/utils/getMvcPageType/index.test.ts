import {getMvcPageType} from "."

describe("Utils: getMvcPageType", () => {
    const {platmodflags} = window

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        delete window.platmodflags
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.platmodflags = {
            gtmPageType: 'test-mvc-page'
        }
    })

    afterEach(() => {
        window.platmodflags = platmodflags
    })

    it("should return test-mvc-page", () => {
        expect(getMvcPageType()).toEqual("test-mvc-page")
    })
    it("should return the undefinded if no gtmPageType on window.platmodflags", () => {
        window.platmodflags = null
        expect(getMvcPageType()).toEqual(undefined)
    })
})
