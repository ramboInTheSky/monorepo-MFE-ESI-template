import {ISettingsSource} from "../Sources/ISettingsSource"
import {FileSettingsSource} from "../Sources/FileSettingsSource"

export class SettingsSourceFactory {
    // eslint-disable-next-line class-methods-use-this
    public GetSettingsSource(): ISettingsSource {
        return new FileSettingsSource()
    }
}
