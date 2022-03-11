import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import env from "../../config/env"
import connect from "./connect"
import {SaleSashPosition} from "../../config/constants"
import {SaleImg} from "./components"

interface SaleSashProps {
    saleSashUrl: string | null
    saleSashPosition: SaleSashPosition | null
    isOnSale: boolean
}

export const SaleSash = ({saleSashUrl, isOnSale, saleSashPosition}: SaleSashProps) => {
    if (!isOnSale || !saleSashUrl || !saleSashPosition) {
        return null
    }

    return (
        <SaleImg
            dir="ltr"
            className={SaleSashPosition[saleSashPosition]}
            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/images/plp/sale/${saleSashUrl}`}
            data-testid={formatTextTestIds("product_summary_sale_sash")}
        />
    )
}

export default connect(SaleSash)
