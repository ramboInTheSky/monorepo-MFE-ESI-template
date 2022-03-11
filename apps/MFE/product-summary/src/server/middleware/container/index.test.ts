import fs from "fs"
import path from "path"
import containerMiddleware from "."
import BFFLogger from "../../core/BFFLogger"

// eslint-disable-next-line @typescript-eslint/no-empty-function
let actualCallback = (_err, _html) => {}

jest.mock("fs", () => ({
    readFile: jest.fn((_path, _utf, callBack) => {
        actualCallback = callBack
    }),
}))

jest.mock("path", () => ({
    join: jest.fn(() => "test/path"),
}))

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockRequest = {html: null, params: {itemNumber: "", type: "suit"}, headers: {"x-monorepo-siteurl": "domain"}}
const mockRequestNoParams = {html: null, headers: {"x-monorepo-siteurl": "domain"}}
const mockResponse = {status: jest.fn(() => ({send: jest.fn()}))}
const expectedHtml = "test html"
describe("Given a containerMiddleware", () => {
    describe("When running", () => {
        beforeAll(() => {
            containerMiddleware(mockRequest as any, mockResponse as any)
        })

        it("should call path.join", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(path.join).toBeCalledWith(__dirname, "/public")
        })

        it("should call fs.readFile", () => {
            expect(fs.readFile).toBeCalledWith(`test/path/container.html`, "utf8", expect.any(Function))
        })

        describe("When the passed callback runs with no error", () => {
            beforeAll(() => {
                actualCallback(null, expectedHtml)
            })
            it("should set the html on the request", () => {
                expect(mockRequest.html).toEqual(expectedHtml)
            })
        })

        describe("When the passed callback runs with an error", () => {
            beforeAll(() => {
                actualCallback("ERROR", expectedHtml)
            })
            it("should call status with 500", () => {
                expect(mockResponse.status).toHaveBeenCalledWith(500)
            })
        })
    })
    describe("When running without itemNumber", () => {
        beforeAll(() => {
            containerMiddleware(mockRequestNoParams as any, mockResponse as any)
        })

        it("should call BFFLogger.warn", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toBeCalledWith("no itemNumber provided")
        })
    })
})
