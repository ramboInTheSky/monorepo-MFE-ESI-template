import React from "react"
import MissionsTitle from "../MissionsTitle"
import MissionsCTA from "../MissionsCTA"
import MissionsItemList from "../MissionsItemList"
import {Container} from "./component"
import chunkArray from "../../utils/chunk-array"
import {Mission, MissionItem} from "../../models/secondary-nav"

type MissionsProps = {
    data: Mission | null
    department: string
}

type RowMissions = {
    noOfColumns: number
    items: MissionItem[]
    department: string
}

const RowsOfMissionsItemList = ({items, department, noOfColumns = 1}: RowMissions) => {
    const chunkedItems = chunkArray(items, noOfColumns)
    return (
        <>
            {chunkedItems.map((item, index) => {
                const key = `row-${index}`
                return <MissionsItemList key={key} department={department} items={item} noOfColumns={noOfColumns} />
            })}
        </>
    )
}

export const Missions = ({data, department}: MissionsProps) => {
    if (!data) return <></>
    const {items, title, categoryLink, noOfColumns} = data
    return (
        <Container data-testid="missions" id="missions">
            {title && <MissionsTitle title={title} />}
            <RowsOfMissionsItemList department={department} items={items} noOfColumns={noOfColumns} />
            {categoryLink && (
                <MissionsCTA title={categoryLink.title} department={department} target={categoryLink.target} />
            )}
        </Container>
    )
}

export default Missions
