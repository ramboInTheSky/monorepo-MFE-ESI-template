import React from "react"
import Grid from "@mui/material/Grid"
import {Breakpoint} from "@mui/material"

import {formatTextTestIds} from "@monorepo/utils"
import Hidden from "@mui/material/Hidden"
import Accordion from "../Accordion"
import {DefaultColumns} from "../../models/regions"
import {RegionModel} from "../../models/footerModel"
import {DynamicColumnAdjustment} from "../../utils/dynamicColumnAdjustment"

import MainLinksList from "./MainLinksList"
import {SubRegionGrid, AccordionMainLinks, GridContainer, MainLinksHeader} from "./components"

interface MainLinksProps {
    region: RegionModel
    width: Breakpoint
}

const MainLinks = (props: MainLinksProps) => {
    const {subRegions} = props.region
    const getValidSubRegions = subRegions.filter(subRegion => subRegion.title)
    const MediumColumnWidth = DynamicColumnAdjustment(getValidSubRegions.length)
    return (
        <>
            <Hidden smDown implementation="css">
                <GridContainer item container xs={DefaultColumns.xs}>
                    {subRegions.map(subRegion => {
                        if (!subRegion.title) return

                        return (
                            <SubRegionGrid
                                key={subRegion.title}
                                item
                                xs={DefaultColumns.xs}
                                md={MediumColumnWidth}
                                lg={DefaultColumns.lg}
                            >
                                <MainLinksHeader
                                    variant="h4"
                                    data-testid={formatTextTestIds(`footer-main-links-title-${subRegion.title}`)}
                                >
                                    {subRegion.title}
                                </MainLinksHeader>
                                <MainLinksList elements={subRegion.elements} subRegionTitle={subRegion.title} />
                            </SubRegionGrid>
                        )
                    })}
                </GridContainer>
            </Hidden>
            <Hidden mdUp implementation="css">
                <AccordionMainLinks item container xs={DefaultColumns.xs}>
                    {subRegions.map(subRegion => {
                        if (!subRegion.title) return

                        return (
                            <Grid
                                key={subRegion.title}
                                item
                                xs={DefaultColumns.xs}
                                md={MediumColumnWidth}
                                lg={DefaultColumns.lg}
                            >
                                <Accordion title={subRegion.title}>
                                    <MainLinksList elements={subRegion.elements} subRegionTitle={subRegion.title} />
                                </Accordion>
                            </Grid>
                        )
                    })}
                </AccordionMainLinks>
            </Hidden>
        </>
    )
}

export default MainLinks as any
