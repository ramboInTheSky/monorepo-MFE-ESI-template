export class HeaderModel {
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
    public elements: ElementModel[] = []
}

export class MyAccountElements {
    public title = ""
    public elements: ElementModel[] = []
}

export class ElementModel {
    public type: null | string = ""
    public elements?: ElementModel[] = []
    public url: null | string = ""
    public icon: null | string = ""
    public text: null | string = ""
    public accessibilityText: null | string = ""
    public tooltip: null | string = ""
    public wideModeIcon: null | string = ""
    public narrowModeIcon: null | string = ""
    public openInNewWindow = false
}

export default HeaderModel
