import React from "react"
import {ThemeType} from "models/theme"

import {Button} from "./component"

export type CTAProps = {
    enable: boolean
    text: string
    url?: string
    themeType: ThemeType
    onClick?: () => void
    testId?: string
    dataGaV1?: string
    dataGaV2?: string
    dataGaV3?: string
    rel?: string
    isCountrySelectorCTA?: boolean
}

const CTA = ({
    enable,
    url,
    text,
    themeType,
    onClick,
    testId,
    dataGaV1,
    dataGaV2,
    dataGaV3,
    rel,
    isCountrySelectorCTA,
}: CTAProps) => {
    return (
        <Button
            href={url}
            onClick={onClick}
            disabled={!enable}
            showOpacity={!enable}
            themeType={themeType}
            disableRipple
            data-testid={testId}
            data-ga-v1={dataGaV1}
            data-ga-v2={dataGaV2}
            data-ga-v3={dataGaV3}
            rel={rel}
            isCountrySelectorCTA={isCountrySelectorCTA}
        >
            {text}
        </Button>
    )
}

export default CTA
