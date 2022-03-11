import React from "react"
import {Drawer} from "."

const styles = {
    exampleContainer: {
        color: "white",
        width: "300px",
        backgroundColor: "teal",
        padding: "50px 15px 15px 15px",
    },
}

export default {
    title: "Drawer",
    component: Drawer,
    argTypes: {
        open: true,
        anchor: "right",
        onClose: () => null,
        closeImageSource: "https://xcdn.amido.com/content/platmod/icons/shared/close-white.svg",
        closeImageAltText: "Close",
        children: <div>Test</div>,
        dataGaV1: "Event Category",
        dataGaV2: "Event Name",
        ModalProps: {
            keepMounted: true,
            disableRestoreFocus: true,
            disableAutoFocus: true,
            disableEnforceFocus: true,
            closeAfterTransition: false,
            disablePortal: true,
            disableScrollLock: true,
        },
    },
}

const Template = args => <Drawer {...args} />

export const DrawerExample = Template.bind({})
DrawerExample.args = {
    open: false,
    anchor: "right",
    onClose: () => null,
    closeImageSource: "https://xcdn.amido.com/content/platmod/icons/shared/close-white.svg",
    closeImageAltText: "Close",
    children: (
        <div style={styles.exampleContainer}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
        </div>
    ),
}
