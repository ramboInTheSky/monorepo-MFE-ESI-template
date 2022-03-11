import React from "react"
import Hidden from "@mui/material/Hidden"

import connect from "./connect"
import {
    HeaderContainer,
    HeaderWrapper,
    Title,
    GridContent,
    GridWrapper,
    TitleContainerStyled,
    ContentContainerStyled,
} from "../components"
import {AutocompleteProductsGrid, AutocompleteContent, AutocompleteGrid, NoResultText} from "./component"

import Autocomplete from "../../../../components/Autocomplete"
import AutocompleteProducts from "../../../../components/AutocompleteProducts"
import {SuggestionItem} from "../../../../models/autocomplete"

export type AutoCompleteProps = {
    isLoading: boolean
    getAutoCompleteThunk: (suggestion: string) => void
    numFound: number
    suggestions: SuggestionItem[] | null
    typedCharacters: string | number
    text: any
}

const Header = (text: any) => (
    <Hidden mdUp implementation="css">
        <HeaderContainer className="autocomplete-header" data-testid="autocomplete-header">
            <TitleContainerStyled maxWidth="xl">
                <HeaderWrapper>
                    <Title variant="h4">{text.headerText}</Title>
                </HeaderWrapper>
            </TitleContainerStyled>
        </HeaderContainer>
    </Hidden>
)

export const Content = ({
    isLoading,
    getAutoCompleteThunk,
    numFound,
    suggestions,
    typedCharacters,
    text,
}: AutoCompleteProps) => {
    const handleFocus = (term: string, suggestion: string) => {
        if (term === suggestion) return
        getAutoCompleteThunk(suggestion)
    }
    const {loadingText, noResults} = text

    return (
        <GridContent>
            <ContentContainerStyled maxWidth="xl">
                <GridWrapper>
                    {numFound > 0 && (
                        <>
                            <AutocompleteGrid item md={4}>
                                <AutocompleteContent>
                                    <Autocomplete handleFocus={handleFocus} />
                                </AutocompleteContent>
                            </AutocompleteGrid>

                            <AutocompleteProductsGrid item md={8}>
                                {isLoading && loadingText}
                                {!isLoading && <AutocompleteProducts />}
                            </AutocompleteProductsGrid>
                        </>
                    )}
                    {!isLoading && suggestions && suggestions.length === 0 && numFound === 0 && (
                        <NoResultText>
                            {noResults} &apos;<strong>{typedCharacters}</strong>&apos;
                        </NoResultText>
                    )}
                </GridWrapper>
            </ContentContainerStyled>
        </GridContent>
    )
}

export const EnrichAutoComplete = (props: AutoCompleteProps) => (
    <div data-testid="header-enrich-auto-complete">
        <Header text={props.text} />
        <Content {...props} />
    </div>
)

export default connect(EnrichAutoComplete)
