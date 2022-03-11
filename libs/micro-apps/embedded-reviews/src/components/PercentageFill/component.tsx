import styled from "styled-components"
import {withStyles} from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const PercentageFillContainer = styled.div`
    flex-grow: 1;
`

// The fill and background colour will need to come from theme when we have a way of accessing themes. Comment to be removed when this is done.
export const BorderLinearProgress = withStyles(({
    root: {
      height: 12,
      borderRadius: 6,
    },
    colorPrimary: {
      backgroundColor: "#d1d1d1",
    },
    bar: {
      borderRadius: 6,
      backgroundColor: '#30a74b',
    },
}))(LinearProgress)