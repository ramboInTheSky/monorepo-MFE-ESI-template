export interface Styles {
    padding?: string
    width?: string
    height?: string
    margin?: string
    border?: string
    borderRadius?: string
    boxShadow?: string
    background?: string
    color?: string
    order?: string
    display?: string
}
export interface ViewportStyles {
    xs: Styles
    sm: Styles
    md: Styles
    lg: Styles
    xl: Styles
}

export interface RealmStyles {
    CTA: ViewportStyles
    UpperHeader: ViewportStyles
    PrimaryNav: ViewportStyles
    Brand: ViewportStyles
    SearchBox: ViewportStyles
    Checkout: ViewportStyles
    MyAccountCta: ViewportStyles
    Quicklinks: ViewportStyles
}

export enum SupportedRegionTypes {
    Brand = "Brand",
    SearchBox = "SearchBox",
    QuickLinks = "QuickLinks",
    Checkout = "Checkout",
    CountryLangSelector = "CountryLangSelector",
    Favourites = "Favourites",
    ShoppingBag = "ShoppingBag",
    PrimaryNav = "PrimaryNav",
    BurgerButton = "BurgerButton",
}
export interface RegionStylingModel {
    containerSpacing: number
    background: string
    borderColor: string
    color: string
}
export class RegionsModel {
    constructor(
        Brand: RegionStylingModel,
        SearchBox: RegionStylingModel,
        QuickLinks: RegionStylingModel,
        Checkout: RegionStylingModel,
        CountryLangSelector: RegionStylingModel,
        Favourites: RegionStylingModel,
        ShoppingBag: RegionStylingModel,
        PrimaryNav: RegionStylingModel,
        BurgerButton: RegionStylingModel,
    ) {
        this.Brand = Brand
        this.SearchBox = SearchBox
        this.QuickLinks = QuickLinks
        this.Checkout = Checkout
        this.CountryLangSelector = CountryLangSelector
        this.Favourites = Favourites
        this.ShoppingBag = ShoppingBag
        this.PrimaryNav = PrimaryNav
        this.BurgerButton = BurgerButton
    }

    Brand: RegionStylingModel
    SearchBox: RegionStylingModel
    Checkout: RegionStylingModel
    QuickLinks?: RegionStylingModel
    CountryLangSelector?: RegionStylingModel
    Favourites?: RegionStylingModel
    ShoppingBag?: RegionStylingModel
    PrimaryNav?: RegionStylingModel
    BurgerButton?: RegionStylingModel
}
