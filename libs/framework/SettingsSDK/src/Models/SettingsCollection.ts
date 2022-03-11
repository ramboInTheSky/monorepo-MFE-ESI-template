import {IDictionary} from "../Dictionary"
import {Setting} from "./Setting"

export abstract class SettingsCollection {
    Settings: IDictionary<Setting>
}
