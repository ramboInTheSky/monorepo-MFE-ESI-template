export class SEOData {
    public id? = ""
    public title? = ""
    public target? = ""
    public viewType? = ""
    public realm? = ""
    public territory? = ""
    public language? = ""
    public items: SEOItems[] = [new SEOItems()]
}

export class SEOItems {
    public title = ""
    public target = ""
    public items: SecondarySEOItems[] = [new SecondarySEOItems()]
}

export class SecondarySEOItems {
    public title = ""
    public target = ""
}

export default SEOData
