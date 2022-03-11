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
import {SettingsSourceFactory} from "../src/Factories/SettingsSourceFactory"
import {FileSettingsSource} from "../src/Sources/FileSettingsSource"

describe("SettingsSourceFactory", () => {
    const settingsSourceFactory = new SettingsSourceFactory()
    describe("GetSettingsSource", () => {
        it("Should return an instance of FileSettingsSource", () => {
            const settingsSource = settingsSourceFactory.GetSettingsSource()

            expect(settingsSource).to.not.be.null
            expect(settingsSource).to.not.be.undefined
            expect(settingsSource).to.be.an.instanceOf(FileSettingsSource)
        })
    })
})
