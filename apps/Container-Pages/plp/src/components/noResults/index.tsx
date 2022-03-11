import React from "react"
import {Typography} from "@mui/material"
import {formatTextTestIds} from "@monorepo/utils"
import Connect from "./connect"
import {Italic, List, ListItem} from "./components"

interface NoResultsProps {
    searchTerm: string | null
    text
}

export const NoResults = (props: NoResultsProps) => {
    const {text} = props
    return (
        <>
            <Typography variant="h3" gutterBottom data-testid={formatTextTestIds(`plp-no-results-header`)}>
                {text.pages.noResults.header} <Italic>&quot;{props.searchTerm}&quot;</Italic>
            </Typography>

            <Typography variant="h5" gutterBottom>
                {text.pages.noResults.subHeader}
            </Typography>

            <Typography variant="body1" gutterBottom component="span">
                <List>
                    <ListItem>{text.pages.noResults.body.item1}</ListItem>
                    <ListItem>{text.pages.noResults.body.item2}</ListItem>
                    <ListItem>{text.pages.noResults.body.item3}</ListItem>
                    <ListItem>{text.pages.noResults.body.item4}</ListItem>
                </List>
            </Typography>
        </>
    )
}

export default Connect(NoResults)
