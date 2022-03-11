import {ExcludeFrom} from "../excludeFrom"

export class SecondaryNav {
    public id = ""
    public title = ""
    public target = ""
    public viewType = ""
    public realm = ""
    public territory = ""
    public language = ""
    public items: Tab[] = [new Tab()]
    public banner: Banner | null = new Banner()
}
export class Banner {
    imageUrl = ""
    target = ""
}
export class Tab {
    public title = ""
    public type = ""
    public items: Column[] = [new Column()]
    public missions: Mission | null = null
    public excludeFrom?: ExcludeFrom
}
export class Column {
    public title: string | null = ""
    public type: string | null = ""
    public items: Category[] = [new Category()]
    public excludeFrom?: ExcludeFrom
}
export class Category {
    public items: Link[] = [new Link()]
    public icon: Icon | null = null
    public title: string | null = ""
    public type = ""
    public linkColour = ""
    public fontWeight = ""
    public fontFamily: string | null = ""
    public excludeFrom?: ExcludeFrom
}
export class Link {
    public target = ""
    public title = ""
    public icon: Icon | string | null = null
    public type = ""
    public linkColour = ""
    public fontWeight = ""
    public fontFamily: string | null = ""
    public excludeFrom?: ExcludeFrom
}
export class Mission {
    public noOfColumns = 0
    public title: string | null = ""
    public items: MissionItem[] = [new MissionItem()]
    public categoryLink: CategoryLink | null = new CategoryLink()
    public excludeFrom?: ExcludeFrom
}

export class MissionItem {
    public title = ""
    public imageUrl = ""
    public target: string | null = ""
    public excludeFrom?: ExcludeFrom
}

export class CategoryLink {
    public title = ""
    public target = ""
}

export class DefaultConfig {
    public version = ""
    public country = ""
}

export class Icon {
    public height: number | undefined = undefined
    public url = ""
    public width: number | undefined = undefined
}
