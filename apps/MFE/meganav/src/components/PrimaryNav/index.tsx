import React from "react"
import SnailTrail from "../SnailTrail"
import {Container, SnailTrailWrapper} from "./component"
import connect from "./connect"

interface PrimaryNavProps {
    closeNav: () => void
}

export const PrimaryNav = ({closeNav}: PrimaryNavProps) => (
    <Container data-testid="primary-meganav">
        <SnailTrailWrapper onScroll={closeNav}>
            <SnailTrail />
        </SnailTrailWrapper>
    </Container>
)

export default connect(PrimaryNav)
