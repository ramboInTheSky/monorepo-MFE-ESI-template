import React from "react"
import Hidden from "@mui/material/Hidden"
import RecentSearches from "../../../../components/RecentSearches"
import {Container, Wrapper, HeaderContainer, ClearButton, Title} from "../components"
import connect from "./connect"
import {
    SEARCH_DATA_GA,
    SEARCH_CLEAR_PREVIOUS_SEARCH_DATA_GA,
    SEARCH_PREVIOUS_SEARCH_DATA_GA,
} from "../../../../config/constants"

type HeaderProps = {clear: () => void; text: any}
const Header = ({clear, text}: HeaderProps) => {
    const {mobileHeader, desktopHeader} = text

    return (
        <HeaderContainer className="recents-header" data-testid="recents-header">
            <Title variant="h4">
                <Hidden mdUp implementation="css">
                    {mobileHeader}
                </Hidden>
                <Hidden smDown implementation="css">
                    {desktopHeader}
                </Hidden>
            </Title>
            <ClearButton
                data-testid="header-recent-searches-clear-button"
                onClick={clear}
                data-ga-v1={SEARCH_DATA_GA}
                data-ga-v2={SEARCH_CLEAR_PREVIOUS_SEARCH_DATA_GA}
                data-ga-v3={SEARCH_PREVIOUS_SEARCH_DATA_GA}
            >
                Clear all
            </ClearButton>
        </HeaderContainer>
    )
}
const Content = () => (
    <Wrapper data-testid="recents-body">
        <RecentSearches />
    </Wrapper>
)

export type RecentSearchesProps = {
    clear: () => void
    text: any
}

export const SimpleRecentSearches = (props: RecentSearchesProps) => (
    <Container data-testid="header-simple-recent-searches">
        <Header {...props} />
        <Content />
    </Container>
)

export default connect(SimpleRecentSearches)
