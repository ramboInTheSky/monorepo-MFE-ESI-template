import {RequestHeaders} from "./Models/RequestHeaders"
import {Setting} from "./Models/Setting"
import {Dictionary} from "./Dictionary"
import {ISettingsSource} from "./Sources/ISettingsSource"
import {Cache} from "./Cache/Cache"

interface ISettingsCache {
    GetAsync(
        headers: RequestHeaders,
        path: string,
    ): Promise<Dictionary<Setting>>
}

export class SettingsCache implements ISettingsCache {
    private static instance: SettingsCache
    private settingsSource: ISettingsSource
    private cache: Cache

    protected constructor(settingsSource: ISettingsSource) {
        this.settingsSource = settingsSource
        this.cache = new Cache()
    }

    public static GetInstance(settingsSource: ISettingsSource): SettingsCache {
        if (!SettingsCache.instance) {
            SettingsCache.instance = new SettingsCache(settingsSource)
        }
        return SettingsCache.instance
    }

    async GetAsync(
        headers: RequestHeaders,
        path: string,
    ): Promise<Dictionary<Setting>> {
        const key = headers.GetHash()
        let result = this.cache.Get(key) as Dictionary<Setting>

        if (!result) {
            const settings = await this.settingsSource.ReadAsync(headers, path)
            result = this.cache.Set(key, settings) as Dictionary<Setting>
        }
        return result
    }
}
