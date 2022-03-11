import {SaleSashPosition} from "../../config/constants"

export const showFitsIcons = (isOnSale: boolean, saleSashPosition: SaleSashPosition | null) =>
    !isOnSale || saleSashPosition === SaleSashPosition.TL || saleSashPosition === SaleSashPosition.TR
