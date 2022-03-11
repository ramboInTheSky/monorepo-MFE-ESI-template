import fs from "fs"
import path from "path"
import {Request, Response} from "express"
import escapeStringRegexp from "escape-string-regexp"
import {env as runtimeEnv} from "process"
import env from "../../../config/env"
import {SettingsSdkKeys} from "../../../models/settings"
import {QUERY_PARAMETER_TIME_MACHINE_DATE} from "../../../config/constants"
import {SPLASH_SCREEN_HTML, BOOKMARK_TITLE} from "../render/assets"

const containerMiddleware = (req: Request, res: Response) => {
    const publicPath = path.join(__dirname, "/public")

    fs.readFile(`${publicPath}/container.html`, "utf8", (err, html) => {
        if (!err) {
            const timeMachineDate = req.query[QUERY_PARAMETER_TIME_MACHINE_DATE] as string
            const queryString = timeMachineDate ? `?${QUERY_PARAMETER_TIME_MACHINE_DATE}=${timeMachineDate}` : ""
            const bookMarkTitle =
                res.locals?.configuration?.[SettingsSdkKeys.bookmarkTitle] ||
                (req.headers["x-monorepo-realm"] as string)
            req.html = html || ""
            const htmlReplacements: StringMap = {
                SITEURL: `${
                    env.DEV_URL_OVERRIDE ? env.DEV_URL_OVERRIDE : (req.headers["x-monorepo-siteurl"] as string)
                }${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX || ""}`,
                QUERY: queryString,
                SPLASH_ICONS: SPLASH_SCREEN_HTML(req.headers["x-monorepo-realm"] as string),
                BOOKMARK_TITLE: BOOKMARK_TITLE(bookMarkTitle),
            }

            Object.keys(htmlReplacements).forEach(key => {
                const value = htmlReplacements[key]
                req.html = req.html.replace(new RegExp(`__${escapeStringRegexp(key)}__`, "g"), value)
            })
            res.status(200).send(req.html)
        } else {
            res.status(500).send("Error parsing container.html")
        }
    })
}

export default containerMiddleware
