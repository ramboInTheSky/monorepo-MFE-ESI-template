import React from "react"
import {FacetsAlphabetValues} from "../../models/FacetsState"
import {StyledCharacterFilterContainer} from "./components"
import Character from "../character"
import connect from "./connect"


export type CharacterFilterProps = {
    handleSetFiltersAlphabet: (letter: string) => void
    clickableCharacters: string[]
    clickableNumeric: boolean
    activeCharacter: string
    text, 
    alphabet
}

export const CharacterFilter = ({
    handleSetFiltersAlphabet,
    clickableCharacters,
    clickableNumeric,
    activeCharacter,
    text,
    alphabet
}: CharacterFilterProps) => (
    <StyledCharacterFilterContainer data-testid="plp-view-all-characters">
        <Character
            key={FacetsAlphabetValues.All}
            isClickable
            isSelectedCharacter={activeCharacter === FacetsAlphabetValues.All}
            text={text.pages.viewAllModal.all}
            onClick={() => {
                handleSetFiltersAlphabet(FacetsAlphabetValues.All)
            }}
        />
        {alphabet.map(char => (
            <Character
                key={char}
                isClickable={clickableCharacters.includes(char)}
                isSelectedCharacter={activeCharacter === char}
                text={char}
                onClick={() => {
                    handleSetFiltersAlphabet(char)
                }}
            />
        ))}
        <Character
            key={FacetsAlphabetValues.Numeric}
            isClickable={clickableNumeric}
            isSelectedCharacter={activeCharacter === FacetsAlphabetValues.Numeric}
            text={FacetsAlphabetValues.Numeric}
            onClick={() => {
                handleSetFiltersAlphabet(FacetsAlphabetValues.Numeric)
            }}
        />
    </StyledCharacterFilterContainer>
)

export default connect(CharacterFilter)
