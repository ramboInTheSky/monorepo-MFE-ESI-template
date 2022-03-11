import React from "react"
import {Button} from "@mui/material"
import {Container, Image} from "./component"
import {CategoryLink} from "../../models/secondary-nav"
import connect from "./connect"
import {MISSION_BLOCK_DATA_GA, SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"
import urls from "../../config/urls"

type MissionsCTAProps = CategoryLink & {
    siteUrl: string
    department: string
    textAlignment: string
    text: any
}

const onClick = (target: string, department: string): void => {
    localStorage.removeItem(VISITED_PAGES)
    localStorage.setItem(SELECTED_DEPARTMENT_DETAILS, JSON.stringify({path: target, dept: department}))
}

export const MissionsCTA = ({title, target, siteUrl, department, text, textAlignment}: MissionsCTAProps) => {
    return (
        <Container data-testid="missions-cta" onClick={() => onClick(target, department)}>
            <Button
                href={`${siteUrl}${target}`}
                data-ga-v1={MISSION_BLOCK_DATA_GA}
                data-ga-v2={department}
                data-ga-v3={title}
                style={{textTransform: "none"}}
            >
                <span data-testid="missions-cta-buttonText">{title}</span>
                <Image alignment={textAlignment} alt={text.arrowIconUrlAltText} src={urls.arrowIconUrl} />
            </Button>
        </Container>
    )
}

export default connect(MissionsCTA)
