import React from "react"
import Products from "../../components/products"
import PlpContainer from "../../components/container"
import FiltersComponent from "../../components/filters"
import NoResults from "../../components/noResults"
import MobileHeader from "../../components/mobileHeader"
import ResultsGrid from "../../components/resultsGrid"
import Connect from "./connect"
import ViewAllModal from "../../components/viewAllModal"
import CategoryQuickLinks from "../../components/categoryQuickLinks"
import {CategoryQuickLinksContainer, NoResultsContainer} from "./components"
import {useSetBreakpoint} from "../../hooks/useSetBreakpoint"

interface PlpProps {
    noResults: boolean
}

export const Plp = ({noResults}: PlpProps) => {
    useSetBreakpoint()

    return (
        <PlpContainer>
            {noResults ? (
                <>
                    <NoResultsContainer>
                        <NoResults />
                    </NoResultsContainer>
                    <CategoryQuickLinksContainer>
                        <CategoryQuickLinks />
                    </CategoryQuickLinksContainer>
                </>
            ) : (
                <>
                    <MobileHeader />
                    <ResultsGrid container>
                        <FiltersComponent />
                        <Products />
                    </ResultsGrid>
                    <ViewAllModal />
                </>
            )}
        </PlpContainer>
    )
}

export default Connect(Plp)
