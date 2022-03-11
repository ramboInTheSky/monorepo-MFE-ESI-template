import SetCacheTagsResponseHeader from "."
import {CACHE_HEADER_CACHE_TAGS} from "../../config/constants"

describe("Given SetCacheTagsResponseHeader", () => {
    it("should set the response headers when present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = {
            [CACHE_HEADER_CACHE_TAGS]: "test-headers",
        }
        SetCacheTagsResponseHeader(mockRes, mockHeaders)
        expect(set).toBeCalledWith(CACHE_HEADER_CACHE_TAGS, "test-headers")
    })

    it("should not set the response headers when not present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = null
        SetCacheTagsResponseHeader(mockRes, mockHeaders)
        expect(set).not.toBeCalled()
    })
})
