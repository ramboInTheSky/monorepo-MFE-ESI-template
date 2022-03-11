interface Filter {
    isOpen: boolean
    viewMoreOpened: boolean
}

export interface FilterCategorySettings {
    [key: string]: Filter
}

export interface FilterCookie {
    page: string
    filterCategorySettings: FilterCategorySettings
}
