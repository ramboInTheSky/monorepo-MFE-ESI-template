export interface Dimension {
    padding?: string
    width?: string
    height?: string
    margin?: string
    border?: string
    borderRadius?: string
    background?: string
    color?: string
    order?: string
    justifyContent?: string
}
export interface ViewportDimensions {
    xs: Dimension
    sm: Dimension
    md: Dimension
    lg: Dimension
    xl: Dimension
}

export interface MissionViewportDimensions {
    Container: ViewportDimensions
    Item: ViewportDimensions
}

export interface RealmDimensions {
    UpperHeader: ViewportDimensions
    PrimaryNav: ViewportDimensions
    SecondaryNav: ViewportDimensions
    SnailItem: ViewportDimensions
    Missions: MissionViewportDimensions
}
