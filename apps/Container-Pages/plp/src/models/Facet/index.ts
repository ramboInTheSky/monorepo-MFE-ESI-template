/* eslint-disable react/static-property-placement */
export class FacetApiResponse {
    n = ""
    c = 0
    v = ""
    s?: boolean
    incompatibleWith: string[] = []
}

export class Facets {
    [key: string]: Facet
}

export class Facet extends FacetApiResponse {
    d = false
}
