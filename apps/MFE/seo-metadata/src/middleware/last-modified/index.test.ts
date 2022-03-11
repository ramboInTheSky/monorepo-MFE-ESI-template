import SetLastModifiedResponseHeader from "."
import {CACHE_HEADER_LAST_MODIFIED} from "../../config/constants"

describe("Given SetLastModifiedResponseHeader", () => {
    it("should set the response headers when present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = {
            [CACHE_HEADER_LAST_MODIFIED]: "test-headers",
        }
        SetLastModifiedResponseHeader(mockRes, mockHeaders)
        expect(set).toBeCalledWith(CACHE_HEADER_LAST_MODIFIED, "test-headers")
    })

    it("should not set the response headers when not present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = null
        SetLastModifiedResponseHeader(mockRes, mockHeaders)
        expect(set).not.toBeCalled()
    })
})
