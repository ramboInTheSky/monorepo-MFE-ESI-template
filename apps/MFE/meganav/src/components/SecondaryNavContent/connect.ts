import {connect} from "react-redux"
import State from "ducks/state"
import {setActiveTab} from "../../ducks/tabs-activity"
import {setIsInSecondaryMeganav} from "../../ducks/secondary-nav"
import {filterByExcludeFrom, filterColumnsByExcludeFrom} from "../../utils/excludeFrom"
import {setNextPrimaryNavIndex, setPreviousPrimaryNavIndex} from "../../ducks/primary-nav"

export const mapStateToProps = (state: State, {showAsDrawer}: {showAsDrawer: boolean}) => {
    const defaultfirstTabIndex = 0
    const {activeDepartment, isInPrimaryNav, activeDepartmentIndex} = state.primarynav
    const {catalogues, isPending} = state.secondarynav
    const activeTabIndex = !showAsDrawer
        ? defaultfirstTabIndex
        : state.tabsActivity[activeDepartment] || defaultfirstTabIndex

    const {items: tabs, banner} = (catalogues && catalogues[activeDepartment]) || {
        items: [],
        banner: null,
    }

    const filteredExcludedTabs = tabs.filter(filterByExcludeFrom(showAsDrawer))
    const tabIds: string[] = filteredExcludedTabs.filter(item => item.title).map(item => item.title.toLowerCase())

    const activeTab = filteredExcludedTabs[activeTabIndex]

    const missions =
        activeTab && activeTab.missions
            ? {...activeTab.missions, items: activeTab.missions.items.filter(filterByExcludeFrom(showAsDrawer))}
            : null

    const hasMissions =
        (missions && Object.keys(missions).length > 0 && filterByExcludeFrom(showAsDrawer)(missions)) || false

    const hasTabs: boolean = tabIds.length > 1
    const hasBanner = (banner && Object.keys(banner).length > 0) || false
    const columns = (activeTab && filterColumnsByExcludeFrom(showAsDrawer, activeTab.items)) || []
    const tab = (hasTabs && tabIds[activeTabIndex]) || null

    return {
        hasMissions,
        hasBanner,
        hasTabs,
        tabIds,
        activeTabIndex,
        activeDepartmentIndex,
        columns,
        department: activeDepartment,
        tab,
        isPending,
        isInPrimaryNav,
        missions,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        setTabIndex: (tabIndex: number): void => {
            dispatch(setActiveTab(tabIndex))
        },
        setIsInSecondaryMeganavTrue: () => {
            dispatch(setIsInSecondaryMeganav(true))
        },
        setIsInSecondaryMeganavFalse: () => {
            dispatch(setIsInSecondaryMeganav(false))
        },
        setNextPrimaryNav: () => {
            dispatch(setNextPrimaryNavIndex())
        },
        setPreviousPrimaryNav: () => {
            dispatch(setPreviousPrimaryNavIndex())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
