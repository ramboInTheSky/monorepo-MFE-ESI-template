import express, {Express} from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest"
import {CORSMiddleware} from "@monorepo/middlewares"
import apiSEOData from "../../../../__mocks__/apiSEOData.json"
import axios from "../../core/xhr"
import routing, {getSEOContentHandler, getSquarePixelHTML, getSecondaryNavData} from "."
import env from "../../../config/env"

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
        app.get("/test", getSEOContentHandler)
        await request(app).get("/test").expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })

    it("should get data for Home", async () => {
        app.get(getSecondaryNavData.routeDefinition, getSEOContentHandler)
        await request(app).get(`${env.ASSETS_PATH}/seo-content/home`).expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })
    it("should get data for Home/women", async () => {
        app.get(getSecondaryNavData.routeDefinition, getSEOContentHandler)
        await request(app).get(`${env.ASSETS_PATH}/seo-content/home/women`).expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })
    it("should get data for Home/anything", async () => {
        app.get(getSecondaryNavData.routeDefinition, getSEOContentHandler)
        await request(app).get(`${env.ASSETS_PATH}/seo-content/home/unknown/moreunknown/aaarrrrghhh`).expect(200)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(axios.get).toHaveBeenCalled()
    })
})

describe("GetSquarePixelHTML", () => {
    it("should get 1 pixel square HTML for SEO MegaNav", () => {
        expect(getSquarePixelHTML(apiSEOData as any, "https://amido.com")).toMatchSnapshot()
    })
    it("should get 1 pixel square HTML for SEO MegaNav with language and territory in the siteUrl", () => {
        expect(getSquarePixelHTML(apiSEOData as any, "https://amido.com/ru/en")).toMatchSnapshot()
    })

    it("should be the relative url", () => {
        const data = apiSEOData as any
        data.territory = "RU"

        const response = getSquarePixelHTML(data, "https://amido.com/ru/en")
        const firstHref = /href="(.*?)"/g.exec(response) as string[]

        expect(firstHref[1]).toContain("/ru/en/valid-link")
    })

    it("should not include both territory and language in GB territory", () => {
        const data = apiSEOData as any
        data.territory = "GB"
        const expectedterritoryAndLanguagePattern = `${data.territory?.toLowerCase()}/${data.language}`
        const expectedLanguagePattern = `/${data.language}`

        const response = getSquarePixelHTML(data, "https://amido.com")
        const firstHref = /href="(.*?)"/g.exec(response) as string[]

        expect(firstHref?.[1]).not.toContain(expectedLanguagePattern)
        expect(firstHref?.[1]).not.toContain(expectedterritoryAndLanguagePattern)
    })

    it("should include the path url without territory ", () => {
        const data = apiSEOData as any

        const expectedPattern = `${data.territory?.toLowerCase()}/${data.language}`

        const response = getSquarePixelHTML(data, "https://amido.com")
        const firstHref = /href="(.*?)"/g.exec(response) as string[]

        expect(firstHref?.[1]).not.toContain(expectedPattern)
    })

    it("should return empty string for 0 items ", () => {
        const data = apiSEOData as any
        data.items = []

        const response = getSquarePixelHTML(data, "https://amido.com")

        expect(response).toBeFalsy()
    })
})

const mockRouter = {options: jest.fn(), get: jest.fn()}

describe("Given a Secondary Nav Routing setup", () => {
    beforeAll(() => {
        routing(mockRouter as any)
    })
    it("should register options call route", () => {
        expect(mockRouter.options).toHaveBeenCalledWith(
            "/meganavstatic/seo-content/:page/:department*?",
            CORSMiddleware,
        )
    })

    it("should register GET call route", () => {
        expect(mockRouter.get).toHaveBeenCalledWith(
            "/meganavstatic/seo-content/:page/:department*?",
            CORSMiddleware,
            getSEOContentHandler,
        )
    })
})
