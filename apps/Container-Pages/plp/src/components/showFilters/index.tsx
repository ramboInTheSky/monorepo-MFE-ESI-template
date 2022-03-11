import React, {FC, useCallback, useContext, useEffect} from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import {breakpoints} from "@monorepo/themes"
import {ThemeContext} from "styled-components"

import { TextModel } from "models/Text"
import connect from "./connect"
import {
    ShowFiltersContainer,
    StyledButton,
    DrawerContainer,
    Title,
    CloseButton,
    FiltersContainerHeader,
    FiltersContainerFooter,
    FiltersBodyContainer,
    CenteredFlexContainer,
    CloseIcon,
    CloseIconButton,
    DrawerContent,
    FiltersContainer,
    EmptyFlexContainer,
    TabbedFacetsContainer,
} from "./components"
import TabbedFacet from "./tabbedFacet"
import TabbedFeatFacet from "./tabbedFeatFacet"
import TabbedFiltersPanel from "./tabbedFiltersPanel"
import TabbedFilterViewResults from "./tabbedFilterViewResults"
import TrackMobileFiltersOpen from "../../events/trackEvent/events/trackMobileFiltersOpen"
import TrackMobileFiltersClosed from "../../events/trackEvent/events/trackMobileFiltersClosed"
import {FilterFacet, Filters} from "../../models/Filter"

import env from "../../config/env"

interface Prop {
    filters: Filters
    filtersSort: string[]
    isAnyFilterSelected: boolean
    clearAll: () => void
    syncTabbedFilters: (isOpen: boolean) => void
    closeTabbedFilters: (isOpen: boolean) => void
    isOpen: boolean
    hasSelectedFacet: boolean
    text: TextModel
}

const CLOSE_WHITE = "close-white.svg"
const CLOSE_BLACK = "close-black.svg"

export const ShowFilters: FC<Prop> = ({
    filters,
    filtersSort,
    isAnyFilterSelected,
    clearAll,
    syncTabbedFilters,
    closeTabbedFilters,
    isOpen,
    hasSelectedFacet,
    text
}) => {
    const theme = useContext(ThemeContext)
    const isInPageFiltersBreakpoint = useMediaQuery(
        `(min-width:${breakpoints.values[theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px)`,
    )
    const isMdScreenBreakpoint = useMediaQuery(`(min-width:${breakpoints.values.md}px)`)

    const openFiltersPanel = useCallback(() => {
        TrackMobileFiltersOpen()
        syncTabbedFilters(true)
    }, [syncTabbedFilters])

    const closeFiltersPanel = useCallback(() => {
        TrackMobileFiltersClosed()
        closeTabbedFilters(false)
    }, [closeTabbedFilters])

    useEffect(() => {
        if (isOpen && isInPageFiltersBreakpoint) {
            closeFiltersPanel()
        }
    }, [closeFiltersPanel, isOpen, isInPageFiltersBreakpoint])

    const modalProps = {
        keepMounted: false,
        hideBackdrop: !isMdScreenBreakpoint,
    }

    const icon = isMdScreenBreakpoint ? CLOSE_WHITE : CLOSE_BLACK

    return (
        <ShowFiltersContainer>
            <StyledButton data-testid="plp-filters-menu-btn" onClick={openFiltersPanel}>
                {text.labels.filterMenu}
            </StyledButton>
            <DrawerContainer
                className="platform_modernisation_plp"
                anchor="right"
                BackdropProps={{className: "plp-filters-drawer-back-drop"}}
                open={isOpen}
                onClose={closeFiltersPanel}
                ModalProps={modalProps}
            >
                <DrawerContent data-testid="plp-filters-drawer-content" isFullWidthMode={!isMdScreenBreakpoint}>
                    <FiltersContainerHeader>
                        <CenteredFlexContainer>
                            <CloseIconButton
                                data-testid="plp-filters-close-button"
                                isFullWidthMode={!isMdScreenBreakpoint}
                                onClick={closeFiltersPanel}
                            >
                                <CloseIcon
                                    isFullWidthMode={!isMdScreenBreakpoint}
                                    src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/${icon}`}
                                    alt={text.assetsAlt.closeIcon}
                                />
                            </CloseIconButton>
                            <Title variant="h4">{text.labels.filtersMobileTitle}</Title>
                        </CenteredFlexContainer>
                        <CloseButton
                            disableRipple
                            data-testid="plp-filters-close-text-cta"
                            onClick={isAnyFilterSelected ? clearAll : closeFiltersPanel}
                        >
                            {isAnyFilterSelected ? text.buttons.clearAll : text.buttons.close}
                        </CloseButton>
                    </FiltersContainerHeader>
                    <FiltersBodyContainer data-testid="plp-filters-body-container">
                        <TabbedFacetsContainer hasSelectedFacet={hasSelectedFacet}>
                            <FiltersContainer>
                                {filtersSort.map((name, index) => {
                                    if (filters[name]) {
                                        const {displayName} = filters[name]
                                        const {type} = filters[name]
                                        if (type === "feat") {
                                            return (
                                                <TabbedFeatFacet
                                                    key={name}
                                                    filters={(filters[name] as FilterFacet).facets}
                                                />
                                            )
                                        }
                                        return (
                                            <TabbedFacet
                                                key={name}
                                                facetName={name}
                                                facetDisplayName={displayName}
                                                isFirstFacet={index === 1}
                                            />
                                        )
                                    }
                                    return <></>
                                })}
                            </FiltersContainer>
                            {hasSelectedFacet && <EmptyFlexContainer />}
                        </TabbedFacetsContainer>
                        <TabbedFiltersPanel />
                    </FiltersBodyContainer>
                    <FiltersContainerFooter isFullWidthMode={!isMdScreenBreakpoint}>
                        <TabbedFilterViewResults />
                    </FiltersContainerFooter>
                </DrawerContent>
            </DrawerContainer>
        </ShowFiltersContainer>
    )
}

export default connect(ShowFilters)
