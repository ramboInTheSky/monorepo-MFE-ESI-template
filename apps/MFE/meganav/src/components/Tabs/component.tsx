import styled from "styled-components"

export type ContainerProps = {
    noOfTabs: number
    activeTabIndex: number
}

export const TabShocks = styled.div`
    border-bottom: 0.063rem solid #000000;
    height: 100%;
    width: 1rem;
`

export const Container = styled.div<ContainerProps>`
    display: flex;
    height: 2.75rem;
    margin-top: 1rem;
    div:nth-child(${({activeTabIndex}) => activeTabIndex + 1}) {
        border-right: none;
    }
    div:nth-child(${({activeTabIndex}) => activeTabIndex + 3}) {
        border-left: none;
    }

    div[role="tab"] {
        :nth-of-type(2) {
            border-top-left-radius: 0.25rem;
        }
        :nth-of-type(${({noOfTabs}) => noOfTabs + 1}) {
            border-top-right-radius: 0.25rem;
        }
    }
`
