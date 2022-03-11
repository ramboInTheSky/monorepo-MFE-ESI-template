export class FooterModel {
    public id = ""
    public name = ""
    public realm = ""
    public territory = ""
    public language = ""
    public regions: RegionModel[] = []
}

export class RegionModel {
    public type = ""
    public title = ""
    public accessibilityTitle = ""
    public subRegions: SubRegionModel[] = []
}

export class SubRegionModel {
    public title = ""
    public accessibilityTitle = ""
    public elements: SubRegionElementModel[] = []
}

export class SubRegionElementModel {
    public url = ""
    public openInNewWindow = false
    public name = ""
    public type = ""
    public icon = ""
    public text = ""
    public accessibilityText = ""
    public tooltip = ""
    public accessibilityTooltip = ""
    public description = ""
    public accessibilityDescription = ""
}
