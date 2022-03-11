import React, {memo} from "react"
import env from "../../config/env"
import {QUERY_PARAMETER_TIME_MACHINE_DATE} from "../../config/constants"
import {IS_BROWSER} from "../../utils/window"
import connect from "./connect"

const showQuery = (timeMachineDate: string | null) =>
    timeMachineDate ? `?${QUERY_PARAMETER_TIME_MACHINE_DATE}=${timeMachineDate}` : ""

const meganavEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    env.REACT_APP_MEGANAV_BASEURL && useDevEsi ? env.REACT_APP_MEGANAV_BASEURL : SITEURL

// This will only run on the server so the env.REACT_APP_MEGANAV_BASEURL
// here is coming from the RUNTIME vars
const ESI_HTML = (timeMachineDate, siteUrl: string, useDevEsi: boolean) =>
    env.DEVELOPMENT
        ? "<div> MEGANAV</div>"
        : `<esi:include src="${meganavEsiBaseUrl(siteUrl, useDevEsi)}/meganav${showQuery(
              timeMachineDate,
          )}" onerror="continue" />`

export type MeganavESIProps = {
    timeMachineDate: string | null
    siteUrl: string
    useDevEsi: boolean
}

export const MeganavESI = ({timeMachineDate, siteUrl, useDevEsi}: MeganavESIProps) => {
    const getExistingHtml = (selector: string) => {
        const element = document.getElementById(selector)
        return element ? element.innerHTML : null
    }

    return (
        <div
            style={{minHeight: "1px", position: "relative", zIndex: 1}}
            data-testid="header-meganav"
            id="meganav-internal-entrypoint"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: IS_BROWSER()
                    ? getExistingHtml("meganav-internal-entrypoint")!
                    : ESI_HTML(timeMachineDate, siteUrl, useDevEsi),
            }}
        />
    )
}

const MemoizedMeganavESI = memo(({timeMachineDate, siteUrl, useDevEsi}: MeganavESIProps) => (
    <MeganavESI timeMachineDate={timeMachineDate} siteUrl={siteUrl} useDevEsi={useDevEsi} />
))
MemoizedMeganavESI.displayName = "MemoizedMeganavESI"

export default connect(MemoizedMeganavESI)
