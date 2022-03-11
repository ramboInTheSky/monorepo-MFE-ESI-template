import React from "react"
import CatalogueItem from "../CatalogueItem"
import {
    Container,
    List,
    Title,
    Hidden,
    AccordionPanelSummary,
    AccordionPanelDetails,
    AccordionPanel,
    ImagePlaceholder,
} from "./component"
import connect from "./connect"
import {Category, Icon, Link} from "../../models/secondary-nav"
import IconImage from "../Icon"
import urls from "../../config/urls"

type CatalogueMarketingStyles = {
    linkColour: string
    fontFamily: string | null
    fontWeight: string
}

type CatalogueListTitleProps = {
    catalogueMarketingStyles: CatalogueMarketingStyles
    title: string | null
    icon: Icon | null
    isIconEnabled: boolean
    isFirstElement?: boolean
}
export const CatalogueListTitle = ({
    title,
    icon,
    isIconEnabled,
    catalogueMarketingStyles,
    isFirstElement,
}: CatalogueListTitleProps) => {
    if (!title) return null
    return (
        <Title {...catalogueMarketingStyles} isFirstElement={isFirstElement}>
            {isIconEnabled && (
                <ImagePlaceholder data-testid="meganav-secondary-nav-small-screen-image-placeholder" {...icon} />
            )}{" "}
            <span> {title} </span>
        </Title>
    )
}

type CatalogueListContentProps = {
    items: Link[]
    catalogueListTitle: string | null
    department: string
    tab: string | null
    columnIndex: number | undefined
}

export const CatalogueListContent = ({
    items,
    catalogueListTitle,
    department,
    tab,
    columnIndex,
}: CatalogueListContentProps) => (
    <List>
        {items.map(({title, target, linkColour, fontFamily, fontWeight, icon}) => {
            const marketingstyles = {
                linkColour,
                fontFamily,
                fontWeight,
            }

            const key = `${title}-${target}`
            return (
                <CatalogueItem
                    department={department}
                    tab={tab}
                    catalogueListTitle={catalogueListTitle}
                    title={title}
                    target={target}
                    key={key}
                    icon={icon}
                    columnIndex={columnIndex}
                    {...marketingstyles}
                />
            )
        })}
    </List>
)

type SmallScreenProps = {
    items: Link[]
    title: string | null
    icon: Icon | null
    opened?: boolean
    isImagePlaceholderEnabled: boolean
    setOpened: (title: string | null) => void
    catalogueMarketingStyles: CatalogueMarketingStyles
    department: string
    tab: string | null
    text: any
    columnIndex: number | undefined
}

export const SmallScreen = ({
    icon,
    title,
    items,
    isImagePlaceholderEnabled,
    catalogueMarketingStyles,
    opened,
    setOpened,
    department,
    tab,
    text,
    columnIndex,
}: SmallScreenProps) => {
    const handleChange = (_event: React.ChangeEvent<{}>) => {
        setOpened(title)
    }

    return (
        <>
            {title ? (
                <AccordionPanel square expanded={opened} onChange={handleChange}>
                    <AccordionPanelSummary
                        expandIcon={<IconImage imageUrl={urls.arrowIconUrl} altText={text.chevronIconAltText} />}
                    >
                        <CatalogueListTitle
                            title={title}
                            catalogueMarketingStyles={catalogueMarketingStyles}
                            icon={icon}
                            isIconEnabled={isImagePlaceholderEnabled}
                        />
                    </AccordionPanelSummary>
                    <AccordionPanelDetails>
                        <CatalogueListContent
                            department={department}
                            tab={tab}
                            catalogueListTitle={title}
                            items={items}
                            columnIndex={columnIndex}
                        />
                    </AccordionPanelDetails>
                </AccordionPanel>
            ) : (
                <CatalogueListContent
                    department={department}
                    tab={tab}
                    catalogueListTitle={title}
                    items={items}
                    columnIndex={columnIndex}
                />
            )}
        </>
    )
}

type BigScreenProps = {
    items: Link[]
    title: string | null
    catalogueMarketingStyles: CatalogueMarketingStyles
    department: string
    tab: string | null
    columnIndex: number
    catalogueIndex: number
}
export const BigScreen = ({
    title,
    catalogueMarketingStyles,
    items,
    department,
    tab,
    columnIndex,
    catalogueIndex,
}: BigScreenProps) => {
    return (
        <>
            {title && (
                <CatalogueListTitle
                    catalogueMarketingStyles={catalogueMarketingStyles}
                    title={title}
                    icon={null}
                    isIconEnabled={false}
                    isFirstElement={catalogueIndex === 0}
                />
            )}
            <CatalogueListContent
                department={department}
                tab={tab}
                catalogueListTitle={title}
                items={items}
                columnIndex={columnIndex}
            />
        </>
    )
}

type CatalogueListProps = Category & {
    opened?: boolean
    isImagePlaceholderEnabled: boolean
    setOpened: (title: string | null) => void
    department: string
    tab: string | null
    text: any
    columnIndex: number
    catalogueIndex: number
}

export const CatalogueList = ({
    icon,
    items,
    title,
    linkColour,
    fontFamily,
    fontWeight,
    opened = false,
    setOpened,
    department,
    tab,
    isImagePlaceholderEnabled,
    text,
    columnIndex,
    catalogueIndex,
}: CatalogueListProps) => {
    const props = {
        catalogueMarketingStyles: {
            linkColour,
            fontFamily,
            fontWeight,
        },
        icon,
        items,
        title,
        department,
        tab,
        isImagePlaceholderEnabled,
        columnIndex,
        catalogueIndex,
    }
    const smallScreenProps = {...props, text}

    return (
        <Container>
            <Hidden lgUp implementation="js">
                <SmallScreen {...smallScreenProps} opened={opened} setOpened={setOpened} />
            </Hidden>

            <Hidden mdDown implementation="js">
                <BigScreen {...props} />
            </Hidden>
        </Container>
    )
}

export default connect(CatalogueList)
