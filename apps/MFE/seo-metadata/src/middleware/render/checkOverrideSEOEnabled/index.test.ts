import checkOverrideSEOEnabled from "."
import fallbackSeo from "../fallbackSEO"

import BFFLogger from "../../core/BFFLogger"

jest.mock("../fallbackSEO")

jest.mock("../../core/BFFLogger", () => ({
    warn: jest.fn(),
}))

describe("Given a checkOverrideSEOEnabled", () => {
    const mockResponse = {
        send: jest.fn(() => ({
            end: jest.fn(),
        })),
        status: jest.fn(),
        set: jest.fn(),
    }
    const mockNext = jest.fn()
    const mockRequest = {}

    it("should have called fallbackSeo when override SEO is disabled", () => {
        const newMockResponse = {
            ...mockResponse,
            locals: {
                configuration: {
                    "seometadata.ui.enabled": {
                        Value: false,
                    },
                },
            },
        }
        checkOverrideSEOEnabled(mockRequest as any, newMockResponse as any, mockNext)
        expect(fallbackSeo).toHaveBeenCalled()
    })
    it("should called the next function when SEO override is enabled", () => {
        const newMockResponse = {
            locals: {
                configuration: {
                    "seometadata.ui.enabled": {
                        Value: true,
                    },
                },
            },
        }
        checkOverrideSEOEnabled(mockRequest as any, newMockResponse as any, mockNext)

        expect(mockNext).toHaveBeenCalled()
    })
    it("should called the BFFlogger and called the fallbackSeo function", () => {
        const newMockResponse = {
            locals: null,
        }
        checkOverrideSEOEnabled(mockRequest as any, newMockResponse as any, mockNext)

        expect(fallbackSeo).toHaveBeenCalled()
        expect(BFFLogger.warn).toHaveBeenCalled()
        expect(BFFLogger.warn).toHaveBeenCalledWith(
            "SEO Metadata UI - defaulting seo metadata and seo heading to false as there is no config",
        )
    })
})
