import { FacetsState } from "models/FacetsState"

interface NewFiltersState {
    facets: FacetsState
}

export const selectedFacetFilterTitle = (value: NewFiltersState) => {
  const arrayOfSelectedFacets: any = []

  Object.entries(value.facets).forEach(([_key, valueOfKey]) => {
      if(valueOfKey.s) {
          arrayOfSelectedFacets.push(valueOfKey.v)
      }
  })

  const finalFilterFacetSelection: any = []
  arrayOfSelectedFacets.forEach((entry) => {
      const splitEntry = entry.split(":")
      const containsTheEntryCategoryIndex = finalFilterFacetSelection.findIndex((vel) => vel.includes(splitEntry[0].charAt(0).toUpperCase() + splitEntry[0].slice(1)))
      if (containsTheEntryCategoryIndex >= 0) {
          finalFilterFacetSelection[containsTheEntryCategoryIndex] = `${finalFilterFacetSelection[containsTheEntryCategoryIndex]}, ${splitEntry[1]}`
      } else {
          finalFilterFacetSelection.push(`${splitEntry[0].charAt(0).toUpperCase() + splitEntry[0].slice(1)}: ${splitEntry[1]}`)
      }
  })
  
  return finalFilterFacetSelection.join(" | ")
}