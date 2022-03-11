import React from "react"
import {FilterFeatsContainer} from "./components"
import Facets from "../facets"

interface FiltersFeatsProps {
    name: string
}

export const FacetsFeats = ({name}: FiltersFeatsProps) => (
    <FilterFeatsContainer>
        <Facets facetName={name} />
    </FilterFeatsContainer>
)
export default FacetsFeats
