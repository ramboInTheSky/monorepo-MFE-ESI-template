import {removeFromLocalStorage} from "../removeFromLocalStorage"

export const handleClick = (suggestion: string, handleSuggestionClick) => {
    return (event: React.MouseEvent) => {
        event.preventDefault()
        removeFromLocalStorage()
        handleSuggestionClick(suggestion)
    }
}

/**
 * Function to handle searchbar suggestions mouse over events.
 *
 * @param {string} term - the search term user searching for - example dress
 * @param {string} suggestion - suggestion for the search term - example dressing gown
 * @param {function(term: string, suggestion: string)} handleFocus - callback that runs when handleFocus exist
 *
 */
export const Focus = (term: string, suggestion: string, handleFocus?: (term: string, suggestion: string) => void) => {
    return (event: React.MouseEvent) => {
        event.preventDefault()
        if (handleFocus) handleFocus(term, suggestion)
    }
}

/**
 * Function to handle searchbar suggestions keyboard focus events.
 *
 * @param {string} term - the search term user searching for - example dress
 * @param {string} suggestion - suggestion for the search term - example dressing gown
 * @param {function(term: string, suggestion: string)} handleFocus - callback that runs when handleFocus exist
 *
 */
export const handleKeyboardTapping = (
    term: string,
    suggestion: string,
    handleFocus?: (term: string, suggestion: string) => void,
) => {
    return (event: React.FocusEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        if (handleFocus) handleFocus(term, suggestion)
    }
}
