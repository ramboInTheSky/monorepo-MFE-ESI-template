import useScrollTrigger from "@mui/material/useScrollTrigger"
import React, {FC} from "react"
import {getWindow} from "../../utils/window"
import env from "../../config/env"
import connect from "./connect"
import {StyledZoom, StyledFab} from "./components"
import {getPageOneUri} from "../../utils/urlBuilder"
import { TextModel } from "../../models/Text"

interface BackToTopProps {
    startPage: number
    text: TextModel
    loadFirstPage: (historyUrl: string) => void
}

export const BackToTop: FC<BackToTopProps> = ({startPage, text, loadFirstPage}: BackToTopProps) => {
    const window = getWindow()

    const trigger = useScrollTrigger({
        target: window ?? undefined,
        disableHysteresis: true,
        threshold: window ? window.innerHeight : 0,
    })

    if (!window) return null

    const handleClick = () => {
        if (startPage === 1) {
            window.scrollTo(0, 0)
        } else {
            loadFirstPage(getPageOneUri(window.location.toString()))
        }
    }

    return (
        <StyledZoom unmountOnExit in={trigger || startPage > 1}>
            <StyledFab data-testid="plp-back-to-top-btn" onClick={handleClick} aria-label={text.buttons.backToTop}>
                <img
                    className="material-icons"
                    src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/back-to-top-chevron.svg`}
                    alt={text.imageAlts.backToTopIcon}
                />
            </StyledFab>
        </StyledZoom>
    )
}

export default connect(BackToTop)
