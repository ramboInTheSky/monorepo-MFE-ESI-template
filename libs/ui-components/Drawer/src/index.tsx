import React from "react"
import {DrawerProps as MUIDrawerProps, Drawer as MUIDrawer} from "@mui/material"
import {CloseIcon} from "./drawer-component"

export interface DrawerProps extends MUIDrawerProps {
    /**
     * Image source of the close image
     */
    closeImageSource?: string
    /**
     * Alt text of the close image
     */
    closeImageAltText?: string
    /**
     * First event of data layer that fired when user clicks close image
     */
    dataGaV1?: string
    /**
     * Second event of data layer that fired when user clicks close image
     */
    dataGaV2?: string
    /**
     * Test Identifier of the component
     */
    testId?: string
    onClose: () => void
}

export const Drawer = ({
    closeImageSource,
    closeImageAltText,
    dataGaV1,
    dataGaV2,
    testId,
    anchor,
    open,
    onClose,
    children,
    ModalProps,
}: DrawerProps) => {
    return (
        <MUIDrawer anchor={anchor} open={open} onClose={onClose} ModalProps={ModalProps} data-testid={testId}>
            {closeImageSource && (
                <CloseIcon
                    src={closeImageSource}
                    onClick={onClose}
                    alt={closeImageAltText}
                    data-ga-v1={dataGaV1}
                    data-ga-v2={dataGaV2}
                />
            )}
            {children}
        </MUIDrawer>
    )
}

Drawer.defaultProps = {
    testId: "drawer-container",
    dataGaV1: null,
    dataGaV2: null,
}
