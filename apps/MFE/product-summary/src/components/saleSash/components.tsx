import styled from "styled-components"

import {SaleSashPosition} from "../../config/constants"

export const SaleImg = styled.img`
    width: auto;
    position: absolute;
    z-index: 1;

    &.${SaleSashPosition.TL} {
        left: 0;
        top: 0;
    }

    &.${SaleSashPosition.TR} {
        left: 0;
        top: 0;
    }

    &.${SaleSashPosition.BL} {
        left: 0;
        top: 0;
    }

    &.${SaleSashPosition.BR} {
        left: 0;
        top: 0;
    }
`
