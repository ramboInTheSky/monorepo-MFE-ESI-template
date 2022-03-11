import express, {Express} from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest"
import axios from "../../core/xhr"
import BFFLogger from "../../core/BFFLogger"
import {getFooterDataHandler} from "."

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
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
    it("should get data for Footer", async () => {
        app.get("/test", getFooterDataHandler)
        await request(app).get("/test").expect(200)
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
        app.get("/test", getFooterDataHandler)
        await request(app).get("/test").expect(500)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(BFFLogger.error).toHaveBeenCalledWith(errorResponse)
    })
})
