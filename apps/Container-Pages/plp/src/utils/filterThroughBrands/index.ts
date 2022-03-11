const filterThroughBrands = (searchText: string, filters: string[]) => {
    let brandsToFilterThrough = [] as string[]

    if (filters) {
        brandsToFilterThrough = filters
    } else {
        return {filteredBrandsOfTopFive: [], restOfFilteredBrands: []}
    }

    const topFiveFilters = brandsToFilterThrough.slice(0, 5)
    const restOfFilterItems = brandsToFilterThrough.slice(5, brandsToFilterThrough.length)
    const filteredBrandsOfTopFive = [] as string[]
    const restOfFilteredBrands = [] as string[]

    if (topFiveFilters.length > 0) {
        topFiveFilters.forEach(filter => {
            if (filter.split(":")[1].includes(searchText.toLowerCase())) {
                filteredBrandsOfTopFive.push(filter)
            }
        })
    }

    if (restOfFilterItems.length > 0) {
        restOfFilterItems.forEach(filter => {
            if (filter.split(":")[1].includes(searchText.toLowerCase())) {
                restOfFilteredBrands.push(filter)
            }
        })
    }
    return {filteredBrandsOfTopFive, restOfFilteredBrands}
}

export default filterThroughBrands
