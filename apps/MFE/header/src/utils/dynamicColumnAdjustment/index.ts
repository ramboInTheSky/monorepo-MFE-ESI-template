type ColumnRange = 1 | 2 | 3 | 4 | 6 | 12

export const DynamicColumnAdjustment = (numberOfItems: number): ColumnRange => {
    const numberOfAvailableColumns = 12
    const columnOption = numberOfAvailableColumns / numberOfItems
    switch (columnOption) {
        case 1: // 12 columns
            return 1
        case 2: // 6 columns
            return 2
        case 3: // 4 columns
            return 3
        case 4: // 3 columns
            return 4
        case 6: // 2 columns
            return 6
        default:
            // 1 column (number of columns not easily divisable by 12 or only one option)
            return 12
    }
}
