import React, {useEffect} from "react"
import {CTA} from "@monorepo/cta"
import {Drawer} from "@monorepo/drawer"
import {formatTextTestIds} from "@monorepo/utils"
import {useMediaQuery, Typography, useScrollTrigger} from "@mui/material"
import {
    useCountrySelectorOpenObservable,
    useModalsCloseObservable,
    useCountrySelectorRedirectToAlternativeLanguageObservable,
} from "@monorepo/eventservice"
import {Language} from "./models/countryselector"
import text from "./config/text"
import {
    Anchor,
    COUNTRY_SELECTOR_DRAWER_BREAKPOINT,
    COUNTRY_LANG_SELECTOR_DATA_GA,
    CHEVRON_ICON_URL,
} from "./config/constants"
import {
    Title,
    Wrapper,
    Container,
    CountryFlagImg,
    ROWLink,
    StayText,
    StyledIcon,
    CloseButton,
    CountrySelectorROW,
    CountrySelectorContainer,
    CountrySelectorCTAWrapper,
    CountrySelectorBottomText,
    CountrySelectorContainerHeader,
    CountrySelectorContainerElement,
    CountrySelectorContainerLanguage,
    CountrySelectorContainerLanguageButtons,
    StayButton,
} from "./components"
import CountrySelectDropdown from "./dropdown"
import {CountrySelectorInternalProps} from "./props"
import connect from "./connect"

const {headerTitle, locationText, languageText, closeText, stayText, shopNowText, ROWText, ROWLinkText} = text

const App = ({
    territory,
    flagIconUrl,
    textAlignment,
    showOverlay,
    isInternationalCountry,
    selectedLanguage,
    selectedCountry,
    shopNowOnClick,
    openDrawer,
    closePanel,
    selectLanguage,
    selectDefaultCountry,
    getCountriesListThunk,
    loaded,
    ROWLinkUrl,
    redirectPageToAlternativeLanguage,
    cdnBaseUrl,
    showCountrySelector,
}: CountrySelectorInternalProps) => {
    const trigger = useScrollTrigger({
        threshold: 0,
    })
    const openingFromBottom = !useMediaQuery(`(min-width:${COUNTRY_SELECTOR_DRAWER_BREAKPOINT})`)
    const hideBackdrop = !showOverlay && openingFromBottom

    const chevronIcon = `${cdnBaseUrl}${CHEVRON_ICON_URL}`

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
    }, [trigger])

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

    const getAnchorDirection = (): Anchor => {
        return openingFromBottom ? "bottom" : "right"
    }

    return (
        <Wrapper className="countrylangselector" data-testid={formatTextTestIds("header-country-lang-selector")}>
            <Container onClick={() => openDrawer(true)}>
                <CountryFlagImg
                    alt={territory}
                    src={flagIconUrl}
                    data-testid={formatTextTestIds("header-country-lang-flag")}
                />
            </Container>
            <Drawer
                data-testid="country-selector-drawer"
                anchor={getAnchorDirection()}
                open={showCountrySelector}
                onClose={closePanel}
                ModalProps={modalProps}
                style={{position: hideBackdrop ? "initial" : "fixed"}}
            >
                <CountrySelectorContainer>
                    <CountrySelectorContainerHeader>
                        <Title variant="h4">{headerTitle}</Title>
                        <CloseButton disableRipple data-testid="country-selector-close-button" onClick={closePanel}>
                            {closeText}
                        </CloseButton>
                    </CountrySelectorContainerHeader>
                    <CountrySelectorContainerElement>
                        <Typography>{locationText}</Typography>
                        <CountrySelectDropdown
                            territory={territory}
                            textAlignment={textAlignment}
                            cdnBaseUrl={cdnBaseUrl}
                            chevronIcon={chevronIcon}
                        />
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
                            {selectedCountry?.languages.map((lan: Language, i) => (
                                <CountrySelectorContainerLanguageButtons
                                    key={lan.id}
                                    selected={selectedLanguage === lan.name}
                                    onClick={() => selectLanguage(lan.name)}
                                    data-testid={`country-selector-language-button-${i}`}
                                    data-ga-v1={COUNTRY_LANG_SELECTOR_DATA_GA}
                                    data-ga-v2={selectedCountry.name}
                                    data-ga-v3={lan.name}
                                >
                                    {lan.name}
                                </CountrySelectorContainerLanguageButtons>
                            ))}
                        </CountrySelectorContainerLanguage>
                    </CountrySelectorContainerElement>
                    <CountrySelectorCTAWrapper>
                        <CTA
                            text={shopNowText}
                            themeType="Primary"
                            enable
                            onClick={shopNowOnClick}
                            testId="country-selector-CTA-button"
                        />
                    </CountrySelectorCTAWrapper>
                    {!openingFromBottom && !isInternationalCountry && (
                        <CountrySelectorBottomText>
                            <StayButton onClick={closePanel} data-testid="country-selector-stay-text">
                                <StayText>{stayText}</StayText>
                                <StyledIcon textAlignment={textAlignment} src={chevronIcon} />
                            </StayButton>
                        </CountrySelectorBottomText>
                    )}
                </CountrySelectorContainer>
            </Drawer>
        </Wrapper>
    )
}

export default connect(App)
