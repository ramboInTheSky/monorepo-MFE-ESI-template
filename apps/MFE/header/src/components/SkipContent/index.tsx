import React from "react"
import {IS_BROWSER} from "../../utils/window"
import {Container} from "./component"
import {PLP_ENTRYPOINT_ID} from "../../config/constants"
import connect from "./connect"

export const SkipContent = ({text}) => {
    if (!IS_BROWSER()) return null
    const res = document.querySelector<HTMLInputElement>(`#${PLP_ENTRYPOINT_ID}`)
    if (!res) return null
    const handleSkipKeyboard = e => {
        if (e.key === "Enter") {
            res.focus()
        }
    }

    const handleSkipClick = () => {
        res.focus()
    }

    return (
        <Container
            id="header-skip-to-content"
            data-testid="header-skip-to-content"
            tabIndex={0}
            onKeyDown={handleSkipKeyboard}
            onClick={handleSkipClick}
            aria-label={text.skipToMainContent}
        >
            {text.skipToMainContent}
        </Container>
    )
}

export default connect(SkipContent)
