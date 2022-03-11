import {getOrigin} from "."

describe("Get Origin of URL", () => {
    const originWindow = window

    afterEach(() => {
        // eslint-disable-next-line no-global-assign
        window = originWindow
    })

    it("Should be falsy for invalid url ", () => {
        const url = "/sample"
        expect(getOrigin(url)).toBeFalsy()
    })

    it("Should be falsy for empty string parameter", () => {
        const url = ""
        expect(getOrigin(url)).toBeFalsy()
    })

    it("Should return origin for IE branch", () => {
        const url = "https://www.amido.com/en/styles/#45367390"
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.URL = null
        expect(getOrigin(url)).toEqual("https://www.amido.com")
    })

    it("Should return origin", () => {
        const url = "https://www.amido.com/en/styles/#45367390"
        expect(getOrigin(url)).toEqual("https://www.amido.com")
    })
})
