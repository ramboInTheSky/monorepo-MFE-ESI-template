import {RequestHeaders} from "./Models/RequestHeaders"
import {SettingServiceOptions} from "./Models/SettingServiceOptions"
import {SettingsSourceFactory} from "./Factories/SettingsSourceFactory"
import {SettingsCache} from "./SettingsCache"
import {Dictionary} from "./Dictionary"
import {Setting} from "./Models/Setting"
import {CustomError} from "./Models/CustomError"

export function GetHeaders(appId: string, reqHeaders): RequestHeaders {
    const options = new SettingServiceOptions()
    const headers = new RequestHeaders(
        appId,
        ValidateMissingHeader(reqHeaders[options.RealmHeader]),
        ValidateMissingHeader(reqHeaders[options.TerritoryHeader]),
        ValidateMissingHeader(reqHeaders[options.LanguageHeader]),
        reqHeaders[options.PersonaHeader],
    )
    return headers
}

function ValidateMissingHeader(header: string) {
    if (!header) {
        throw new CustomError("400", "missing header")
    }
    return header
}

export async function GetSettings(
    headers: RequestHeaders,
    path: string,
): Promise<Dictionary<Setting>> {
    const settingsSource = new SettingsSourceFactory().GetSettingsSource()
    return SettingsCache.GetInstance(settingsSource).GetAsync(headers, path)
}
