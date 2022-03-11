import React from "react"
import {Container, ImageContainer, ImageTitle, ImageWrapper} from "./component"
import {MissionItem} from "../../models/secondary-nav"
import connect from "./connect"
import {MISSION_BLOCK_DATA_GA, SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"
import {configRelativePathURL} from "../../utils/configUrlPath"

type MissionsItemProps = MissionItem & {
    department: string
    target: string | null
    noOfColumns: number
    siteUrl: string
}

const onClick = (target, department) => {
    localStorage.removeItem(VISITED_PAGES)
    localStorage.setItem(SELECTED_DEPARTMENT_DETAILS, JSON.stringify({path: target, dept: department}))
}

export const MissionsItem = ({imageUrl, target, title, department, noOfColumns, siteUrl}: MissionsItemProps) => {
    const validTarget = configRelativePathURL(target ?? "", siteUrl)
    return (
        <Container
            onClick={() => onClick(validTarget, department)}
            href={validTarget}
            numberOfColumns={noOfColumns > 3 ? 3 : noOfColumns}
            data-testid="missions-item"
            data-ga-v1={MISSION_BLOCK_DATA_GA}
            data-ga-v2={department}
            data-ga-v3={title}
        >
            <ImageWrapper>
                <ImageContainer alt={title} src={imageUrl} />
            </ImageWrapper>
            <ImageTitle> {title} </ImageTitle>
        </Container>
    )
}

export default connect(MissionsItem)
