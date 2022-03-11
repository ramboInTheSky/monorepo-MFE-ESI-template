import React from "react"
import MissionsItem from "../MissionsItem"
import {MissionItem} from "../../models/secondary-nav"
import {Container} from "./component"

export type MissionsItemListProps = {
    items: MissionItem[]
    department: string
    noOfColumns: number
}

const MissionsItemList = ({items, department, noOfColumns}: MissionsItemListProps) => (
    <Container>
        {items.map((item, index) => {
            const key = `${item.title}-${index}`
            return <MissionsItem key={key} department={department} {...item} noOfColumns={noOfColumns} />
        })}
    </Container>
)

export default MissionsItemList
