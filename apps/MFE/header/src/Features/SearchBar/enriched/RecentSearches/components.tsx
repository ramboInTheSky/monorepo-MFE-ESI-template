import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const RecentSearchContent = styled.div`
    > ul {
        background: white;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex: 0 0 auto;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
        color: ${props => props.theme.colours.text.default};

        @media (min-width: ${breakpoints.values.sm}px) {
            flex-direction: row;
        }

        li {
            flex: 0 0 auto;

            @media (min-width: ${breakpoints.values.sm}px) {
                flex-basis: calc(100% / 2);
            }
            @media (min-width: ${breakpoints.values.md}px) {
                flex-basis: calc(100% / 3);
            }
            @media (min-width: ${breakpoints.values.lg}px) {
                flex-basis: calc(100% / 4);
            }
        }
    }
`
