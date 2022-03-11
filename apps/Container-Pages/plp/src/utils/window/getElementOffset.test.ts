import {getElementOffset} from "./getElementOffset"
import {getDocumentScrollTop} from "./getDocumentScrollTop"
import {getDocumentScrollLeft} from "./getDocumentScrollLeft"

jest.mock("./getDocumentScrollTop")
jest.mock("./getDocumentScrollLeft")

function mockGetDocumentScrollTop(result) {
    ;(getDocumentScrollTop as jest.Mock).mockReturnValue(result)
}

function mockGetDocumentScrollLeft(result) {
    ;(getDocumentScrollLeft as jest.Mock).mockReturnValue(result)
}

function createElementWithBoundingRect(bounds: Partial<DOMRect>) {
    const element = document.createElement("div")
    const elementSpy = jest.spyOn(element, "getBoundingClientRect")
    elementSpy.mockReturnValue(bounds as DOMRect)
    return element
}

describe("Given `getElementOffset`", () => {
    beforeEach(() => {
        mockGetDocumentScrollTop(500)
        mockGetDocumentScrollLeft(200)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return the position of the element within the window, offsetted from the top left", () => {
        const element = createElementWithBoundingRect({top: 150, left: 140})
        expect(getElementOffset(element)).toEqual({top: 650, left: 340})
    })
})
