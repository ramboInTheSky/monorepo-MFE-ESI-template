import {RequestHeaders} from "../Models/RequestHeaders"
import {Dictionary} from "../Dictionary"
import {Setting} from "../Models/Setting"

export interface ISettingsSource {
    ReadAsync(
        headers: RequestHeaders,
        path: string,
    ): Promise<Dictionary<Setting>>
}
