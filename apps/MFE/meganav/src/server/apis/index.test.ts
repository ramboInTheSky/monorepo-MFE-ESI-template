import express from "express"
import withPrimaryNavRouter from "./appdata"
import withSecondaryNavRouter from "./secondary-meganav"
import withSeoDataRouter from "./seo"
import router from "./index"

const mockExpressRouter = {
    expressRouter: "Test",
}
jest.mock("express", () => ({
    Router: jest.fn(() => ({
        expressRouter: "Test",
    })),
}))
jest.mock("./appdata", () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock("./secondary-meganav", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("./seo", () => ({
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

        it("should call withPrimaryNavRouter", () => {
            expect(withPrimaryNavRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
        it("should call withSecondaryNavRouter", () => {
            expect(withSecondaryNavRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
        it("should call withSeoDataRouter", () => {
            expect(withSeoDataRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
    })
})
