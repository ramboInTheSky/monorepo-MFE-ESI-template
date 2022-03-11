import logger from "@monorepo/core-logger"
import isSiteUrlValid from "./index"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockSiteUrl = {url: "test"}
describe("Given a validateSiteUrl", () => {
    describe("When validating a site url", () => {
        let response
        beforeAll(() => {
            response = isSiteUrlValid(mockSiteUrl)
        })

        it("should return true when url exists", () => {
            expect(response).toEqual(true)
        })
    })

    describe("When validating am invalid site url", () => {
        let response
        const mockInvalidSiteUrl = null
        beforeAll(() => {
            response = isSiteUrlValid(mockInvalidSiteUrl)
        })

        it("should return true when url exists", () => {
            expect(response).toEqual(false)
        })

        it("should call the logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith("Site Url not provided on request")
        })
    })
})
