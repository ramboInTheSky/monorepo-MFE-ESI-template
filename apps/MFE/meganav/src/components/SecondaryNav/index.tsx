import React from "react"
import Hidden from "@mui/material/Hidden"
import connect from "./connect"
import Drawer, {DrawerProps} from "../Drawer"
import Overlay from "../Overlay"
import {OuterContainer, Container} from "./component"
import SecondaryNavContent from "../SecondaryNavContent"

export type SecondaryNavProps = Pick<DrawerProps, "anchor"> & {
    open: boolean
    deactivateIndex: () => void
    isInSecondaryNav: boolean
    isInPrimaryNav: boolean
}

export const SecondaryNav = ({
    anchor,
    open: isDrawerOpen,
    deactivateIndex,
    isInSecondaryNav,
    isInPrimaryNav,
}: SecondaryNavProps) => {
    const isOpen = isInSecondaryNav || isInPrimaryNav
    return (
        <>
            {isDrawerOpen ? (
                <Hidden lgUp implementation="js">
                    <Drawer showCloseIcon={false} anchor={anchor} open={isDrawerOpen} onClose={deactivateIndex}>
                        <Container data-testid="secondary-meganav-narrow">
                            <SecondaryNavContent showAsDrawer={false} />
                        </Container>
                    </Drawer>
                </Hidden>
            ) : null}
            {isOpen ? (
                <Hidden mdDown implementation="js">
                    <Overlay open={isOpen} handleClose={deactivateIndex}>
                        <OuterContainer>
                            <Container data-testid="secondary-meganav-wide">
                                <SecondaryNavContent showAsDrawer />
                            </Container>
                        </OuterContainer>
                    </Overlay>
                </Hidden>
            ) : null}
        </>
    )
}

export default connect(SecondaryNav)
