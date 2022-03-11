import React from "react"
import CatalogueList from "../CatalogueList"
import {Container, Column, Hr} from "./component"
import {Column as ColumnModel} from "../../models/secondary-nav"

export type CatalogueProps = {
    columns: ColumnModel[]
    department: string
    tab: string | null
    hasMissions: boolean
}

export const Catalogue = ({columns, department, tab, hasMissions}: CatalogueProps) => {
    const lastColumnIndex = columns.length - 1
    return (
        <Container data-testid="catalogue" id="catalogue" hasMissions={hasMissions}>
            {columns.map(({items, title}, columnIndex) => {
                const lastCatalogueIndex = items.length - 1
                const isLastColumnIndex = columnIndex >= lastColumnIndex
                const columnKey = `${title}-${columnIndex}`
                return (
                    <Column key={columnKey} numberofcolumns={columns.length}>
                        {items.map(
                            (
                                {title: itemTitle, items: listItems, linkColour, fontFamily, fontWeight, icon},
                                catalogueIndex,
                            ) => {
                                const key = `${itemTitle}-${catalogueIndex}`
                                const isLastCatalogueIndex = catalogueIndex >= lastCatalogueIndex
                                const showHr = !(isLastCatalogueIndex && isLastColumnIndex)
                                const props = {
                                    icon,
                                    linkColour,
                                    fontFamily,
                                    fontWeight,
                                    title: itemTitle,
                                    items: listItems,
                                    department,
                                    tab,
                                    columnIndex,
                                    catalogueIndex,
                                }

                                return (
                                    <React.Fragment key={key}>
                                        <CatalogueList {...props} />
                                        {title && showHr && <Hr />}
                                    </React.Fragment>
                                )
                            },
                        )}
                    </Column>
                )
            })}
        </Container>
    )
}

export default Catalogue
