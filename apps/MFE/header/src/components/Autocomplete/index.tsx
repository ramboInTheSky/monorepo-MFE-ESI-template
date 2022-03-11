import React from "react"

import {formatTextTestIds} from "@monorepo/utils"
import connect from "./connect"
import {Ul, Li} from "./components"
import {SuggestionItem} from "../../models/autocomplete"
import TextMatcher from "../TextMatcher"
import {handleClick, Focus, handleKeyboardTapping} from "../../utils/autocomplete"
import {SEARCH_DATA_GA, HEADER_AUTOCOMPLETE_LIST_ITEM_DATA_GA} from "../../config/constants"

export type AutocompleteProps = {
    handleSuggestionClick: (suggestion: string) => void
    handleFocus?: (term: string, suggestion: string) => any
    suggestions: SuggestionItem[] | any
    term: string | any
    getConnectedPlpUrl: (suggestion: string) => string
}

export const Autocomplete = ({
    handleSuggestionClick,
    handleFocus,
    suggestions,
    term,
    getConnectedPlpUrl,
}: AutocompleteProps) => {
    return (
        <Ul data-testid="searchBar-suggestions">
            {suggestions.map(({dq: suggestion}) => {
                return (
                    <Li key={suggestion}>
                        <a
                            data-testid={formatTextTestIds(`header-autocomplete-${suggestion}`)}
                            onClick={handleClick(suggestion, handleSuggestionClick)}
                            href={getConnectedPlpUrl(suggestion)}
                            onMouseEnter={Focus(term, suggestion, handleFocus)}
                            onFocus={handleKeyboardTapping(term, suggestion, handleFocus)}
                            data-ga-v1={SEARCH_DATA_GA}
                            data-ga-v2={term}
                            data-ga-v3={HEADER_AUTOCOMPLETE_LIST_ITEM_DATA_GA}
                            data-ga-v4={suggestion}
                        >
                            <TextMatcher text={suggestion} textToMatch={term} />
                        </a>
                    </Li>
                )
            })}
        </Ul>
    )
}

export default connect(Autocomplete)
