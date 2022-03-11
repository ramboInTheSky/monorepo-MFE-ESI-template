import {CACHE_HEADER_LAST_MODIFIED, CACHE_HEADER_CACHE_TAGS} from "."

describe("Given Constants", () => {
    it("should match expected CACHE_HEADER_LAST_MODIFIED", () => {
        expect(CACHE_HEADER_LAST_MODIFIED).toMatchSnapshot()
    })
    it("should match expected CACHE_HEADER_CACHE_TAGS", () => {
        expect(CACHE_HEADER_CACHE_TAGS).toMatchSnapshot()
    })
})
