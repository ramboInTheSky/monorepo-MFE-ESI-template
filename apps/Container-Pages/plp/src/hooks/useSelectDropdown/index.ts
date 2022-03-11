import {createStyles, makeStyles} from "@mui/styles"
import {useCallback, useEffect, useMemo, useState} from "react"

const makeOverrideTransitionStyle = makeStyles(
    () =>
        createStyles({
            paper: {
                transition: "none !important",
            },
        }),
    {name: "DisableTransition"},
)

export const useSelectDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [transitionEnabled, setTransitionEnabled] = useState(true)
    const overrideTransitionStyle = makeOverrideTransitionStyle()

    const {onScroll, closeDropdown} = useMemo(() => {
        const memoizedOnScroll = () => {
            setTransitionEnabled(false)
            closeDropdown()
        }
        const memoizedCloseDropdown = () => {
            setShowDropdown(false)
            document.removeEventListener("scroll", onScroll)
        }
        return {
            onScroll: memoizedOnScroll,
            closeDropdown: memoizedCloseDropdown,
        }
    }, [setTransitionEnabled, setShowDropdown])

    const openDropdown = useCallback(() => {
        setTransitionEnabled(true)
        setShowDropdown(true)
        document.addEventListener("scroll", onScroll)
    }, [setShowDropdown, onScroll])

    useEffect(() => {
        const handleResize = () => {
            setShowDropdown(false)
            setTransitionEnabled(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [closeDropdown])

    return {
        showDropdown,
        openDropdown,
        closeDropdown,
        menuStyle: transitionEnabled ? null : overrideTransitionStyle,
    }
}
