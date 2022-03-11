import React from "react"
import {Container} from "./component"
import {Mission} from "../../models/secondary-nav"

type MissionsTitleProps = Pick<Mission, "title">

const MissionsTitle = ({title}: MissionsTitleProps) => <Container>{title}</Container>

export default MissionsTitle
