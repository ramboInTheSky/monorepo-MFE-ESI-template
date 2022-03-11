import {SELECTED_DEPARTMENT_DETAILS} from "../../config/constants"

declare let document: any

export function isSelected(selectedDept: string, el: HTMLElement) {
    return selectedDept?.toLowerCase() === el.textContent?.toLowerCase()
}

export function calcScrollWidthAndScroll() {
    const primaryNavElements: any = []
    const snailTrailElement = document.getElementById("snail-trail-container")
    const el = document.getElementById("platform_modernisation_meganav")
    const childrenArray = snailTrailElement.children

    const DRAWER_GAP = 48
    const getSelectedDepartmentDetails = localStorage.getItem(SELECTED_DEPARTMENT_DETAILS)
    let selectedDept
    let selectedDeptIndex

    if (getSelectedDepartmentDetails) selectedDept = JSON.parse(getSelectedDepartmentDetails).dept.toLowerCase()

    for (let i = 0; i < childrenArray.length; i += 1) {
        const text = childrenArray[i].textContent
        const itemWidth = childrenArray[i].offsetWidth

        if (isSelected(selectedDept, childrenArray[i])) selectedDeptIndex = i

        primaryNavElements.push({
            text,
            itemWidth,
        })
    }

    let scrollAmount
    if (selectedDeptIndex >= 0) {
        // calculate total width of elements before the selected / active dept
        const previousElementsTotalWidth = primaryNavElements
            .slice(0, selectedDeptIndex)
            .reduce((a, b) => a + b.itemWidth, 0)
        scrollAmount = previousElementsTotalWidth
        // give enough area to prevent gray area cover the element
        // if it is not the last element subtract drawer gap
        if (selectedDeptIndex < primaryNavElements.length - 1) {
            scrollAmount = previousElementsTotalWidth - DRAWER_GAP
        }
        if (el?.dir === "rtl") scrollAmount *= -1
        snailTrailElement.scrollLeft = scrollAmount
        childrenArray[selectedDeptIndex].getElementsByTagName("div")[0].style.borderBottom = "0.0625rem solid white"
    }
    document.getElementById("meganav-entrypoint").style.setProperty("--display-primary-nav", "1")
}

export function initialiseCalc() {
    if (document.fonts !== undefined) {
        document.fonts.load('1rem "AzoSansRegular"').then(calcScrollWidthAndScroll).catch(calcScrollWidthAndScroll)
    } else {
        calcScrollWidthAndScroll()
    }
}

export const toString = () => {
    const init = {
        init: initialiseCalc.name,
    }
    return `
            ${calcScrollWidthAndScroll.toString()}
            ${initialiseCalc.toString()}
            ${isSelected.toString()}
            var initObj = ${JSON.stringify(init)};
            var fn = window[initObj.init];
            if (typeof fn === "function") fn();
`
}
