import React from "react"
import {formatTextTestIds} from "@monorepo/utils"

import {RegionContainer, RegionGrid} from "./components"

interface RegionWrapperProps {
    children: JSX.Element
    regionType: string
}

const RegionWrapper = ({regionType, children}: RegionWrapperProps) => {
    return (
        <>
            <RegionGrid container className={regionType} data-testid={formatTextTestIds(`footer-region-${regionType}`)}>
                <RegionContainer maxWidth="xl">{children}</RegionContainer>
            </RegionGrid>
        </>
    )
}

export default RegionWrapper
