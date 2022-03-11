import React from "react"
import Hidden from "@mui/material/Hidden"
import Autocomplete from "../../../../components/Autocomplete"
import connect from "./connect"
import {Wrapper, Container, HeaderContainer, Title, SeeAllLinkContainer, NoResultText} from "../components"
import {SuggestionItem} from "../../../../models/autocomplete"
import {SEARCH_DATA_GA, HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA} from "../../../../config/constants"

export type SimpleAutocompleteProps = {
    getConnectedPlpUrl: (suggestion: string) => string
    term: string
    numFound: number
    suggestions: SuggestionItem[] | null
    isLoading: boolean
    typedCharacters: string | number
    text: any
}

const Header = (text: any) => (
    <Hidden mdUp implementation="css">
        <HeaderContainer data-testid="header-simple-autocomplete-title">
            <Title variant="h4">{text.headerText}</Title>
        </HeaderContainer>
    </Hidden>
)
const Content = ({
    getConnectedPlpUrl,
    term,
    numFound,
    suggestions,
    isLoading,
    typedCharacters,
    text,
}: SimpleAutocompleteProps) => {
    const {searchLinktext, noResults} = text

    return (
        <Wrapper data-testid="recents-body">
            {numFound > 0 && (
                <>
                    <Autocomplete />
                    <Hidden mdUp implementation="css">
                        <SeeAllLinkContainer>
                            <a
                                data-testid="header-simple-autocomplete-see-all-results-link"
                                data-ga-v1={SEARCH_DATA_GA}
                                data-ga-v3={HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA}
                                href={getConnectedPlpUrl(term)}
                            >
                                {searchLinktext}
                            </a>
                        </SeeAllLinkContainer>
                    </Hidden>
                </>
            )}

            {!isLoading && suggestions && suggestions.length === 0 && numFound === 0 && (
                <NoResultText>
                    {noResults} &apos;<strong>{typedCharacters}</strong>&apos;
                </NoResultText>
            )}
        </Wrapper>
    )
}

export const SimpleAutocomplete = (props: SimpleAutocompleteProps) => (
    <Container data-testid="header-simple-auto-complete">
        <Header text={props.text} />
        <Content {...props} />
    </Container>
)

export default connect(SimpleAutocomplete)
