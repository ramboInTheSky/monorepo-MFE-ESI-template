import React, {useEffect} from "react"
import {CTA} from "@monorepo/cta"
import {formatTextTestIds} from "@monorepo/utils"
import {Typography, ClickAwayListener, useScrollTrigger, Hidden} from "@mui/material"
import {
    useCountrySelectorOpenObservable,
    useModalsCloseObservable,
    useCountrySelectorRedirectToAlternativeLanguageObservable,
} from "@monorepo/eventservice"
import connect from "./connect"
import {Anchor, CHEVRON_ICON_URL, COUNTRY_LANG_SELECTOR_DATA_GA} from "../../config/constants"
import {
    Title,
    Wrapper,
    ROWLink,
    StayText,
    Container,
    StyledIcon,
    CloseButton,
    CountryFlagImg,
    DrawerContainer,
    CountrySelectorROW,
    CountrySelectorContainer,
    CountrySelectorCTAWrapper,
    CountrySelectorBottomText,
    CountrySelectorContainerHeader,
    CountrySelectorContainerElement,
    CountrySelectorContainerLanguage,
    CountrySelectorContainerLanguageButtons,
    StayButton,
} from "./component"
import {Country as CountryType, CountryLanguage} from "../../models/countryselector"
import CountrySelectDropdown from "../CountrySelectDropdown"
import env from "../../config/env"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

const CHEVRON_ICON = `${env.REACT_APP_BLOB_STORAGE_PATH}${CHEVRON_ICON_URL}`

type CountryLangSelectorType = {
    territory: string
    textAlignment: string
    iconUrl: string
    isActive: boolean
    showOverlay: boolean
    showCountrySelector: boolean
    isInternationalCountry: boolean
    selectedLanguage: string
    selectedCountry: CountryType
    itemCount: number
    shopNowOnClick: (itemCount: number) => void
    openDrawer: (showOverlay?: boolean) => void
    closePanel: () => void
    deleteRecentQueries: () => void
    selectLanguage: (language: string) => void
    selectDefaultCountry: (countryCode: string) => void
    getCountriesListThunk: () => void
    loaded: boolean
    ROWLinkUrl: string
    redirectPageToAlternativeLanguage: () => void
    text: any
    hiddenProps?: any | {}
    openingFromBottom?: any
}

export const CountryLangSelector = ({
    territory,
    textAlignment,
    iconUrl,
    showCountrySelector,
    isActive,
    selectDefaultCountry,
    showOverlay,
    isInternationalCountry,
    selectedLanguage,
    selectedCountry,
    itemCount,
    shopNowOnClick,
    openDrawer,
    selectLanguage,
    closePanel,
    deleteRecentQueries,
    getCountriesListThunk,
    loaded,
    ROWLinkUrl,
    redirectPageToAlternativeLanguage,
    text,
    hiddenProps,
    openingFromBottom,
}: CountryLangSelectorType) => {
    const trigger = useScrollTrigger({
        threshold: 0,
    })
    const {headerTitle, locationText, languageText, closeText, stayText, shopNowText, ROWText, ROWLinkText} = text
    const hideBackdrop = !showOverlay && openingFromBottom

    const modalProps = {
        keepMounted: false,
        disablePortal: true,
        hideBackdrop,
        disableScrollLock: !openingFromBottom,
    }

    useEffect(() => {
        if (trigger && openingFromBottom) {
            closePanel()
        }
    }, [closePanel, openingFromBottom, trigger])

    useEffect(() => {
        if (showCountrySelector && !loaded) {
            getCountriesListThunk()
        }
    }, [showCountrySelector, loaded, getCountriesListThunk])

    useCountrySelectorOpenObservable(data => {
        selectDefaultCountry(data.isoCountryCode)
        openDrawer(false)
    })

    useCountrySelectorRedirectToAlternativeLanguageObservable(() => {
        redirectPageToAlternativeLanguage()
    })

    useModalsCloseObservable(closePanel)

    const onCTAClick = () => {
        removeFromLocalStorage()
        shopNowOnClick(itemCount)
        deleteRecentQueries()
    }

    const getAnchorDirection = (): Anchor => {
        return openingFromBottom ? "bottom" : "right"
    }
    if (!isActive) return null
    return (
        <Wrapper className="countrylangselector" data-testid={formatTextTestIds("header-country-lang-selector")}>
            <Hidden {...hiddenProps} implementation="css">
                <Container onClick={() => openDrawer(true)}>
                    <CountryFlagImg
                        alt={territory}
                        src={iconUrl}
                        data-testid={formatTextTestIds("header-country-lang-flag")}
                    />
                </Container>
                <DrawerContainer
                    data-testid={formatTextTestIds(`header-drawer-country-selector`)}
                    anchor={getAnchorDirection()}
                    open={showCountrySelector}
                    onClose={closePanel}
                    ModalProps={modalProps}
                    style={{position: hideBackdrop ? "initial" : "fixed"}}
                >
                    <ClickAwayListener onClickAway={closePanel}>
                        <CountrySelectorContainer>
                            <CountrySelectorContainerHeader>
                                <Title variant="h4">{headerTitle}</Title>
                                <CloseButton
                                    disableRipple
                                    data-testid="country-selector-close-button"
                                    onClick={closePanel}
                                >
                                    {closeText}
                                </CloseButton>
                            </CountrySelectorContainerHeader>
                            <CountrySelectorContainerElement>
                                <Typography>{locationText}</Typography>
                                <CountrySelectDropdown />
                            </CountrySelectorContainerElement>
                            <CountrySelectorROW>
                                <Typography>{ROWText}</Typography>
                                <ROWLink data-testid="country-selector-ROWLink" href={ROWLinkUrl}>
                                    {ROWLinkText}
                                </ROWLink>
                            </CountrySelectorROW>
                            <CountrySelectorContainerElement>
                                <Typography>{languageText}</Typography>
                                <CountrySelectorContainerLanguage>
                                    {/* eslint-disable-next-line react/display-name */}
                                    {selectedCountry?.Languages.map((lan: CountryLanguage, i) => (
                                        <CountrySelectorContainerLanguageButtons
                                            key={lan.AccountDomainUrl}
                                            selected={selectedLanguage === lan.Name}
                                            onClick={() => selectLanguage(lan.Name)}
                                            data-testid={`country-selector-language-button-${i}`}
                                            data-ga-v1={COUNTRY_LANG_SELECTOR_DATA_GA}
                                            data-ga-v2={selectedCountry.Country}
                                            data-ga-v3={lan.Value}
                                        >
                                            {lan.Value}
                                        </CountrySelectorContainerLanguageButtons>
                                    ))}
                                </CountrySelectorContainerLanguage>
                            </CountrySelectorContainerElement>
                            <CountrySelectorCTAWrapper>
                                <CTA
                                    text={shopNowText}
                                    themeType="Primary"
                                    enable
                                    onClick={onCTAClick}
                                    testId="country-selector-CTA-button"
                                />
                            </CountrySelectorCTAWrapper>
                            {!openingFromBottom && !isInternationalCountry && (
                                <CountrySelectorBottomText>
                                    <StayButton onClick={closePanel} data-testid="country-selector-stay-text">
                                        <StayText>{stayText}</StayText>
                                        <StyledIcon textAlignment={textAlignment} src={CHEVRON_ICON} />
                                    </StayButton>
                                </CountrySelectorBottomText>
                            )}
                        </CountrySelectorContainer>
                    </ClickAwayListener>
                </DrawerContainer>
            </Hidden>
        </Wrapper>
    )
}

export default connect(CountryLangSelector as any)
