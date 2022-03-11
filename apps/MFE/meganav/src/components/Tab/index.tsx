import React from "react"
import {Container} from "./component"

export type TabProps = {text: string; handleTabClick: React.EventHandler<React.MouseEvent>; isActive: boolean}

const Tab = ({text, handleTabClick, isActive}: TabProps) => (
    <Container role="tab" aria-controls={`panel-${text}`} isActive={isActive} onMouseEnter={handleTabClick}>
        <span>{text}</span>
    </Container>
)

export default Tab
