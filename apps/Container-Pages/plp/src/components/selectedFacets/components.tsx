import styled from "styled-components"
import {Typography} from "@mui/material"
import env from "../../config/env"

export const StyledSelectedFacetsContainer = styled.div`
    margin: 1rem 1rem 0 0.5rem;
    width: 16.25rem;
    & > button {
        float: right;
        padding: 0;
        text-align: right;
        display: block;
    }
`

export const StyledSelectedFacetsTitle = styled(Typography)`
    float: left;
`

export const StyledSelectedFacetsList = styled.div`
    width: 16.25rem;
    border-top: ${props => props.theme.colours.plp.facetDivider};
    float: left;
    margin-top: 0.5rem;
    overflow-y: auto;
    height: 14.5rem;
`

export const StyledRemoveContainer = styled.div`
    display: flex;
`

export const StyledRemove = styled.div`
    color: ${props => props.theme.colours.text.success};
    display: inline-block;
    margin-right: 10px;
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    font-size: 0.8rem;
    font-weight: bold;
`

export const RemoveSelectedFacet = styled.button`
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 100%;
    border: ${props => props.theme.colours.plp.facetDivider};
    background: url(${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/close-black.svg) center no-repeat;
    background-size: 0.5rem;
    cursor: pointer;
`

export const StyledSelectedFacetLabel = styled(Typography)`
    height: 1.25rem;
    line-height: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 10.5rem;
`

export const StyledList = styled.ul`
    list-style-type: none;
    list-style: none;
    margin: 0;
    padding: 0;
`

export const StyledListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0.625rem 0.5rem 0;
`
