import React, {Fragment} from "react"

import Grid from "@mui/material/Grid"
import {formatTextTestIds} from "@monorepo/utils"
import Typography from "@mui/material/Typography"
import {targetWindow} from "../../../utils/targetWindow"
import {SubRegionElementModel} from "../../../models/footerModel"
import noTranslationText from "../../../utils/noTranslationText"
import configUrlPath from "../../../utils/configUrlPath"
import connect from "./connect"
import {CountrySelectorLanguageLink, CountrySelectorLanguageList, setLanguagesInElements} from "./components"

interface CountrySelectorProps {
    siteUrl: string
    elements: SubRegionElementModel[]
}

const UNITED_KINGDOM_LANGUAGE = "EN"

export const CountrySelector = (props: CountrySelectorProps) => {
    const {siteUrl} = props
    const countrySelectorElements = setLanguagesInElements(props.elements)

    return (
        <>
            {countrySelectorElements.map(element => {
                const {text, type, languages} = element
                if (!languages) {
                    return
                }
                return (
                    <CountrySelectorLanguageList key={`${text}-${type}`}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography
                                    variant="h5"
                                    data-testid={formatTextTestIds(`footer-main-links-country-selector-title-${text}`)}
                                >
                                    {text}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {languages.map((language, key: string) => {
                                    return (
                                        <Fragment key={`${language.type}-${language.text}`}>
                                            <CountrySelectorLanguageLink
                                                data-testid={formatTextTestIds(
                                                    `footer-main-links-country-selector-${text}-${language.text}`,
                                                )}
                                                href={configUrlPath(language.url, siteUrl)}
                                                target={targetWindow(language.openInNewWindow)}
                                                aria-label={language.accessibilityText}
                                            >
                                                {UNITED_KINGDOM_LANGUAGE === language.text ? (
                                                    // eslint-disable-next-line react/no-danger
                                                    <span dangerouslySetInnerHTML={noTranslationText(language.text)} />
                                                ) : (
                                                    language.text
                                                )}
                                            </CountrySelectorLanguageLink>
                                            {languages.length !== key + 1 && <span>|</span>}
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </CountrySelectorLanguageList>
                )
            })}
        </>
    )
}

export default connect(CountrySelector)
