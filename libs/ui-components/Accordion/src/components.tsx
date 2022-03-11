import { withStyles } from '@mui/styles';
import React from "react"
import styled from "styled-components"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography} from "@mui/material"

type AccordionTitleProps = {
    titlecolor: string
}

export const AccordionTitle = styled(Typography)<AccordionTitleProps>`
    color: ${props => props.titlecolor};
`

type AccordionPanelProps = {
    border: string
    titlecolor: string
}

export const AccordionPanel = styled(Accordion)<AccordionPanelProps>`
    &&& {
        box-shadow: none;
        border-bottom: ${props => props.border};
    }
`

export const AccordionPanelSummary = withStyles({
    root: {
        minHeight: 48,
        maxHeight: 48,
        padding: "0 1rem",
        "&$expanded": {
            minHeight: 48,
            maxHeight: 48,
        },
    },
    content: {
        margin: "18px 0",
        "&$expanded": {
            margin: "18px 0",
        },
    },
    expandIcon: {
        "& > span:last-child": {
            display: "none",
        },
    },
    expanded: {},
})(AccordionSummary)

type AccordionPanelDetailsProps = {
    $panelPadding: string
}

export const AccordionPanelDetails = styled(AccordionDetails)<AccordionPanelDetailsProps>`
    && {
        padding: ${props => props.$panelPadding || "0 1rem 0.5rem"};
    }
`

interface ExpandIconProps {
    arrowIconUrl: string
}

export const ExpandIcon = ({arrowIconUrl}: ExpandIconProps) => <img src={arrowIconUrl} alt="Accordion chevron icon" />
