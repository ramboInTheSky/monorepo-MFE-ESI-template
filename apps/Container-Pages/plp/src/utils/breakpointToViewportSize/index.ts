import {breakpointToViewportSizes} from "../../models/ViewportSize"

const breakpointToViewportSize = (breakpoint: string) => breakpointToViewportSizes[breakpoint]

export default breakpointToViewportSize
