import React from "react"
import Hidden from "@mui/material/Hidden"
import {configRelativePathURL} from "../../utils/configUrlPath"
import {Container, Image, TitleAndImageContainer} from "./component"
import connect from "./connect"
import Icon from "../Icon"
import urls from "../../config/urls"
import {LTR, SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"
import {Icon as IconType} from "../../models/secondary-nav"

type CatalogueItemProps = {
    target: string
    title: string
    linkColour: string | null
    fontWeight: string
    fontFamily: string | null
    catalogueListTitle: string | null
    department: string
    tab: string | null
    textAlignment: string
    icon: IconType | string | null
    text: any
    columnIndex: number | undefined
    siteUrl: string
}

const onClick = (target, department, siteUrl) => {
    localStorage.removeItem(VISITED_PAGES)
    localStorage.setItem(
        SELECTED_DEPARTMENT_DETAILS,
        JSON.stringify({path: configRelativePathURL(target, siteUrl), dept: department}),
    )
}

export const CatalogueItem = ({
    target,
    title,
    linkColour,
    fontFamily,
    fontWeight,
    catalogueListTitle,
    department,
    tab,
    textAlignment,
    icon,
    text,
    columnIndex,
    siteUrl,
}: CatalogueItemProps) => {
    const isDirectLink = !catalogueListTitle && columnIndex === 0
    const marketingStyles = {
        linkColour,
        fontFamily,
        fontWeight,
        isDirectLink,
    }

    const renderIcon = iconProp => {
        if (typeof iconProp === "string") return <Image src={iconProp} />
    }

    return (
        <Container {...marketingStyles} onClick={() => onClick(target, department, siteUrl)}>
            <a
                href={configRelativePathURL(target, siteUrl)}
                title={title}
                data-ga-v1={department}
                data-ga-v2={tab || catalogueListTitle}
                data-ga-v3={title}
                data-testid="catalogueItem-href"
            >
                <TitleAndImageContainer>
                    {title}
                    {renderIcon(icon)}
                </TitleAndImageContainer>
                {isDirectLink && (
                    <Hidden lgUp implementation="js">
                        <Icon
                            imageUrl={urls.arrowIconUrl}
                            altText={text.chevronIconAltText}
                            width={0.75}
                            rotationDegrees={textAlignment === LTR ? -90 : 90}
                        />
                    </Hidden>
                )}
            </a>
        </Container>
    )
}

export default connect(CatalogueItem)
