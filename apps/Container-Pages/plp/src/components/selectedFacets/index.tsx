import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import { TextModel } from "models/Text"
import {
    StyledSelectedFacetsContainer,
    StyledSelectedFacetsTitle,
    StyledSelectedFacetsList,
    RemoveSelectedFacet,
    StyledSelectedFacetLabel,
    StyledList,
    StyledListItem,
    StyledRemoveContainer,
    StyledRemove,
} from "./components"
import FilterButton from "../filterButton"
import {FacetState} from "../../models/FacetsState"
import connect from "./connect"
import {useRemoveFilterLabel} from "./useRemoveFilter"

export type SelectedFacetsProps = {
    title: string
    selectedFacets: FacetState[]
    onClearFacets: () => void
    selectFacet: (filterValue: string) => void
    text: TextModel
}

export const SelectedFacets = ({title, selectedFacets, selectFacet, onClearFacets, text}: SelectedFacetsProps) => {
    const {showRemoveLabel, setRemoveLabel, clearRemoveLabel} = useRemoveFilterLabel(selectFacet)

    return (
        <StyledSelectedFacetsContainer>
            <StyledSelectedFacetsTitle variant="h5">
                {text.pages.viewAllModal.selected} {title}
            </StyledSelectedFacetsTitle>
            {selectedFacets.length > 0 && <FilterButton text={text.buttons.clear} onClick={onClearFacets} />}
            <StyledSelectedFacetsList>
                <StyledList>
                    {selectedFacets.map(filter => {
                        const {v, n} = filter
                        return (
                            <StyledListItem key={v}>
                                <StyledSelectedFacetLabel data-testid={formatTextTestIds(`facet-${v}`)} variant="h6">
                                    {n}
                                </StyledSelectedFacetLabel>
                                <StyledRemoveContainer>
                                    {(showRemoveLabel[v]?.focus || showRemoveLabel[v]?.mouse) && (
                                        <StyledRemove data-testid={formatTextTestIds(`remove-text-${v}`)}>
                                            {text.pages.viewAllModal.remove}
                                        </StyledRemove>
                                    )}
                                    <RemoveSelectedFacet
                                        data-testid={formatTextTestIds(`remove-button-${v}`)}
                                        onMouseOver={setRemoveLabel(v, "mouse", true)}
                                        onMouseOut={setRemoveLabel(v, "mouse", false)}
                                        onFocus={setRemoveLabel(v, "focus", true)}
                                        onBlur={setRemoveLabel(v, "focus", false)}
                                        onClick={clearRemoveLabel(v)}
                                    />
                                </StyledRemoveContainer>
                            </StyledListItem>
                        )
                    })}
                </StyledList>
            </StyledSelectedFacetsList>
        </StyledSelectedFacetsContainer>
    )
}

export default connect(SelectedFacets)
