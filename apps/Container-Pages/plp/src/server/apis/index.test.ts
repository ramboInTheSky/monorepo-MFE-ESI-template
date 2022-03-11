import express from "express"
import withSearchRouter from "./search"
import withProductsFragmentRouter from "./productsFragment"
import router from "./index"

const mockExpressRouter = {
    expressRouter: "Test",
}
jest.mock("express", () => ({
    Router: jest.fn(() => ({
        expressRouter: "Test",
    })),
}))
jest.mock("./search", () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock("./productsFragment", () => ({
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

        it("should call withSearchRouter", () => {
            expect(withSearchRouter).toHaveBeenCalledWith(mockExpressRouter)
        })

        it("should call withProductsFragmentRouter", () => {
            expect(withProductsFragmentRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
    })
})
