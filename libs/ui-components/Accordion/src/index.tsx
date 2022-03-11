import React, {ReactChild} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {AccordionPanel, AccordionPanelSummary, AccordionPanelDetails, ExpandIcon, AccordionTitle} from "./components"

interface AccordionProps {
    title: string | React.ReactNode
    children: ReactChild
    titleColor: string
    border: string
    arrowIconUrl: string
    onChange?: () => void
    expanded?: boolean
    panelPadding?: string
}

const Accordion = ({
    border,
    titleColor,
    title,
    arrowIconUrl,
    children,
    panelPadding,
    expanded = false,
    onChange,
}: AccordionProps) => (
    <AccordionPanel
        border={border}
        titlecolor={titleColor}
        square
        data-testid={formatTextTestIds(`accordions-${title}`)}
        expanded={expanded}
        onChange={onChange}
    >
        <AccordionPanelSummary expandIcon={<ExpandIcon arrowIconUrl={arrowIconUrl} />}>
            <AccordionTitle variant="h4" titlecolor={titleColor}>
                {title}
            </AccordionTitle>
        </AccordionPanelSummary>
        <AccordionPanelDetails $panelPadding={panelPadding}>{children}</AccordionPanelDetails>
    </AccordionPanel>
)

Accordion.defaultProps = {
    onChange: () => null,
    expanded: false,
    panelPadding: "",
}

export default Accordion
