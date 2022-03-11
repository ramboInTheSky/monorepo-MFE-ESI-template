import {MouseEvent} from "react"
import {connect} from "react-redux"
import logger from "@monorepo/core-logger"

import {TextModel} from "models/text"
import {State} from "../../ducks"

import axios from "../../utils/axios"

export const mapStateToProps = (state: State) => {
    return {
        siteUrl: state.languages.siteUrl,
        text: state.text,
    }
}

interface ConnectMergeProps {
    siteUrl: string
    text: TextModel
}

export const mergeProps = (state: Partial<ConnectMergeProps>, _, ownProps) => ({
    ...state,
    ...ownProps,
    deviceSwitcherFn: async (event: MouseEvent<HTMLAnchorElement>, url: string) => {
        try {
            event.preventDefault()
            await axios.get(url, {
                withCredentials: true,
                headers: {Pragma: "no-cache"},
            })
            window.location.reload()
        } catch (e) {
            logger.error(`Copyright - unable to call ${url} - ${e}`)
            logger.error(e)
            logger.error(e.response)
        }
    },
})

export default connect(mapStateToProps, null, mergeProps)
