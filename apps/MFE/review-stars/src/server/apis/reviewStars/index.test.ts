import express, {Express, Router} from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest"
import axios from "../../core/xhr"
import BFFLogger from "../../core/BFFLogger"
import Api from "../../../config/api/reviewStarsApi"
import withProductRouter, {getReviewStarsHandler} from "."

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
}))

jest.mock("../../core/xhr", () => ({
    get: jest.fn(() => Promise.resolve({data: {items: []}})),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(() => ({
        "x-monorepo-language": "en",
        "x-monorepo-realm": "Amido",
        "x-monorepo-territory": "GB",
    })),
    getSettingsHeadersAsObject: jest.fn(() => ({
        language: "en",
        realm: "Amido",
        territory: "GB",
    })),
}))

let app: Express

describe("Get Endpoints", () => {
    beforeEach(() => {
        app = express()
    })
    it("should get data for review stars", async () => {
        app.get("/test/123", getReviewStarsHandler)
        await request(app).get("/test/123").expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })
    it("should throw a 500 error when axios get fails", async () => {
        const errorResponse = {
            status: 404,
        }
        jest.spyOn(axios, "get").mockImplementationOnce(async () => {
            return Promise.reject(errorResponse)
        })
        app.get("/test", getReviewStarsHandler)
        await request(app).get("/test").expect(500)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(BFFLogger.error).toHaveBeenCalledWith(errorResponse)
    })
})

describe("withProductRouter function", () => {
    it("calls router.get", () => {
        const getMock = jest.fn()
        const getReviewStars = Api("getReviewStars")

        const mockRouter = {
            get: getMock,
        } as unknown

        withProductRouter(mockRouter as Router)
        expect(getMock).toHaveBeenCalledWith(getReviewStars.routeDefinition, getReviewStarsHandler)
    })
})
