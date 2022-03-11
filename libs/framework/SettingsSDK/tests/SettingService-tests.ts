/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-try-expect */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-describe */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-extraneous-dependencies */
import "mocha"
import {expect} from "chai"
import {mockReq} from "sinon-express-mock"
import {GetHeaders, GetSettings} from "../src/SettingsService"
import {RequestHeaders} from "../src/Models/RequestHeaders"
import {CustomError} from "../src/Models/CustomError"

describe("SettingsService", () => {
    describe("GetHeaders", () => {
        it("Should return header object when all mandatory headers exist.", () => {
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

            const result = GetHeaders("App", req.headers)

            expect(result.Realm).to.equal(realm)
            expect(result.Territory).to.equal(territory)
            expect(result.Language).to.equal(language)
            expect(result.Persona).to.equal(persona)
        })
        it("Should throw error when one or more mandatory headers are missing(Missing Realm)", () => {
            const language = "en"
            const territory = "GB"
            const persona = "TestPersona"

            const request = {
                headers: {
                    "x-monorepo-language": language,
                    "x-monorepo-territory": territory,
                    "x-monorepo-persona": persona,
                },
            }
            const req = mockReq(request)

            try {
                GetHeaders("App", req.headers)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })
        it("Should throw error when one or more mandatory headers are missing(Missing Territory)", () => {
            const realm = "Amido"
            const language = "en"
            const persona = "TestPersona"

            const request = {
                headers: {
                    "x-monorepo-realm": realm,
                    "x-monorepo-language": language,
                    "x-monorepo-persona": persona,
                },
            }
            const req = mockReq(request)

            try {
                GetHeaders("App", req.headers)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })
        it("Should throw error when one or more mandatory headers are missing(Missing Language)", () => {
            const realm = "Amido"
            const territory = "GB"
            const persona = "TestPersona"

            const request = {
                headers: {
                    "x-monorepo-realm": realm,
                    "x-monorepo-territory": territory,
                    "x-monorepo-persona": persona,
                },
            }
            const req = mockReq(request)

            try {
                GetHeaders("App", req.headers)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })
    })

    describe("GetSettings", () => {
        it("Should return a dictionary object", async () => {
            const headers = new RequestHeaders("AppId", "Desktop", "GB", "en", "Persona")

            const result = await GetSettings(headers, "tests/settings.json")

            expect(result).to.be.not.undefined
            expect(result).to.be.not.null
        })
    })
})
