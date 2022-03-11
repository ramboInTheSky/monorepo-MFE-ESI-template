import {connect} from "react-redux"
import {screenIsSmallerThanLarge} from "../../utils/window"
import {State} from "../../ducks"

import {setPrimaryNavIndex, setIsInPrimaryNav} from "../../ducks/primary-nav"
import {getSecondaryNavDataThunk} from "../../ducks/secondary-nav"
import {ExcludeFrom} from "../../models/excludeFrom"
import {excludeFromAccordion, excludeFromDrawer} from "../../utils/excludeFrom"

const classNames = (
    firstItemAccordion: boolean,
    firstItemDrawer: boolean,
    lastItemAccordion: boolean,
    lastItemDrawer: boolean,
    excludeFrom?: ExcludeFrom,
) => {
    let classes = ""

    classes += firstItemAccordion ? "first-child-accordion " : ""
    classes += firstItemDrawer ? "first-child-drawer " : ""
    classes += lastItemAccordion ? "last-child-accordion " : ""
    classes += lastItemDrawer ? "last-child-drawer " : ""

    if (!excludeFrom || excludeFrom.length <= 0) {
        return classes
    }

    classes += excludeFrom.some(excludeFromAccordion) ? "hiddenAccordion " : ""
    classes += excludeFrom.some(excludeFromDrawer) ? "hiddenDrawer " : ""
    return classes
}

export const mapStateToProps = (state: State) => {
    const {items, activeDepartmentIndex, isInPrimaryNav} = state.primarynav
    const dir = state.textAlignment

    if (!items || items.length === 0) {
        throw new Error("Meganav: there is no primary data for meganav")
    }

    const firstVisibleAccordionIndex = items.findIndex(
        item => !item.excludeFrom || !item.excludeFrom.some(excludeFromAccordion),
    )
    const firstVisibleDrawerIndex = items.findIndex(
        item => !item.excludeFrom || !item.excludeFrom.some(excludeFromDrawer),
    )

    const lastItems = items.slice().reverse()

    const lastVisibleAccordionIndex =
        items.length -
        1 -
        lastItems.findIndex(item => !item.excludeFrom || !item.excludeFrom.some(excludeFromAccordion))
    const lastVisibleDrawerIndex =
        items.length - 1 - lastItems.findIndex(item => !item.excludeFrom || !item.excludeFrom.some(excludeFromDrawer))

    const displayItems = items?.map((item, index) => {
        return {
            ...item,
            classNames: classNames(
                index === firstVisibleAccordionIndex,
                index === firstVisibleDrawerIndex,
                index === lastVisibleAccordionIndex,
                index === lastVisibleDrawerIndex,
                item.excludeFrom,
            ),
        }
    })

    return {dir, items: displayItems, activeDepartmentIndex, isInPrimaryNav}
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    setActiveItem: (index: number, item: {title: string; path: string}): void => {
        const isAlreadyActive = index >= 0
        const isNotTheSameIndex = state.activeDepartmentIndex !== index
        if ((isAlreadyActive && isNotTheSameIndex) || screenIsSmallerThanLarge()) {
            dispatch(setPrimaryNavIndex(index, item.title))
            if (index > -1) dispatch(getSecondaryNavDataThunk(item.path))
        }
    },
    setIsInPrimaryNav: value => {
        dispatch(setIsInPrimaryNav(value))
    },
})

export default connect(mapStateToProps, null as any, mergeProps)
