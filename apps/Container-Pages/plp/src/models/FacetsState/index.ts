export class FacetsState {
    [key: string]: FacetState
}
export class FacetState {
    n = ""
    c = 0
    v = ""
    s?: boolean
    incompatibleWith: string[] = []
    d = false
}

export const FacetsAlphabetValues = {
    All: "All",
    Numeric: "0-9",
}
