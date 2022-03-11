import isSiteUrlValid from "./validateSiteUrl"
import validateSettings from "./validateSettings"
import isRequestValid from "./index"

jest.mock("./validateSiteUrl", () => ({
    __esModule: true,
    default: jest.fn(siteUrl => {
        return !siteUrl.isError
    }),
}))

jest.mock("./validateSettings", () => ({
    __esModule: true,
    default: jest.fn(configuration => {
        return !configuration.isError
    }),
}))

const mockRequest = {siteUrl: {isError: false}}
const mockResponse = {
    locals: {
        configuration: {
            isError: false,
        },
    },
}
describe("Given a validateRequest", () => {
    describe("When validating", () => {
        let response
        beforeAll(() => {
            response = isRequestValid(mockRequest, mockResponse)
        })
        it("should call validateSiteUrl", () => {
            expect(isSiteUrlValid).toBeCalledWith(mockRequest.siteUrl)
        })
        it("should call validateSettings", () => {
            expect(validateSettings).toBeCalledWith(mockResponse.locals.configuration)
        })
        it("should return true", () => {
            expect(response).toEqual(true)
        })
    })

    describe("When siteUrl is not valid", () => {
        const mockRequestError = {siteUrl: {isError: true}}
        let response
        beforeAll(() => {
            response = isRequestValid(mockRequestError, mockResponse)
        })
        it("should return false", () => {
            expect(response).toEqual(false)
        })
    })

    describe("When configuration is not valid", () => {
        const mockResponseError = {
            locals: {
                configuration: {
                    isError: true,
                },
            },
        }
        let response
        beforeAll(() => {
            response = isRequestValid(mockRequest, mockResponseError)
        })
        it("should return false", () => {
            expect(response).toEqual(false)
        })
    })
})
