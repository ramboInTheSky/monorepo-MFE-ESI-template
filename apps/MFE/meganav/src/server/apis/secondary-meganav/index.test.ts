import express, {Express} from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest"
import {CORSMiddleware} from "@monorepo/middlewares"
import axios from "../../core/xhr"
import routing, {getSecondaryNavDataHandler} from "."
import {SecondaryMeganavCacheControlMiddleware} from "../../middleware/cache-control"

jest.mock("@monorepo/middlewares", () => ({CORSMiddleware: jest.fn()}))

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
    it("should get data for secondary MegaNav", async () => {
        app.get("/test", getSecondaryNavDataHandler)
        await request(app).get("/test").expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })
})

const mockRouter = {options: jest.fn(), get: jest.fn()}

describe("Given a Secondary Nav Routing setup", () => {
    beforeAll(() => {
        routing(mockRouter as any)
    })
    it("should register options call route", () => {
        expect(mockRouter.options).toHaveBeenCalledWith("/secondary-items/:page/:department", CORSMiddleware)
    })
    it("should register GET call route", () => {
        expect(mockRouter.get).toHaveBeenCalledWith(
            "/secondary-items/:page/:department",
            CORSMiddleware,
            SecondaryMeganavCacheControlMiddleware,
            getSecondaryNavDataHandler,
        )
    })
})
