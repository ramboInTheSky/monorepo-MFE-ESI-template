import React from "react"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import {formatTextTestIds} from "@monorepo/utils"
import {DefaultColumns} from "../../models/regions"
import {RegionModel, SubRegionElementModel} from "../../models/footerModel"
import {targetWindow} from "../../utils/targetWindow"
import env from "../../config/env"
import {SocialTitle, SocialLinkIcon} from "./components"
import connect from "./connect"
import {formatCdnPathWithVariant} from "../../utils/getCdnUrl"

const {REACT_APP_BLOB_STORAGE_PATH} = env

interface SocialMediaProps {
    region: RegionModel
    realm: string
    variant: string
}

export const SocialMedia = (props: SocialMediaProps) => {
    const {realm, variant, region} = props
    const {subRegions, title} = region

    return (
        <Grid item container xs={DefaultColumns.xs} alignItems="center" justifyContent="center">
            <SocialTitle variant="h5">{title}</SocialTitle>
            {subRegions[0].elements.map((element: SubRegionElementModel) => {
                const {accessibilityText, url, openInNewWindow, icon} = element
                if (!url || !accessibilityText) return
                return (
                    <Link
                        aria-label={accessibilityText}
                        href={url}
                        target={targetWindow(openInNewWindow)}
                        key={element.name}
                        data-testid={formatTextTestIds(`footer-social-media-${element.name}`)}
                    >
                        <SocialLinkIcon
                            src={`${REACT_APP_BLOB_STORAGE_PATH}${formatCdnPathWithVariant(icon, realm, variant)}`}
                            aria-hidden="true"
                        />
                    </Link>
                )
            })}
        </Grid>
    )
}
export default connect(SocialMedia)
