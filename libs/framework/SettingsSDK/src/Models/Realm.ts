import {SettingsCollection} from "./SettingsCollection"
import {Territory} from "./Territory"

export class Realm extends SettingsCollection {
    RealmName: string
    Territories: Territory[]
}
