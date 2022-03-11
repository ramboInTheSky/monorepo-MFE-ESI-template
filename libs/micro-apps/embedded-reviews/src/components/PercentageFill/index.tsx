import React from 'react'
import {PercentageFillContainer, BorderLinearProgress} from "./component"

interface PercentageFillProps {
    /**
     * This is the percentage that will be filled. Value between 0 and 100.
     */
     percentageValue: number
}

const PercentageFill = ({percentageValue} : PercentageFillProps) => {
    return (
        <PercentageFillContainer data-testid="review-percentage-fill">
            <BorderLinearProgress variant="determinate" value={percentageValue} />
        </PercentageFillContainer>
    )
}

export default PercentageFill