export const getElementInnerDimensions = (node: Element) => {
    const computedStyle = getComputedStyle(node)

    let width = node.clientWidth
    let height = node.clientHeight

    height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)
    return {height, width}
}
