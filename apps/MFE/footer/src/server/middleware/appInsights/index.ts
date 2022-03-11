import {SettingsSdkKeys} from "../../../models/settings"

const {correlationHeaderName} = SettingsSdkKeys

export const appInsightsMiddleware = (client: any) => (req, _res, next) => {
    const customProperties = {
        "x-monorepo-correlation-id": req.headers[correlationHeaderName],
        Application: "Footer UI",
        Referer: req.headers.Referer,
        UserAgent: req.headers["User-Agent"],
    }
    // eslint-disable-next-line no-param-reassign
    client.commonProperties = customProperties
    next()
}

export default appInsightsMiddleware
