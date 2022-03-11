import React, {useState, useEffect,FormEvent} from "react"
import debounce from "../../utils/debounce"
import {
    DEBOUNCE_TIME,
    TYPING_STATE,
    MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE,
    SEARCH_DATA_GA,
    SEARCH_ICON_DATA_GA,
    SEARCH_DELETE_CURRENT_SEARCH_DATA_GA,
    SEARCH_KEY_PRESS_ENTER_DATA_GA,
} from "../../config/constants"
import {Divider, Input, SubmitButton, Container, ClearButton, Form, HiddenLabel, Img} from './component'
import urls from "../../config/urls"
import {handlePropagation} from "../../utils/handlePropagation"
import connect from "./connect"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

type ClickHandler = (searchTerm: string) => void

export type SearchBoxProps = {
    handleClick: ClickHandler
    typing: (chars: string) => void
    autocompleteTyping: (chars: string) => void
    backgroundImage: string
    placeholder: string
    typedCharacters: any
    openDrawer: () => void
    labelId: string
    text: any
    realm: string
}

const {clearButton: clearButtonUrl} = urls.searchBox

const showAutocompletePanel = (text: string) => text.length >= MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE

export const SearchBox = ({
    placeholder,
    typing,
    autocompleteTyping,
    backgroundImage,
    handleClick,
    openDrawer,
    typedCharacters,
    labelId,
    text,
}: SearchBoxProps) => {
    const [searchState, setSearchState] = useState(TYPING_STATE.IDLE)
    const {label, clearButton} = text

    const term = showAutocompletePanel(typedCharacters)
        ? debounce(typedCharacters, DEBOUNCE_TIME)
        : debounce(typedCharacters, 0)

    useEffect(() => {
        if (searchState !== TYPING_STATE.IDLE) {
            typing(typedCharacters)
            if (showAutocompletePanel(term)) {
                if (term === typedCharacters) {
                    autocompleteTyping(term)
                    setSearchState(TYPING_STATE.AUTO_COMPLETE)
                }
            } else {
                setSearchState(TYPING_STATE.RECENT_SEARCH)
            }

            openDrawer()
        }
    }, [term, typedCharacters, autocompleteTyping, openDrawer, searchState, typing])

    const handleFocus = () => {
        openDrawer()
        if (showAutocompletePanel(typedCharacters)) {
            setSearchState(TYPING_STATE.AUTO_COMPLETE)
        } else {
            setSearchState(TYPING_STATE.RECENT_SEARCH)
        }
    }
    const handleEmptySpace = val => !val || !val.trim() ? '' : val
    const handleOnChange = e => typing(handleEmptySpace(e.target.value))

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        removeFromLocalStorage()
        const cleanSearchTerm = typedCharacters.toLowerCase()
        const hasChars = cleanSearchTerm.length > 0
        if (hasChars) handleClick(cleanSearchTerm)
    }
    
    const handleClear = () => {
        setSearchState(TYPING_STATE.IDLE)
        typing("")
    }

    return (
        <Container onClick={handlePropagation}>
            <Form onSubmit={handleSubmit}>
                <HiddenLabel htmlFor={labelId}>{placeholder}</HiddenLabel>
                <Input
                    required
                    autoComplete="off"
                    inputProps={{
                        label,
                        "data-testid": `header-search-bar-text-input`,
                        "data-ga-v1": SEARCH_DATA_GA,
                        "data-ga-enter-event": SEARCH_KEY_PRESS_ENTER_DATA_GA,
                    }}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    value={typedCharacters}
                    name={labelId}
                    id={labelId}
                />

                {typedCharacters && (
                    <ClearButton
                        href="#"
                        data-testid="header-search-bar-clear-text-button"
                        onClick={handleClear}
                        data-ga-v1={SEARCH_DATA_GA}
                        data-ga-v3={SEARCH_DELETE_CURRENT_SEARCH_DATA_GA}
                        tabIndex={0}
                    >
                        <img src={clearButtonUrl.path} alt={clearButton.alt} />
                    </ClearButton>
                )}
                <Divider orientation="vertical" />
                <SubmitButton
                    type="submit"
                    value=""
                    data-testid="header-search-bar-button"
                    data-ga-v1={SEARCH_DATA_GA}
                    data-ga-v3={SEARCH_ICON_DATA_GA}
                    tabIndex={0}
                >
                    <Img src={backgroundImage} alt="Search Icon" />
                </SubmitButton>
            </Form>
        </Container>
    )
}

export default connect(SearchBox)
