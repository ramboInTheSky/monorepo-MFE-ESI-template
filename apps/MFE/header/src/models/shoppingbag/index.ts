export type PaymentType = "GiftCard" | "Evoucher" | "Card"
export type DiscountsType = "Percentage" | "Cash"
export type PromotionType = "None"

export class BagGetApiModel {
    skipRebuild = false
    ap = false
}

export interface ChargesAndIncentive {
    AdditionalAmount: number
    AdditionalAmountFormatted: string
    AdditionalCode: string
    MaximumOrderValue: number
    MinimumOrderValue: number
    OfferShortDescription: string
    OfferTypeDescription: string
    Type: string
}

export interface MultibuyDiscountedItem {
    DiscountedPrice: number
    MFItemIndex: number
    PromotionCode: string
    QuantityIndex: number
    DiscountedPromotionType: string
    PersonalisedPromotion: boolean
}

export interface FieldValue {
    Field: string
    Value: string
}

export interface Item {
    ItemID: number
    ItemNumber: string
    OptionNo: string
    SizeDescription: string
    Price: string
    Quantity: number
    StockStatus: string
    StockMessage: string
    WarrantyItem: Item[] | null
    Description: string
    Url: string
    PublicationCode: string
    IsSalePrice: boolean
    ProductName: string
    TPSearchDescription: string
    IsMultibuyItem: boolean
    SpecformMessage: string
    CanOrder: boolean
    CanUpdateSize: boolean
    CanUpdateQty: boolean
    MaxQuantity: number
    MultibuyDiscountAppliedItems: MultibuyDiscountedItem[] | null
    ItemCategory: string
    AlternativeDescription: string
    LinkedItems: any[] | null
    GroupID: string | null
    Chain: string | null
    PriceFormatted: string
    TotalPriceFormatted: string
    CanSaveForLater: boolean
    IsDiscount: boolean
    Colour: string | null
    Personalisation: string
    DDFulfiller: string
    PersonalisationReference: string
    PersonalisationFields: FieldValue[] | []
    Fit: string | null
    Department: string
    PersonalisedGiftTheme: string
    CistStoreId: string | null
    IsCistItem: boolean
    CistDate: Date | null
    CistStoreName: string | null
    CistStoreDisplayAddress: string | null
    CistStorePoscode: string | null
    CistBranchNumberPrefix: string | null
    EnglishDescription: string
    EnglishSizeDescription: string
    SaleClearanceSofaImage: string | null
    CistNextOpeningTimes: Record<string, Date>[] | null
    SearchDescription: string | null
    CustomItemReference: string | null
    CustomItemFields: FieldValue[] | []
    FulfilmentType: string | null
    CustomItemType: string | null
    PremiumSiteIndicator: string
    IsHighRiskItem: boolean
    ItemBrand: string | null
    itemImageUrl?: string
}

export interface PersonalisedPromotions {
    Count: number
    PersonalPromotions: string[]
}

export interface Guest {
    IsGuestCheckout: boolean
    HasGuestCheckoutProcessStarted: boolean
    DefaultShippingCharge: string
    TotalCost: string
    ProviderValidation: null
    BagChecksum: number
    UserAgent: string
    ChosenProvider: number
    CanConvert: number
}

export interface Payment {
    Amount: number
    PaymentType: PaymentType
    Type: PaymentType
    LastFourDigits: string
}

export interface Group {
    GroupId: string
    GroupType: string
    PageUrl: string
    DeliveryWeeks: number
}

export interface VipPromotion {
    Code: string
    DiscountValue: number
    DiscountsType: DiscountsType
    ItemPremiumIndicator: string
    PromotionType: PromotionType
    PromotionDescription: string
}

export interface ShoppingBag {
    Anonymous: boolean
    Name: string
    AccountType: string
    Version: number
    ItemCount: number
    Authenticated: boolean
    FinalOrderValue: number
    OrderGoodsValue: number
    Items: Item[]
    ChargesAndIncentives: ChargesAndIncentive[]
    MultiBuyDiscount: number
    MultiBuyDescription: string
    DeliveryCharge: number
    DeliveryDescription: string
    IsShoppingBagFull: boolean
    LowerLimitReached: boolean
    IsPreviewCustomer: boolean
    MultibuyDiscountedPromotionTypes: string
    FromLabelWebsite: boolean
    RunningTotal: number
    Payments: Payment[]
    ItemStateVersion: number
    SessionTransferVariables: string
    AccountNumber: string
    RecreatedFromPreviousSession: boolean
    InvalidItemCount: number
    UserNotifiedOfSessionRecreation: boolean
    UserNotifiedOfInvalidItems: boolean
    OldShoppingBagAge: number
    IsAccountLockedDown: boolean
    Groups: Group[]
    IsCallCentreMode: boolean
    AccountSecurityCheckFailed: boolean
    ForceCashPayment: boolean
    OrderGoodsValueFormatted: string
    DeliveryChargeFormatted: string
    FinalOrderValueFormatted: string
    MultiBuyDiscountFormatted: string
    NotifyEmailExists: boolean
    PaypalSessionAttempts: number
    FirstName: string
    NextUnlimitedStatus: number
    ItemAddedFromSaveForLaterNotification: boolean
    CountryCode: string
    CreditAccountType: number
    MainframeSessionID: string
    ShoppingBagRecentlyRebuilt: boolean
    Xhos: string
    PersonalisedPromotions: PersonalisedPromotions
    Guest: Guest
    VipPromotions: VipPromotion[]
    Children: string[]
    ChildrenCount: number
    ID: string
    Description: string
    Url: string
    Image: string
}
