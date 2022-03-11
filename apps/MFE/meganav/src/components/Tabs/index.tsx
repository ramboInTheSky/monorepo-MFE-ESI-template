import React from "react"
import Tab from "../Tab"
import {Container, TabShocks} from "./component"

export type TabsProps = {activeIndex: number; items: string[]; handleTabClick: (tabIndex: number) => void}

const Tabs = ({items, handleTabClick, activeIndex}: TabsProps) => (
    <Container role="tablist" aria-label="tabs" activeTabIndex={activeIndex} noOfTabs={items.length}>
        <TabShocks />
        {items.map((item, index) => (
            <Tab key={item} text={item} isActive={activeIndex === index} handleTabClick={() => handleTabClick(index)} />
        ))}
        <TabShocks />
    </Container>
)

export default Tabs
