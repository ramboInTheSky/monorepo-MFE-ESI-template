type ColumnRange = 1 | 2 | 3 | 4 | 6 | 12

export interface DefaultColumnRanges {
    xs: ColumnRange
    sm: ColumnRange
    lg: ColumnRange
}

export const DefaultColumns: DefaultColumnRanges = {
    xs: 12,
    sm: 6,
    lg: 3,
}
