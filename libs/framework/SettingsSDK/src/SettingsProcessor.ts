import {Dictionary} from "./Dictionary"
import {Setting} from "./Models/Setting"
import {Container} from "./Models/Container"
import {SettingsCollection} from "./Models/SettingsCollection"
import {RequestHeaders} from "./Models/RequestHeaders"
import {CustomError} from "./Models/CustomError"

interface ISettingsProcessor {
    BuildScopedSettings(headers: RequestHeaders, settings: Container): Dictionary<Setting>
}

export class SettingsProcessor implements ISettingsProcessor {
    public scopedSettings
    
    constructor() {
        this.scopedSettings = new Dictionary<Setting>()
    }

    BuildScopedSettings(headers: RequestHeaders, settings: Container): Dictionary<Setting> {
        const empire = settings.Empire

        if (empire != null) {
            this.Build(empire)

            const realm = empire.Realms?.find(f => f.RealmName.toLowerCase() === headers.Realm?.toLowerCase())
            this.Build(realm)

            const territory = realm.Territories?.find(
                g => g.TerritoryName.toLowerCase() === headers.Territory?.toLowerCase(),
            )
            this.Build(territory)

            const language = territory.Languages?.find(
                h => h.LanguageName.toLowerCase() === headers.Language?.toLowerCase(),
            )
            this.Build(language)
        }

        const persona = settings.Personas?.find(h => h.PersonaName.toLowerCase() === headers.Persona?.toLowerCase())

        if (persona?.Settings != null) {
            Object.keys(persona.Settings).forEach(feature => {
                this.scopedSettings.AddOrUpdate(feature, persona.Settings[feature])
            })
        }

        return this.scopedSettings
    }

    Build(settingsAndFeature: SettingsCollection) {
        ValidateIncorrectHeader(settingsAndFeature)
        // settingsAndFeature here would either be the realm, territory or language
        if (settingsAndFeature.Settings) {
            // loop through the settings for the realm, territory or language
            // if the setting had already been set,
            // e.g. if settingsAndFeature is a territory and the setting had already been set for empire, the value will be replaced.
            // otherwise the new key/value will be added
            Object.keys(settingsAndFeature.Settings).forEach(setting => {
                this.scopedSettings.AddOrUpdate(setting, settingsAndFeature.Settings[setting])
            })
        }
    }
}

function ValidateIncorrectHeader(header: any) {
    if (!header) {
        throw new CustomError("400", "incorrect header")
    }
}
