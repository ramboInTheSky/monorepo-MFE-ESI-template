import React, {useEffect, useState} from "react"
import {IconButton} from "@mui/material"
import FadeInAnimation from "../FadeInAnimation"
import Icon from "../Icon"
import {Container, Gradient} from "./component"
import touchDevice from "../../utils/is-touch-device"
import urls from "../../config/urls"
import connect from "./connect"

export type ChevronProps = {
    isRTL?: boolean
    placement: string
    handleClick: (event: React.MouseEvent<EventTarget>) => void
    show: boolean
    text: any
}

const Chevron = ({isRTL = false, placement, handleClick, show, text}: ChevronProps) => {
    const [onClient, setOnClient] = useState(false)
    useEffect(() => {
        setOnClient(true)
    }, [])
    const isTouchDevice = touchDevice()
    const isLeft = placement === "left"
    const rotate = !isLeft

    return (
        <FadeInAnimation show={show} timeout={350}>
            <Container doRotate={rotate}>
                {!isTouchDevice && onClient && (
                    <IconButton
                        disableRipple
                        onClick={handleClick}
                        data-testid={`meganav-primarynav-arrow-${placement}`}
                        tabIndex={-1}
                    >
                        <Icon
                            imageUrl={urls.leftWhiteArrowIconUrl}
                            altText={text.chevronIconAltText}
                            rotationDegrees={isRTL ? 180 : 0}
                        />
                    </IconButton>
                )}
                <Gradient flip={false} isShown={show} />
            </Container>
        </FadeInAnimation>
    )
}

export default connect(Chevron)
