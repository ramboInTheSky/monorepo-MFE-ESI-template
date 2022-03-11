export const UP = "UP" as const
export const DOWN = "DOWN" as const

export type ScrollDirection = typeof UP | typeof DOWN | null
