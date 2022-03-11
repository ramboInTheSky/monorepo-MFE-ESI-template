import React from "react"
import Hidden from "@mui/material/Hidden"
import {CTA} from "@monorepo/cta"
import connect from "./connect"
import {Container} from "./component"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

export type CheckoutProps = {
    enable: boolean
    text: string
    url: string
    isInternationalCountry: boolean
    dataGaV1?: string
    dataGaV2?: string
    dataGaV3?: string
}

export const Checkout = (props: CheckoutProps) => {
    return (
        <Container
            isinternationalcountry={props.isInternationalCountry}
            data-testid="header-adaptive-checkout"
            className="header-adaptive-checkout"
        >
            <Hidden smDown implementation="css">
                <CTA
                    {...props}
                    themeType="Primary"
                    dataGaV1={props.dataGaV1}
                    dataGaV2={props.dataGaV2}
                    dataGaV3={props.dataGaV3}
                    rel="nofollow"
                    onClick={removeFromLocalStorage}
                />
            </Hidden>
        </Container>
    )
}

export default connect(Checkout)
