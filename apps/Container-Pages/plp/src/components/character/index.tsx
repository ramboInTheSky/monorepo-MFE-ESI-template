import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {CharacterLink} from "./components"

interface FilterButtonProps {
    onClick: () => void
    text: string
    isClickable: boolean
    isSelectedCharacter?: boolean
}

export const Character = ({text, onClick, isClickable, isSelectedCharacter}: FilterButtonProps) => 
    <CharacterLink
        disabled={!isClickable}
        selected={isSelectedCharacter}
        component="button"
        data-testid={formatTextTestIds(`character-link-${text}`)}
        onClick={onClick}>
        {text}
    </CharacterLink>

export default Character
