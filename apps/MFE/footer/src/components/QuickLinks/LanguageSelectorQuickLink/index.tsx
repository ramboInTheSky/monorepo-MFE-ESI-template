import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {SubRegionElementModel} from "../../../models/footerModel"
import env from "../../../config/env"
import noTranslationText from "../../../utils/noTranslationText"
import getSwitchLanguageUrl from "../../../utils/getSwitchLanguageUrl"
import {formatCdnPathWithVariant} from "../../../utils/getCdnUrl"

import {
    LanguageSelectorWrapper,
    LanguageSelectorDescription,
    LanguageSelectorTitle,
    LanguageSelectorImg,
    LanguageSelectorElement,
    LanguageSelectorLink,
} from "./components"
import connect from "./connect"

const {REACT_APP_BLOB_STORAGE_PATH} = env

type QuickLinkProps = {
    data: SubRegionElementModel
    currentLanguageText: string
    altLangaugeName: string
    altLanguageUrl: string
    currentLanguageName: string
    siteUrl: string
    realm: string
    variant: string
}

export const LanguageSelectorQuickLink = (props: QuickLinkProps) => {
    const {text, icon, accessibilityText} = props.data

    const {currentLanguageText, altLangaugeName, altLanguageUrl, currentLanguageName, siteUrl, realm, variant} = props
    return (
        <LanguageSelectorWrapper
            data-testid={formatTextTestIds(`footer-quick-links-language-selector`)}
            aria-label={accessibilityText}
        >
            <LanguageSelectorElement>
                {icon && (
                    <LanguageSelectorImg
                        src={`${REACT_APP_BLOB_STORAGE_PATH}${formatCdnPathWithVariant(icon, realm, variant)}`}
                        aria-hidden="true"
                        alt={accessibilityText}
                    />
                )}
                <LanguageSelectorTitle data-testid={formatTextTestIds(`QuickLinkText`)} variant="h4">
                    {text}
                </LanguageSelectorTitle>
                <LanguageSelectorDescription variant="subtitle1">{currentLanguageText}</LanguageSelectorDescription>
            </LanguageSelectorElement>
            <LanguageSelectorElement>
                <span>{currentLanguageName}&nbsp;|&nbsp;</span>
                <LanguageSelectorLink
                    className="altLanguageLink"
                    href={getSwitchLanguageUrl(siteUrl, altLanguageUrl)}
                    data-testid={formatTextTestIds(`footer-quick-links-alt-language-link`)}
                >
                    <strong dangerouslySetInnerHTML={noTranslationText(altLangaugeName)} />
                </LanguageSelectorLink>
            </LanguageSelectorElement>
        </LanguageSelectorWrapper>
    )
}

export default connect(LanguageSelectorQuickLink) as any
