import {screenIsBiggerOrEqualToLarge} from "../window"
import {CHEVRON_WIDTH, DRAWER_GAP} from "../../config/constants"

export const calcScrollOffset = (
    event: React.MouseEvent<EventTarget>,
    clickedElement: HTMLElement,
    snapPosition: number,
): number => {
    const {right: rightBorder, left: leftBorder, width: elementWidth} = clickedElement.getBoundingClientRect()
    const cursorPosition = event.clientX
    const drawerEnd = window.innerWidth - snapPosition - (screenIsBiggerOrEqualToLarge() ? DRAWER_GAP : 0)
    const cursorToRightBorderOffset = rightBorder - cursorPosition
    const cursorToDrawerEndOffset = cursorPosition - drawerEnd
    const linkSize = rightBorder - leftBorder
    const offset = cursorToDrawerEndOffset + cursorToRightBorderOffset + (event.type === "click" ? 0 : linkSize / 2)
    const drawerStart = CHEVRON_WIDTH
    if (rightBorder <= drawerEnd && Math.sign(offset) === 1) {
        return 0
    }
    if (
        leftBorder > drawerStart + (screenIsBiggerOrEqualToLarge() ? DRAWER_GAP + CHEVRON_WIDTH * 2 : 0) &&
        Math.sign(offset) === -1
    ) {
        return 0
    }
    if (Math.sign(offset) === -1) {
        return -elementWidth
    }
    return offset
}

export default calcScrollOffset
