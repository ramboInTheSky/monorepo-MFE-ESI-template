/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-try-expect */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-describe */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-extraneous-dependencies */
import {expect} from "chai"
import "mocha"
import {mock, reset, instance, when} from "ts-mockito"
import {SettingsProcessor} from "../src/SettingsProcessor"
import {RequestHeaders} from "../src/Models/RequestHeaders"
import {FileSettingsSource} from "../src/Sources/FileSettingsSource"
// import {Dictionary} from "../src/Dictionary"
// import {Setting} from "../src/Models/Setting"
import {Empire} from "../src/Models/Empire"
import {Realm} from "../src/Models/Realm"
import {Territory} from "../src/Models/Territory"
import {CustomError} from "../src/Models/CustomError"
import {Language} from "../src/Models/Language"

describe("SettingsProcessor", () => {
    const processor = new SettingsProcessor()
    describe("BuildScopedSettings", () => {
        const mockedHeaders: RequestHeaders = mock(RequestHeaders)

        it("Should return currency code GBP by passing correct UK headers.", async () => {
            const container = await new FileSettingsSource().ReadSettings("tests/settings.json")

            const currencyCodeKey = "amido.browseandshop.currencycode"
            when(mockedHeaders.Empire).thenReturn("nonce")
            when(mockedHeaders.Realm).thenReturn("Desktop")
            when(mockedHeaders.Territory).thenReturn("GB")
            when(mockedHeaders.Language).thenReturn("en")
            const headers: RequestHeaders = instance(mockedHeaders)

            const settingsDictionary = processor.BuildScopedSettings(headers, container)
            expect(settingsDictionary.ContainsKey(currencyCodeKey)).be.equal(true)
            expect(settingsDictionary.Item(currencyCodeKey).Value).be.equal("GBP")
        })

        it("Should return error by calling with incorrect territory header values s", async () => {
            const container = await new FileSettingsSource().ReadSettings("tests/settings.json")

            when(mockedHeaders.Empire).thenReturn("nonce")
            when(mockedHeaders.Realm).thenReturn("Desktop")
            when(mockedHeaders.Territory).thenReturn("territory")
            when(mockedHeaders.Language).thenReturn("en")
            const headers: RequestHeaders = instance(mockedHeaders)

            try {
                processor.BuildScopedSettings(headers, container)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })

        it("Should return error by calling with incorrect header realm value ", async () => {
            const container = await new FileSettingsSource().ReadSettings("tests/settings.json")

            when(mockedHeaders.Empire).thenReturn("nonce")
            when(mockedHeaders.Realm).thenReturn("realm")
            when(mockedHeaders.Territory).thenReturn("GB")
            when(mockedHeaders.Language).thenReturn("en")

            const headers: RequestHeaders = instance(mockedHeaders)

            try {
                processor.BuildScopedSettings(headers, container)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })

        it("Should return error by calling with incorrect header language value ", async () => {
            const container = await new FileSettingsSource().ReadSettings("tests/settings.json")

            when(mockedHeaders.Empire).thenReturn("nonce")
            when(mockedHeaders.Realm).thenReturn("Desktop")
            when(mockedHeaders.Territory).thenReturn("GB")
            when(mockedHeaders.Language).thenReturn("language")

            const headers: RequestHeaders = instance(mockedHeaders)

            try {
                processor.BuildScopedSettings(headers, container)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })

        it("Should return empty settings by calling with incorrect header empire value.", async () => {
            const container = await new FileSettingsSource().ReadSettings("tests/settings.json")

            when(mockedHeaders.Empire).thenReturn(null)
            when(mockedHeaders.Realm).thenReturn("Desktop")
            when(mockedHeaders.Territory).thenReturn("territory")
            when(mockedHeaders.Language).thenReturn("en")

            const headers: RequestHeaders = instance(mockedHeaders)

            try {
                processor.BuildScopedSettings(headers, container)
                expect.fail()
            } catch (error) {
                expect(error).to.be.an.instanceOf(CustomError)
                expect(error.code).to.eq("400")
            }
        })

        describe("Persona Settings", async () => {
            const header: RequestHeaders = new RequestHeaders("nonce", "Desktop", "GB", "en", "Santa")
            const container = await new FileSettingsSource().ReadSettings("tests/settings.json")

            it("Should return persona configuration if x-monorepo-persona header is found", () => {
                const xmasSalesKey = "amido.sales.xmas.gb"
                const settingsDictionary = processor.BuildScopedSettings(header, container)
                expect(settingsDictionary[xmasSalesKey].Value).be.true
            })

            it("Should override territory configuration with persona configuration if x-monorepo-persona header is found", () => {
                const textDirectionKey = "amido.browsing.textdirection"
                const settingsDictionary = processor.BuildScopedSettings(header, container)
                expect(settingsDictionary[textDirectionKey].Value).be.equal("rtl")
            })
        })

        after(() => {
            reset(mockedHeaders)
        })
    })

    describe("Build", () => {
        it("Should have new empire and realm settings in the scoped settings object.", () => {
            // const scopedSettings = new Dictionary<Setting>()
            const empire = mock(Empire)
            const realm = mock(Realm)
            const key = "amido.browseandshop.currencycode"

            const empireCurrencyValue = "USD"
            empire.Settings = JSON.parse(`{"${key}": {"Value": "${empireCurrencyValue}"}}`)

            const realmCurrencyValue = "GBP"
            realm.Settings = JSON.parse(`{"${key}": {"Value": "${realmCurrencyValue}"}}`)

            processor.Build(empire)
            processor.Build(realm)

            expect(processor.scopedSettings).not.be.undefined
            expect(processor.scopedSettings.Item(key).Value).to.not.be.equal(empireCurrencyValue)
            expect(processor.scopedSettings.Item(key).Value).to.be.equal(realmCurrencyValue)
            reset(empire)
            reset(realm)
        })

        it("Should have new territory settings in the scoped settings object.", () => {
            // const scopedSettings = new Dictionary<Setting>()
            const key = "amido.browsing.textdirection"
            const territorySettingValue = "ltr"

            const territory = mock(Territory)
            territory.Settings = JSON.parse(`{"${key}": {"Value": "${territorySettingValue}"}}`)

            processor.Build(territory)

            expect(processor.scopedSettings).not.be.undefined
            expect(processor.scopedSettings.ContainsKey(key)).to.be.true
            expect(processor.scopedSettings.Item(key).Value).to.be.equal(territorySettingValue)
            reset(territory)
        })

        it("Should have new language settings in the scoped settings object.", () => {
            // const scopedSettings = new Dictionary<Setting>()
            const key = "amido.browsing.currencysymbol"
            const languageSettingValue = "£"

            const language = mock(Language)
            language.Settings = JSON.parse(`{"${key}": {"Value": "${languageSettingValue}"}}`)

            processor.Build(language)

            expect(processor.scopedSettings).not.be.undefined
            expect(processor.scopedSettings.ContainsKey(key)).to.be.true
            expect(processor.scopedSettings.Item(key).Value).to.be.equal(languageSettingValue)
            reset(language)
        })
    })
})
