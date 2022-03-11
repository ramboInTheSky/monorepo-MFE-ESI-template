/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/require-await */
import {ISettingsSource} from "./ISettingsSource"
import {RequestHeaders} from "../Models/RequestHeaders"
import {Dictionary} from "../Dictionary"
import {Setting} from "../Models/Setting"

export class HttpSettingsSource implements ISettingsSource {
    async ReadAsync(
        _headers: RequestHeaders,
        _path: string,
    ): Promise<Dictionary<Setting>> {
        // call external service to retrieve settings
        return undefined
    }
}
