import {GetHeaders, GetSettings} from "./SettingsService"

export function SettingsSDK(appId, path) {
    return async (req, res, next) => {
        try {
            const settings = await GetAppSettings(appId, path, req.headers)
            res.locals.configuration = settings.items
        } catch (error) {
            res.statusCode = error.code
        }
        next()
    }
}

export async function GetAppSettings(appId, path, requestHeaders) {
    const headers = GetHeaders(appId, requestHeaders)
    const settings = await GetSettings(headers, path)
    return settings
}
