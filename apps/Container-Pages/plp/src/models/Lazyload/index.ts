export const NEXT_PAGE = "next_page" as const
export const PREV_PAGE = "prev_page" as const
export const FILTERING = "filtering" as const
export const NO_LAZYLOAD = "no-lazyload" as const

export type LAZYLOADING_TYPE = typeof NEXT_PAGE | typeof PREV_PAGE | typeof FILTERING | typeof NO_LAZYLOAD
