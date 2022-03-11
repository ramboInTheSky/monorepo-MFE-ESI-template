// eslint-disable-next-line import/no-cycle
import { TabbedFilterDuckState } from "../../ducks/tabbedFilters"

interface Params {
  state: TabbedFilterDuckState
  child: string
  parent: string
}

export const getHistoricFacetFilter = ({state, child, parent }: Params): Record<string, string[]> => {
  const currentFacetFilterState = state.historicFacetFilter[parent]

  if (currentFacetFilterState) {
    const copy = [...currentFacetFilterState]
    const indexOfFilter = copy.indexOf(child)
    if (indexOfFilter > -1) {
      copy.splice(indexOfFilter, 1)
    } else {
      copy.push(child)
    }
    
    return {
      ...state.historicFacetFilter,
      [parent]: copy
    }
  } 
  return  {
    ...state.historicFacetFilter,
    [parent]: [child]
  }
}