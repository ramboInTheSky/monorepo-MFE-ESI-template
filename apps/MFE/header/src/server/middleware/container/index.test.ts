import fs from "fs"
import path from "path"
import containerMiddleware from "."

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

const mockSend = jest.fn()

const mockRequest = {html: null, headers: {"x-monorepo-siteurl": "domain", "x-monorepo-realm": "amido"}, query: {}}
const mockResponse = {
    status: jest.fn(() => ({send: mockSend})),
    locals: {configuration: {"header.frontend.bookMarkTitle": "Reiss"}},
}
const expectedHtml = "test html "
const mockHtml = "test html __QUERY__"
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
                actualCallback(null, mockHtml)
            })
            it("should set the html on the request", () => {
                expect(mockRequest.html).toEqual(expectedHtml)
            })
        })

        describe("When the passed callback runs with an error", () => {
            beforeAll(() => {
                actualCallback("ERROR", mockHtml)
            })
            it("should call status with 500", () => {
                expect(mockResponse.status).toHaveBeenCalledWith(500)
            })
        })
    })

    describe("When running with a show date", () => {
        const mockRequesttimeMachineDate = {
            html: null,
            headers: {"x-monorepo-siteurl": "domain"},
            query: {"time-machine-date": "20200102"},
        }
        const mockHtmltimeMachineDate = "test html ?time-machine-date=20200102"

        beforeAll(() => {
            containerMiddleware(mockRequesttimeMachineDate as any, mockResponse as any)
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
                actualCallback(null, mockHtml)
            })
            it("should set the html on the request", () => {
                expect(mockRequesttimeMachineDate.html).toEqual(mockHtmltimeMachineDate)
            })

            it("should call response send with expected html", () => {
                expect(mockSend).toHaveBeenCalledWith(mockHtmltimeMachineDate)
            })
        })
    })
})
