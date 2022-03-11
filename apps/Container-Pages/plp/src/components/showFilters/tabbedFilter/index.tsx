import React, {FC, useCallback, useEffect, useRef, useState} from "react"
import {Variant} from "@mui/material/styles/createTypography"

import connect from "./connect"
import {
    LoadingSpinner,
    StyledFacetButton,
    Text,
    TextWrapper,
    Tick,
    TickLine1,
    TickLine2,
    SpinnerWrapper,
} from "../components"
import {FacetState} from "../../../models/FacetsState"
import {DEFAULT_FILTER_SPINNER_TIMEOUT} from "../../../config/constants"

interface Props {
    filterState: FacetState
    onFilterSelect: () => void
    filterName: string
    isTabbedFilter?: boolean
    facetName?: string
    tabAutoFocus: boolean
}

export const TabbedFilterRenderer = (props: Props) => {
    if (!props.filterState) {
        return <></>
    }

    return <TabbedFilter {...props} />
}

export const TabbedFilter: FC<Props> = ({
    filterState: {n, c, s, v, d},
    onFilterSelect,
    isTabbedFilter,
    tabAutoFocus,
}: Props) => {
    const isUnMountedRef = useRef(false)
    const [showLoading, setShowLoading] = useState(false)
    const variant: Variant = s ? "h5" : "body1"
    // don't animate ticks on page load
    const animate = useRef(false)
    const previousSelected = useRef(s)

    const classNames = showLoading ? "loading" : ""

    useEffect(() => {
        if (showLoading) {
            if (s !== previousSelected.current) {
                setShowLoading(false)
            }

            setTimeout(() => {
                if (isUnMountedRef.current) return
                setShowLoading(false)
            }, DEFAULT_FILTER_SPINNER_TIMEOUT)
        }

        previousSelected.current = s
        return () => {
            isUnMountedRef.current = true
        }
    }, [showLoading, s])

    const onClick = useCallback(() => {
        setShowLoading(true)
        animate.current = true
        onFilterSelect()
    }, [onFilterSelect])

    return (
        <StyledFacetButton
            onClick={onClick}
            data-testid={`plp-tabbed-${isTabbedFilter ? "facet" : "key-filter"}-button-${v}`}
            disabled={d}
            autoFocus={tabAutoFocus}
        >
            <TextWrapper noBorder isKeyFilter={!isTabbedFilter}>
                <Text variant={variant} disabled={d}>
                    {n} <span>({c})</span>
                </Text>
                <SpinnerWrapper>
                    <LoadingSpinner className={classNames} data-testid="plp-tabbed-filter-spinner">
                        {s && !showLoading && (
                            <Tick data-testid="plp-tabbed-filter-tick">
                                <TickLine1 animate={animate.current} />
                                <TickLine2 animate={animate.current} />
                            </Tick>
                        )}
                    </LoadingSpinner>
                </SpinnerWrapper>
            </TextWrapper>
        </StyledFacetButton>
    )
}

export default connect(TabbedFilterRenderer)
