/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-try-expect */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-describe */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-extraneous-dependencies */
import chai from "chai"
import "mocha"
import {mockReq} from "sinon-express-mock"
import {GetAppSettings} from "../src/index"
import {Dictionary} from "../src/Dictionary"
import {CustomError} from "../src/Models/CustomError"

const {expect} = chai

describe("SettingsSDK Middleware", () => {
    it("Should read settings from file and return a populated Dictionary", async () => {
        const realm = "Desktop"
        const territory = "GB"
        const language = "en"
        const persona = "TestPersona"

        const request = {
            headers: {
                "x-monorepo-realm": realm,
                "x-monorepo-territory": territory,
                "x-monorepo-language": language,
                "x-monorepo-persona": persona,
            },
        }
        const req = mockReq(request)
        const result = await GetAppSettings("Test", "tests/settings.json", req.headers)
        expect(result).to.not.be.null
        expect(result).to.be.instanceOf(Dictionary)
    })

    it("Should pass incorrect headers and return an error", async () => {
        const realm = "Test"
        const territory = "GB"
        const language = "en"
        const persona = "TestPersona"

        const request = {
            headers: {
                "x-monorepo-realm": realm,
                "x-monorepo-territory": territory,
                "x-monorepo-language": language,
                "x-monorepo-persona": persona,
            },
        }
        const req = mockReq(request)

        try {
            await GetAppSettings("Test", "tests/settings.json", req.headers)
            expect.fail()
        } catch (error) {
            expect(error).to.be.instanceOf(CustomError)
            expect(error.code).to.be.equal("400")
        }
    })

    it("Should pass incorrect file path and return an error", async () => {
        const realm = "Amido"
        const territory = "GB"
        const language = "en"
        const persona = "TestPersona"

        const request = {
            headers: {
                "x-monorepo-realm": realm,
                "x-monorepo-territory": territory,
                "x-monorepo-language": language,
                "x-monorepo-persona": persona,
            },
        }
        const req = mockReq(request)

        try {
            await GetAppSettings("Test", "", req.headers)
            expect.fail()
        } catch (error) {
            expect(error).to.be.instanceOf(CustomError)
            expect(error.code).to.be.equal("404")
        }
    })
})
