/* eslint-disable class-methods-use-this */
import fs from "fs"
import {ISettingsSource} from "./ISettingsSource"
import {RequestHeaders} from "../Models/RequestHeaders"
import {Dictionary} from "../Dictionary"
import {Setting} from "../Models/Setting"
import {Container} from "../Models/Container"
import {SettingsProcessor} from "../SettingsProcessor"
import {CustomError} from "../Models/CustomError"

export class FileSettingsSource implements ISettingsSource {
    async ReadAsync(
        headers: RequestHeaders,
        path: string,
    ): Promise<Dictionary<Setting>> {
        // read file, call method in SettingsProcessor to do calculations and and return dictionary
        const result = await this.ReadSettings(path)
        const settings = new SettingsProcessor().BuildScopedSettings(
            headers,
            result,
        )

        return settings
    }

    async ReadSettings(path: string): Promise<Container> {
        try {
            return JSON.parse((await this.ReadFile(path)).trim())
        } catch (error) {
            throw new CustomError("404", "file not read")
        }
    }

    async ReadFile(path): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}
