import styled from "styled-components"
import withStyles from "@mui/styles/withStyles"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

export const StyledAccordion = styled(Accordion)`
    && {
        background: transparent;
        border-bottom: ${props => props.theme.colours.plp.facetDivider};
        box-shadow: none;
        margin: auto;
    }

    &::before {
        content: none;
    }
`

const accordionSummaryStyles = {
    root: {
        minHeight: "2.75rem",
        "&$expanded": {
            minHeight: "2.75rem",
        },
        "&$focused": {
            backgroundColor: "transparent",
        },
        padding: 0,
    },
    expanded: {},
    focused: {},
    content: {
        margin: "0.5rem 0",
        "&$expanded": {
            margin: "0.5rem 0",
        },
    },
    expandIcon: {
        marginRight: "0.5rem",
    },
}

export const StyledAccordionSummary = withStyles(accordionSummaryStyles)(AccordionSummary)

const accordionDetailsStyles = {
    root: {
        padding: "0 0 1rem 0",
    },
}

export const StyledAccordionDetails = withStyles(accordionDetailsStyles)(AccordionDetails)

export const AccordionTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-transform: ${({theme}) => `${theme.colours.plp.filters.titleTransform}`};
`
export const ClearLink = styled.button`
    color: ${({theme}) => theme.colours.text.hyperlink};
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    font-size: 0.875rem;
    font-weight: ${({theme}) => `${theme.colours.font.primary.medium.weight}`};
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    cursor: pointer;
    text-align: right;
    margin-left: 1rem;

    [dir="rtl"] & {
        margin-left: 0;
        margin-right: 1rem;
        text-align: left;
    }

    &:hover {
        background: none;
        text-decoration: underline;
    }
`
export const FieldSet = styled.fieldset`
    padding: 0;
    border: none;
    margin: 0;
`
