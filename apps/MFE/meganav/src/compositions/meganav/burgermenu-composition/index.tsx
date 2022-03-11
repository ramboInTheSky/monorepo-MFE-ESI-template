import React from "react"
import Hidden from "@mui/material/Hidden"
import PrimaryNav from "../../../components/PrimaryNav"
import SecondaryNav from "../../../components/SecondaryNav"
import BurgerButton from "../../../components/BurgerButton"
import {NavigationBar} from "./component"
import connect from "./connect"

export type BurgerMenuMegaNavProps = {
    setCompositionSettings: () => void
}

export const BurgerMenuMegaNav = ({setCompositionSettings}: BurgerMenuMegaNavProps) => {
    if (setCompositionSettings) setCompositionSettings()

    return (
        <>
            <Hidden mdUp implementation="css">
                <BurgerButton />
            </Hidden>
            <NavigationBar>
                <PrimaryNav />
                <SecondaryNav />
            </NavigationBar>
        </>
    )
}

export default connect(BurgerMenuMegaNav)
