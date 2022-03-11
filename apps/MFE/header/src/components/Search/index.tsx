import React from "react"
import {ClickAwayListener} from "@mui/base"
import Hidden from "@mui/material/Hidden"
import SearchBox from "../SearchBox"
import Drawer from "../Drawer"
import {AutoCompleteComponent, RecentSearchesComponent, ModalComponent} from "../../Features/SearchBar"
import connect from "./connect"
import {CloseButton, SearchArea, IconContainer, BigScreenContainer, Img} from "./component"
import {Anchor, SEARCH_DATA_GA, OPEN_SEARCH_DATA_GA, CLOSE_SEARCH_DATA_GA} from "../../config/constants"

type SmallScreensProps = {
    iconUrl: string
    close: () => void
    openDrawer: () => void
    showAutoComplete: boolean
    anchor: Anchor
    open: boolean
    text: any
}

const SmallScreens = ({anchor, iconUrl, open, close, openDrawer, showAutoComplete, text}: SmallScreensProps) => (
    <div data-testid="header-small-screen-search">
        <IconContainer
            role="link"
            onKeyDown={openDrawer}
            onClick={openDrawer}
            data-ga-v1={SEARCH_DATA_GA}
            data-ga-v2={OPEN_SEARCH_DATA_GA}
        >
            <Img src={iconUrl} alt="Search Icon" />
        </IconContainer>
        <Hidden mdUp implementation="js">
            <Drawer anchor={anchor} open={open} onClose={close} text={text.drawer}>
                <SearchArea>
                    <SearchBox placeholder={text.smallPlaceholder} labelId="header-small-screen-search-box" />
                    <CloseButton
                        disableRipple
                        data-testid="header-small-screen-search-close-button"
                        onClick={close}
                        data-ga-v1={SEARCH_DATA_GA}
                        data-ga-v2={CLOSE_SEARCH_DATA_GA}
                    >
                        {text.closeButton.text}
                    </CloseButton>
                </SearchArea>
                {showAutoComplete ? <AutoCompleteComponent /> : <RecentSearchesComponent />}
            </Drawer>
        </Hidden>
    </div>
)

type BigScreensProps = {
    open: boolean
    close: () => void
    showAutoComplete: boolean
    searchBarType: string
    bigPlaceholder: string
}

const BigScreens = ({open, close, showAutoComplete, searchBarType, bigPlaceholder}: BigScreensProps) => (
    <BigScreenContainer searchbartype={searchBarType} open={open} data-testid="header-big-screen-search">
        <SearchBox placeholder={bigPlaceholder} labelId="header-big-screen-search-box" />
        <Hidden smDown implementation="js">
            <ModalComponent open={open} handleClose={close}>
                {showAutoComplete ? <AutoCompleteComponent /> : <RecentSearchesComponent />}
            </ModalComponent>
        </Hidden>
    </BigScreenContainer>
)

export type SearchProps = {
    handleClose: () => void
    openDrawer: () => void
    showAutoComplete: boolean
    showRecentSearch: boolean
    iconUrl: string
    anchor: Anchor
    searchBarType: string
    checkRecentSearch: boolean
    text: any
}

export const Search = ({
    iconUrl,
    handleClose,
    openDrawer,
    showAutoComplete,
    showRecentSearch,
    anchor,
    searchBarType,
    checkRecentSearch,
    text,
}: SearchProps) => {
    const showDrawer: boolean = showAutoComplete || showRecentSearch
    const showPanelBigScreen = (showRecentSearch && checkRecentSearch) || showAutoComplete
    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div data-testid="header-adaptive-search" className="header-adaptive-search">
                <Hidden mdUp implementation="css">
                    <SmallScreens
                        iconUrl={iconUrl}
                        openDrawer={openDrawer}
                        open={showDrawer}
                        close={handleClose}
                        showAutoComplete={showAutoComplete}
                        anchor={anchor}
                        text={text}
                    />
                </Hidden>
                <Hidden smDown implementation="css">
                    <BigScreens
                        open={showPanelBigScreen}
                        close={handleClose}
                        showAutoComplete={showAutoComplete}
                        searchBarType={searchBarType}
                        bigPlaceholder={text.bigPlaceholder}
                    />
                </Hidden>
            </div>
        </ClickAwayListener>
    )
}

export default connect(Search)
