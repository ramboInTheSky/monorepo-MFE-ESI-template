import {useCallback, useState} from "react"
import TrackViewAllModalRemoveSelected from "../../events/trackEvent/events/viewAllModalRemoveSelected"

interface ActiveEventState {
    mouse?: boolean
    focus?: boolean
}

export const useRemoveFilterLabel = (selectFilter: (filter: string) => void) => {
    const [showRemoveLabel, setShowRemoveLabel] = useState<{[value: string]: ActiveEventState}>({})
    const setRemoveLabel = useCallback(
        (value: string, eventType: keyof ActiveEventState, show: boolean) => () =>
            setShowRemoveLabel(prev => ({
                ...prev,
                [value]: {
                    ...prev[value],
                    [eventType]: show,
                },
            })),
        [],
    )

    const clearRemoveLabel = useCallback(
        (value: string) => () => {
            selectFilter(value)
            TrackViewAllModalRemoveSelected(value)
            setShowRemoveLabel(prev => ({
                ...prev,
                [value]: {
                    mouse: false,
                    focus: false,
                },
            }))
        },
        [selectFilter],
    )

    return {showRemoveLabel, setRemoveLabel, clearRemoveLabel}
}
