export const DESKTOP_VIEWPORT_SIZE = "desktop" as const
export const TABLET_VIEWPORT_SIZE = "tablet" as const
export const MOBILE_VIEWPORT_SIZE = "mobile" as const

export type ViewportSizes = typeof DESKTOP_VIEWPORT_SIZE | typeof TABLET_VIEWPORT_SIZE | typeof MOBILE_VIEWPORT_SIZE

export const deviceBreakpoints = {
    desktop: "lg",
    tablet: "md",
    mobile: "sm",
} as const

export const breakpointToViewportSizes = {
    xs: MOBILE_VIEWPORT_SIZE,
    sm: MOBILE_VIEWPORT_SIZE,
    md: TABLET_VIEWPORT_SIZE,
    lg: DESKTOP_VIEWPORT_SIZE,
    xl: DESKTOP_VIEWPORT_SIZE,
}
