import React, {useRef} from "react"
import Hidden from "@mui/material/Hidden"
import FadeInAnimation from "../FadeInAnimation"
import {Container, CatalogueAndMissionsContainer, CatalogueContainer, MissionsContainer} from "./component"
import {screenIsBiggerOrEqualToLarge} from "../../utils/window"
import connect from "./connect"
import Catalogue from "../Catalogue"
import Tabs from "../Tabs"
import Banner from "../Banner"
import Missions from "../Missions"
import {PRIMARY_NAV_ITEM_HOVER_DELAY} from "../../config/constants"
import {Column, Mission as MissionModel} from "../../models/secondary-nav"
import useSetSecondaryNavFocus from "../../hooks/useSetSecondaryNavFocus"

export type SecondaryNavContentProps = {
    isPending: boolean
    hasTabs: boolean
    tabIds: string[]
    columns: Column[]
    department: string
    tab: string | null
    activeTabIndex: number
    activeDepartmentIndex: number
    setTabIndex: (tabIndex: number) => void
    setIsInSecondaryMeganavTrue: () => void
    setIsInSecondaryMeganavFalse: () => void
    setNextPrimaryNav: () => void
    setPreviousPrimaryNav: () => void
    hasBanner: boolean
    hasMissions: boolean
    missions: MissionModel | null
    showAsDrawer: boolean
}

let timerId: any = 0

export const SecondaryNavContent = ({
    isPending,
    hasTabs,
    tabIds,
    columns,
    department,
    tab,
    setTabIndex,
    activeTabIndex,
    activeDepartmentIndex,
    setIsInSecondaryMeganavTrue,
    setIsInSecondaryMeganavFalse,
    setNextPrimaryNav,
    setPreviousPrimaryNav,
    hasBanner,
    hasMissions,
    missions,
}: SecondaryNavContentProps) => {
    const ref = useRef<null | HTMLDivElement>(null)

    useSetSecondaryNavFocus(isPending, activeDepartmentIndex, ref, setPreviousPrimaryNav, setNextPrimaryNav)

    const handleMouseLeave = (): void => {
        if (screenIsBiggerOrEqualToLarge()) {
            clearTimeout(timerId)
            timerId = setTimeout(() => setIsInSecondaryMeganavFalse(), PRIMARY_NAV_ITEM_HOVER_DELAY)
        }
    }

    return (
        <Container
            id="sec-nav-content"
            onMouseEnter={setIsInSecondaryMeganavTrue}
            data-testid="sec-nav-content"
            onMouseLeave={handleMouseLeave}
            ref={ref}
            aria-labelledby={`meganav-link-${activeDepartmentIndex}`}
        >
            <FadeInAnimation show={!isPending && activeTabIndex !== -1} timeout={350}>
                {!isPending && (
                    <>
                        {hasBanner && <Banner />}
                        <Hidden mdDown implementation="js">
                            <>
                                {hasTabs && (
                                    <Tabs activeIndex={activeTabIndex} items={tabIds} handleTabClick={setTabIndex} />
                                )}
                            </>
                        </Hidden>
                        <CatalogueAndMissionsContainer>
                            <CatalogueContainer hasMissions={hasMissions} hasBanner={hasBanner}>
                                <Catalogue
                                    department={department}
                                    tab={tab}
                                    columns={columns}
                                    hasMissions={hasMissions}
                                />
                            </CatalogueContainer>
                            {hasMissions && (
                                <MissionsContainer>
                                    <Missions department={department} data={missions} />
                                </MissionsContainer>
                            )}
                        </CatalogueAndMissionsContainer>
                    </>
                )}
            </FadeInAnimation>
        </Container>
    )
}

export default connect(SecondaryNavContent)
