import {isIE} from "."

function mockDocumentMode(value: any) {
    const originalDocument = {...document}
    const spy = jest.spyOn(global, "document" as any, "get")
    spy.mockImplementation(() => ({
        ...originalDocument,
        documentMode: value,
    }))
    return () => spy.mockRestore()
}

describe("Given a util isIE()", () => {
    it("should be a function", () => {
        expect(isIE).toBeInstanceOf(Function)
    })

    it("should return false when is not IE browser", () => {
        const mockRestore = mockDocumentMode(null)
        expect(isIE()).toBe(false)
        mockRestore()
    })

    it("should return true when is IE browser", () => {
        const mockRestore = mockDocumentMode({})
        expect(isIE()).toBe(true)
        mockRestore()
    })
})
