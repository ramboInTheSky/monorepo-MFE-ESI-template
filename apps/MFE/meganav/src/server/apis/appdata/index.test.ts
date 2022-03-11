import express, {Express} from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest"
import axios from "../../core/xhr"
import {getPrimaryNavDataHandler} from "."

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
    it("should get data for MegaNav", async () => {
        app.get("/test", getPrimaryNavDataHandler)
        await request(app).get("/test").expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })
})
