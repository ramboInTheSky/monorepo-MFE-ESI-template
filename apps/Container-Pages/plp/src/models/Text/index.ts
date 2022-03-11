export interface TextModel {
    labels: { 
        [key: string] : string
    }
    buttons: {
        [key: string] : string
    }
    assetsAlt: {
        [key: string] : string
    }
    pages: {
        noResults: {
            header: string
            subHeader: string
            body: {
                [key: string] : string
            }
        }
        products: {
            [key: string] : string
        }
        viewAllModal: {
            [key: string] : string
        }
        filters: {
            priceRange: string
            clearText: string
            searchBrands: string
            priceFilterAriaLabels: {
                [key: string] : string
            }
        }
        collaspedFilters: {
            from: string
        }
        seoMetaData: {
            genderValues: {
                [key: string] : string
            }
        }
        searchBanners: {
            [key: string] : string
        }
    }
    imageAlts: {
        [key: string] : string
    }
}
