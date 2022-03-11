export const bagItemsWheelLock = (
    e: any,
    bagItemsContainerRef: React.MutableRefObject<HTMLDivElement | null>,
    bagItemsRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
    if (!e || e.type !== "wheel") return undefined

    const isBagItemsContainer = bagItemsContainerRef.current?.contains(e.target)
    const isBagItemsRef = bagItemsRef.current?.contains(e.target)
    const element = bagItemsRef.current

    if (!element || (!isBagItemsRef && isBagItemsContainer)) return e.preventDefault()

    const {deltaY} = e
    if (
        (element.scrollHeight - element.scrollTop === element.clientHeight && deltaY > 0) ||
        (element.scrollTop === 0 && deltaY < 0)
    )
        return e.preventDefault()
}

export const shoppingBagwheelLock = (
    e: any,
    bagContainerRef: React.MutableRefObject<HTMLDivElement | null>,
    bagItemsRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
    if (!e || e.type !== "wheel") return undefined

    const isBagContainerRef = bagContainerRef.current?.contains(e.target)
    const isBagItemsRef = bagItemsRef.current?.contains(e.target)

    if (isBagItemsRef) return undefined
    if (isBagContainerRef) e.preventDefault()
}
