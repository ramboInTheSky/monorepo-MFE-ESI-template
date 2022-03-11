import styled from "styled-components"
import {Paper} from "@mui/material"

export const FacetsGridContainer = styled(Paper)`
    z-index: 0;
    width: 23.875rem;
    height: 19.4375rem;
    margin: 1rem;
    overflow-y: auto;
    position: relative;
`

export const FacetsGridList = styled.ul`
    list-style-type: none;
    list-style: none;
    margin: 0.4375rem 0 0 0;
    padding: 0;
`

export const FacetsGridListItem = styled.li`
    width: 10.4375rem;
    display: flex;
    float: left;
    margin: 0 0 0 0.625rem;
    &:nth-child(odd) {
        margin-right: 0.4rem;
    }
`
