/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-try-expect */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-describe */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-extraneous-dependencies */
import {expect} from "chai"
import {FileSettingsSource} from "../src/Sources/FileSettingsSource"
import {Container} from "../src/Models/Container"
import {RequestHeaders} from "../src/Models/RequestHeaders"
import {CustomError} from "../src/Models/CustomError"
import {Dictionary} from "../src/Dictionary"

describe("FileSettingsSource", () => {
    const fileSettingsSource = new FileSettingsSource()
    describe("ReadSettings", () => {
        it("Should return a populated object with the contents of the file", async () => {
            const data: Container = await fileSettingsSource.ReadSettings(
                "tests/settings.json",
            )
            expect(data).to.not.be.null
            expect(data).to.not.be.undefined
            expect(data).to.nested.include({
                "Empire.Realms[0].RealmName": "Desktop",
            })
        })

        it('Should return an exception while reading settings from "null" file', async () => {
            try {
                await fileSettingsSource.ReadSettings(null)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("404")
            }
        })
        it("Should return an exception while reading settings from incorrect file ", async () => {
            try {
                await fileSettingsSource.ReadSettings("incorrect.json")
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("404")
            }
        })
    })

    describe("ReadAsync", () => {
        it("Should read settings from file and return a populated Dictionary", async () => {
            const headers = new RequestHeaders("nonce", "Desktop", "GB", "en", "")

            const result = await fileSettingsSource.ReadAsync(
                headers,
                "tests/settings.json",
            )

            expect(result).to.not.be.null
            expect(result).to.not.be.undefined
            expect(result).to.be.instanceOf(Dictionary)
            expect(result.Count()).to.be.above(0)
        })
    })
})
