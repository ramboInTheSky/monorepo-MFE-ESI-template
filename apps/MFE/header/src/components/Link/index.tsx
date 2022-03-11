import React, {ReactNode} from "react"
import {Anchor} from "./component"

export type LinkProps = {
    href: string
    children: ReactNode
    dataGaV1?: string
    dataGaV2?: string
    rel?: string
    dataTestId?: string
}

const Link = ({href, children, dataGaV1, dataGaV2, rel, dataTestId}: LinkProps) => {
    const linkProps = {
        href,
        "data-ga-v1": dataGaV1,
        "data-ga-v2": dataGaV2,
    }

    // eslint-disable-next-line dot-notation
    if (rel) linkProps["rel"] = rel

    return (
        <Anchor {...linkProps} data-testid={dataTestId}>
            {children}
        </Anchor>
    )
}

export default Link
