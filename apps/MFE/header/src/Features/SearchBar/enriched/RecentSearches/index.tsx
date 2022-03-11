import React from "react"
import Hidden from "@mui/material/Hidden"
import RecentSearches from "../../../../components/RecentSearches"
import {RecentSearchContent} from "./components"
import {
    HeaderContainer,
    HeaderWrapper,
    ClearButton,
    Title,
    GridContent,
    GridWrapper,
    ContentContainerStyled,
    TitleContainerStyled,
} from "../components"
import connect from "./connect"
import {
    SEARCH_DATA_GA,
    SEARCH_PREVIOUS_SEARCH_DATA_GA,
    SEARCH_CLEAR_PREVIOUS_SEARCH_DATA_GA,
} from "../../../../config/constants"

type HeaderProps = {
    clear: () => void
    text: any
}

const Header = ({clear, text}: HeaderProps) => {
    const {mobileHeader, desktopHeader} = text

    return (
        <HeaderContainer className="recents-header" data-testid="recents-header">
            <TitleContainerStyled maxWidth="xl">
                <HeaderWrapper>
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
                </HeaderWrapper>
            </TitleContainerStyled>
        </HeaderContainer>
    )
}
const Content = (props: RecentSearchesProps) => (
    <GridContent>
        <Header {...props} />
        <ContentContainerStyled maxWidth="xl">
            <GridWrapper>
                <RecentSearchContent data-testid="recents-body">
                    <RecentSearches />
                </RecentSearchContent>
            </GridWrapper>
        </ContentContainerStyled>
    </GridContent>
)

export type RecentSearchesProps = {
    clear: () => void
    text: any
}

export const EnrichRecentSearches = (props: RecentSearchesProps) => (
    <div data-testid="header-enrich-recent-searches">
        <Content {...props} />
    </div>
)

export default connect(EnrichRecentSearches)
