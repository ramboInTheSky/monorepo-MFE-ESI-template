import {useEffect, useRef} from "react"

function getKeyboardFocusableElements(element: null | HTMLDivElement) {
    if (!element) {
        return null
    }
    return element.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
    )
}

// Finds first and last focusable items in the secondary nav as it opens
// On tabbing the last item, it opens the next secondary nav

const useSetSecondaryNavFocus = (
    isPending: boolean,
    activeDepartmentIndex: number,
    secondaryNavContainerRef: React.MutableRefObject<HTMLDivElement | null>,
    setPreviousPrimaryNav: () => void,
    setNextPrimaryNav: () => void,
) => {
    const isReverseTabbingRef = useRef<boolean>(false)

    useEffect(() => {
        if (!isPending && activeDepartmentIndex !== -1) {
            setTimeout(() => {
                const focussableChildren = getKeyboardFocusableElements(secondaryNavContainerRef.current)
                if (focussableChildren && focussableChildren.length > 0) {
                    const firstChild = focussableChildren[0]
                    const lastChild = focussableChildren[focussableChildren.length - 1]
                    if (isReverseTabbingRef.current) {
                        lastChild.focus()
                    } else {
                        firstChild.focus()
                    }
                    firstChild.onkeydown = event => {
                        if (event.key === "Tab" && event.shiftKey) {
                            event.preventDefault()
                            isReverseTabbingRef.current = true
                            setPreviousPrimaryNav()
                        }
                    }

                    lastChild.onkeydown = event => {
                        if (event.key === "Tab" && !event.shiftKey) {
                            event.preventDefault()
                            isReverseTabbingRef.current = false
                            setNextPrimaryNav()
                        }
                    }
                }
            }, 0)
        }
    }, [activeDepartmentIndex, isPending, setNextPrimaryNav, setPreviousPrimaryNav])

    return {}
}

export default useSetSecondaryNavFocus
