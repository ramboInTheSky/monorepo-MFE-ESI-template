import React from "react"
import logger from "@monorepo/core-logger"
import App from "../App"
import {BASELINECSS_MATERIALUI, JSS_SERVERSIDE, BASELINECSS_CUSTOM} from "../config/constants"

const removeJssServerSide = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
        element.parentNode!.removeChild(element)
    }
}

// eslint-disable-next-line react/prefer-stateless-function
export class ClientApp extends React.Component<any, {hasError: boolean}> {
    constructor(props: any) {
        super(props)
        this.state = {
            // eslint-disable-next-line react/no-unused-state
            hasError: false,
        }
    }

    componentDidMount() {
        removeJssServerSide(`${JSS_SERVERSIDE}${BASELINECSS_MATERIALUI}`)
        removeJssServerSide(`${JSS_SERVERSIDE}${BASELINECSS_CUSTOM}`)
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error, errorInfo) {
        logger.error(`${error}, ${errorInfo}`, document.cookie)
    }

    render() {
        return <App {...this.props} />
    }
}

export default ClientApp
