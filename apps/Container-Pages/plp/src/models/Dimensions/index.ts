export interface Dimensions {
    plpStyleConfig: PlpSectionSizes
}

export interface PlpSectionSizes {
    inPageFiltersBreakpoint: string
    itemsPerRow: Breakpoints
    productWidthSize: number
}

export interface Breakpoints {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
}
