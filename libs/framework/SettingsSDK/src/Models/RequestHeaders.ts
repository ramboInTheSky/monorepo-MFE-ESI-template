import hash from "object-hash"

export class RequestHeaders {
    Empire: string
    Realm: string
    Territory: string
    Language: string
    Persona: string

    constructor(empire, realm, territory, language, persona) {
        this.Empire = empire
        this.Realm = realm
        this.Territory = territory
        this.Language = language
        this.Persona = persona
    }

    GetHash(): string {
        return hash(this)
    }
}
