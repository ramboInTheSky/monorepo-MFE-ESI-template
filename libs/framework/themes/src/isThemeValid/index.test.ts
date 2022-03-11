/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import {isThemeValid} from "."
import {mockColors} from "../../__mocks__/mockTheme"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("Given a theme validator", () => {
    describe("When the theme being validated has all the expected properties", () => {
        let response
        beforeAll(() => {
            response = isThemeValid(mockColors)
        })

        it("should return true", () => {
            expect(response).toBe(true)
        })

        it("should not call the error logger", () => {
            expect(logger.error).not.toHaveBeenCalled()
        })
    })

    describe("When the theme being validated does not exist", () => {
        let response
        beforeAll(() => {
            response = isThemeValid(null)
        })

        it("should return false", () => {
            expect(response).toBe(false)
        })

        it("should call the error logger", () => {
            expect(logger.error).toHaveBeenCalledWith("Feature Settings - Theme is not provided")
        })
    })

    describe("When the theme being validated missing a sub property", () => {
        let response
        beforeAll(() => {
            const errorTheme = {...mockColors}
            delete errorTheme.footer.socialMedia.background
            response = isThemeValid(errorTheme)
        })

        it("should return false", () => {
            expect(response).toBe(false)
        })

        it("should call the error logger", () => {
            expect(logger.error).toHaveBeenCalledWith(
                "Feature Setting - Theme: footer - socialMedia - background is not provided",
            )
        })
    })

    describe("When the theme being validated missing a sub property value", () => {
        let response
        beforeAll(() => {
            jest.resetAllMocks()
            const errorTheme = {...mockColors}
            errorTheme.footer.socialMedia.background = ""
            response = isThemeValid(errorTheme)
        })

        it("should return false", () => {
            expect(response).toBe(false)
        })

        it("should call the error logger", () => {
            expect(logger.error).toHaveBeenCalledWith(
                "Feature Setting - Theme: footer - socialMedia - background is not provided",
            )
        })
    })

    describe("When the theme being validated missing a root property", () => {
        let response
        beforeAll(() => {
            jest.resetAllMocks()
            const errorTheme = {...mockColors}
            delete errorTheme.footer
            response = isThemeValid(errorTheme)
        })

        it("should return false", () => {
            expect(response).toBe(false)
        })

        it("should call the error logger", () => {
            expect(logger.error).toHaveBeenCalledWith("Feature Setting - Theme: footer is not provided")
        })
    })
})
