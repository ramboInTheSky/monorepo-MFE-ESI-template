import {CORSMiddleware} from "./cors"

const expectedHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers":
        "accept, x-monorepo-territory, x-monorepo-realm, x-monorepo-language, x-monorepo-correlation-id, x-monorepo-session-id, x-monorepo-time-machine-date, x-monorepo-viewport-size, x-monorepo-persona",
}

const mockHeader = jest.fn()

describe("CORSMiddleware", () => {
    it("Should return a function", () => {
        expect(CORSMiddleware).toBeInstanceOf(Function)
    })

    it("Should add cors headers to the response", () => {
        const res = {
            header: mockHeader,
        }
        const req = {}
        const next = jest.fn()
        CORSMiddleware(req, res, next)
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toBeCalledWith()
        expect(mockHeader).toHaveBeenCalledWith(expectedHeaders)
    })
})
