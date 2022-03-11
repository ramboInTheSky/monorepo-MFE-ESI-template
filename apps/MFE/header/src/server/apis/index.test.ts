import express from "express"
import withHeaderRouter from "./header"
import router from "./index"

const mockExpressRouter = {
    expressRouter: "Test",
}
jest.mock("express", () => ({
    Router: jest.fn(() => ({
        expressRouter: "Test",
    })),
}))
jest.mock("./header", () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe("Given a api router", () => {
    describe("When creating a router", () => {
        beforeAll(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
            const testRouter = router
        })

        it("should call express.Router", () => {
            expect(express.Router).toHaveBeenCalled()
        })

        it("should call withHeaderRouter", () => {
            expect(withHeaderRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
    })
})
