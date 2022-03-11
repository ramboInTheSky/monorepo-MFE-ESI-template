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
import {mock, when, instance, verify, reset} from "ts-mockito"
import {RequestHeaders} from "../src/Models/RequestHeaders"
import {Dictionary} from "../src/Dictionary"
import {Setting} from "../src/Models/Setting"
import {SettingsCache} from "../src/SettingsCache"
import {FileSettingsSource} from "../src/Sources/FileSettingsSource"
import {ISettingsSource} from "../src/Sources/ISettingsSource"

describe("SettingsCache", () => {
    describe("GetAsync", () => {
        it("Should return settings when cache is empty", async () => {
            const settings = new Dictionary<Setting>()
            const setting = new Setting()
            setting.Value = "value"
            settings.AddOrUpdate("key", setting)

            const mockedHeaders: RequestHeaders = mock(RequestHeaders)
            const mockedHeadersInstance: RequestHeaders = instance(mockedHeaders)
            when(mockedHeaders.GetHash()).thenReturn(
                "5f64c94ebd7f487faed83141c6058769",
            )

            const mockedSettingSource: FileSettingsSource = mock(
                FileSettingsSource,
            )
            const mockedSettingSourceInstance: FileSettingsSource = instance(
                mockedSettingSource,
            )
            when(
                await mockedSettingSource.ReadAsync(
                    mockedHeadersInstance,
                    "tests/settings.json",
                ),
            ).thenReturn(settings)

            const settingsCache: SettingsCache = new SettingsCacheTest(
                mockedSettingSourceInstance,
            )
            const result = await settingsCache.GetAsync(
                mockedHeadersInstance,
                "tests/settings.json",
            )

            expect(result.Count()).to.equal(settings.Count())
            expect(result.Keys).to.equal(settings.Keys)
            expect(result.Values).to.equal(settings.Values)

            reset(mockedSettingSource)
            reset(mockedHeaders)
        })

        it("Should return settings when cache is not empty", async () => {
            const settings = new Dictionary<Setting>()
            const setting = new Setting()
            setting.Value = "value"
            settings.AddOrUpdate("key", setting)

            const mockedHeaders: RequestHeaders = mock(RequestHeaders)
            const mockedHeadersInstance: RequestHeaders = instance(mockedHeaders)
            when(mockedHeaders.GetHash()).thenReturn(
                "5f64c94ebd7f487faed83141c6058769",
            )

            const mockedSettingSource: FileSettingsSource = mock(
                FileSettingsSource,
            )
            const mockedSettingSourceInstance: FileSettingsSource = instance(
                mockedSettingSource,
            )
            when(
                await mockedSettingSource.ReadAsync(
                    mockedHeadersInstance,
                    "tests/settings.json",
                ),
            ).thenReturn(settings)

            const settingsCache: SettingsCache = new SettingsCacheTest(
                mockedSettingSourceInstance,
            )
            const result = await settingsCache.GetAsync(
                mockedHeadersInstance,
                "tests/settings.json",
            )

            expect(result.Count()).to.equal(settings.Count())
            expect(result.Keys).to.equal(settings.Keys)
            expect(result.Values).to.equal(settings.Values)
            verify(
                mockedSettingSource.ReadAsync(
                    mockedHeadersInstance,
                    "tests/settings.json",
                ),
            ).times(1)

            reset(mockedSettingSource)
            reset(mockedHeaders)
        })
    })
})

class SettingsCacheTest extends SettingsCache {
    constructor(settingsSource: ISettingsSource) {
        super(settingsSource)
    }
}
