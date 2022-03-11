import {ExcludeFrom} from "../excludeFrom"

export class PrimaryNav {
    public id = ""
    public title = ""
    public target = ""
    public viewType = ""
    public items: PrimaryNavItem[] = []
}

export class PrimaryNavItem {
    public title = ""
    public target = ""
    public path = ""
    public linkColour?: string
    public fontWeight?: string
    public fontFamily?: string
    public excludeFrom?: ExcludeFrom
}

export class DefaultConfig {
    public version = ""
    public country = ""
}
