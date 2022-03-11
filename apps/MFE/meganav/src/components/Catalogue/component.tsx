import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Hr = styled.hr`
    background: #eaeaea;
    margin: 0;
    padding: 0;
    border: none;
    height: 1px;
    @media (min-width: ${breakpoints.values.lg}px) {
        display: none;
    }
`
export const Container = styled.div<{hasMissions: boolean}>`
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    padding-bottom: ${({hasMissions}) => (hasMissions ? 0 : "4rem")};
    @media (min-width: ${breakpoints.values.lg}px) {
        overflow-y: auto;
        max-height: calc(100vh - 6rem);
        padding: 1rem;
        padding-bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

type ColumnProps = {
    numberofcolumns: number
}

export const Column = styled.div<ColumnProps>`
    display: flex;
    flex-direction: column;
    @media (min-width: ${breakpoints.values.lg}px) {
        width: ${props => `calc(100% / ${props.numberofcolumns})`};
        height: 100%;
        padding-right: 1rem;
    }
`
