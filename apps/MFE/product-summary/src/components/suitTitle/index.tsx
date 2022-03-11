import React, {FC} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import connect from "./connect"
import {TitleLink} from "./components"

interface Props {
    title: string
    linkUrl: string
    tooltipTitle: string
}

export const SuitTitle: FC<Props> = ({title, tooltipTitle, linkUrl}) => {
    return (
        <TitleLink
            variant="body1"
            href={linkUrl}
            title={tooltipTitle}
            data-testid={formatTextTestIds(`suit_summary_title`)}
            data-label={title}
            data-desc={title}
            data-usespan="False"
        >
            {title}
        </TitleLink>
    )
}

export default connect(SuitTitle)
