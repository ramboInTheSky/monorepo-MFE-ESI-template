import React, {useEffect, useState} from "react"
import Cookies from "js-cookie"

import {TIME_MACHINE_DATE_COOKIE} from "../../config/constants"
import {Container} from "./components"
import connect from "./connect"

export type TimeMachineDateProps = {
    useTimeMachineCookie: boolean
}

export const TimeMachineDate = ({useTimeMachineCookie}: TimeMachineDateProps) => {
    const [dateString, setDateString] = useState("")

    useEffect(() => {
        const timeMachineDateCookieValue = Cookies.get(TIME_MACHINE_DATE_COOKIE)
        if (timeMachineDateCookieValue && useTimeMachineCookie) {
            setDateString(timeMachineDateCookieValue)
        }
    }, [useTimeMachineCookie])

    if (!dateString) return null

    return <Container data-testid="time-machine-date">TimeMachineDate: {dateString}</Container>
}

export default connect(TimeMachineDate)
