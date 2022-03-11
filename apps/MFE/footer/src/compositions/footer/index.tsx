import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import DefaultCopyright from "../../components/Copyright/DefaultCopyright"
import RegionWrapper from "../../components/RegionWrapper"
import SocialMedia from "../../components/SocialMedia"
import QuickLinks from "../../components/QuickLinks"
import MainLinks from "../../components/MainLinks"
import Copyright from "../../components/Copyright"
import {FooterModel, RegionModel} from "../../models/footerModel"
import {SupportedRegionTypes} from "../../models/regions"
import connect from "./connect"

// TODO REMOVE THIS ONCE REAT-POLY IS ADDED TO PIPELINE
import "../../utils/arrayFindPolyfill"

const supportedRegionTypes = {
    [SupportedRegionTypes.SocialMedia]: SocialMedia,
    [SupportedRegionTypes.QuickLinks]: QuickLinks,
    [SupportedRegionTypes.MainLinks]: MainLinks,
    [SupportedRegionTypes.Copyright]: Copyright,
}

interface FooterProps {
    data: FooterModel
    textAlignment: string
    text: any
}

export const Footer: React.FC<FooterProps> & any = ({data, textAlignment, text}: FooterProps) => {
    return (
        <footer dir={textAlignment}>
            {data?.regions?.length ? (
                <div data-testid={formatTextTestIds(`footer-container`)}>
                    {data.regions.map((region: RegionModel) => {
                        const RegionComponent = supportedRegionTypes[region.type]
                        if (!RegionComponent) return
                        return (
                            <RegionWrapper regionType={region.type} key={region.type}>
                                <RegionComponent region={region} />
                            </RegionWrapper>
                        )
                    })}
                </div>
            ) : (
                <DefaultCopyright text={text} />
            )}
        </footer>
    )
}

export default connect(Footer)
