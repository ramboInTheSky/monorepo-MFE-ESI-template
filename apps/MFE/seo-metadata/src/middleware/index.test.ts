import express from "express"
import withHeaderRouter from "./apis/heading"
import withMetadataRouter from "./apis/metadata"
import "./index"

const mockExpressRouter = {
    expressRouter: "Test",
}
jest.mock("express", () => ({
    Router: jest.fn(() => ({
        expressRouter: "Test",
    })),
}))
jest.mock("./apis/heading", () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock("./apis/metadata", () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe("Given a api router", () => {
    describe("When creating a router", () => {
        it("should call express.Router", () => {
            expect(express.Router).toHaveBeenCalled()
        })

        it("should call withHeaderRouter", () => {
            expect(withHeaderRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
        it("should call withMetadataRouter", () => {
            expect(withMetadataRouter).toHaveBeenCalledWith(mockExpressRouter)
        })
    })
})
