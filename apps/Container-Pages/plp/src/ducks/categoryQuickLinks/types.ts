export interface CategoryQuickLinkItem {
    href: string
    title: string
    description: string
    imageSrc: string
    imageAlt: string
}

export interface CategoryQuickLinksData {
    [realm: string]: {
        uk: CategoryQuickLinkItem[]
        international: CategoryQuickLinkItem[]
    }
}

export interface CategoryQuickLinksState {
    items: CategoryQuickLinkItem[]
}
