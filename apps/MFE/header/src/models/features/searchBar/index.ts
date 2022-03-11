export class ProductsMaxItemsData {
    public xs = 0
    public sm = 0
    public md = 0
    public lg = 0
    public xl = 0
}

export class SearchBarType {
    [key: string]: any
    public MaxItems = 0
    public ProductsMaxItems? = new ProductsMaxItemsData()
}

export class FeatureSwitchData {
    [key: string]: any
    public Value = ""
    public Autocomplete? = new SearchBarType()
    public RecentSearch? = new SearchBarType()
}

export const SupportedSearchBar = {
    SimpleSearch: "SimpleSearch",
    EnrichSearch: "EnrichSearch",
}
