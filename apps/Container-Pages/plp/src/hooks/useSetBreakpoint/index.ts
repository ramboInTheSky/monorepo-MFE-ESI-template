import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {useMediaQuery} from "@mui/material"
import {breakpoints} from "@monorepo/themes"
import {setCurrentBreakpointAction} from "../../ducks/search"

export const useSetBreakpoint = () => {
    const dispatch = useDispatch()
    const isXs = useMediaQuery(`(min-width: ${breakpoints.values.xs}px)`)
    const isSm = useMediaQuery(`(min-width: ${breakpoints.values.sm}px)`)
    const isMd = useMediaQuery(`(min-width: ${breakpoints.values.md}px)`)
    const isLg = useMediaQuery(`(min-width: ${breakpoints.values.lg}px)`)
    const isXl = useMediaQuery(`(min-width: ${breakpoints.values.xl}px)`)

    useEffect(() => {
        if (isXl) dispatch(setCurrentBreakpointAction("xl"))
        else if (isLg) dispatch(setCurrentBreakpointAction("lg"))
        else if (isMd) dispatch(setCurrentBreakpointAction("md"))
        else if (isSm) dispatch(setCurrentBreakpointAction("sm"))
        else if (isXs) dispatch(setCurrentBreakpointAction("xs"))
    })
}
