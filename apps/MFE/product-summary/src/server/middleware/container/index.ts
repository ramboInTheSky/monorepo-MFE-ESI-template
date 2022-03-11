import fs from "fs"
import path from "path"
import {Request, Response} from "express"
import escapeStringRegexp from "escape-string-regexp"
import env from "../../../config/env"
import BFFLogger from "../../core/BFFLogger"

const containerMiddleware = (req: Request, res: Response) => {
    const publicPath = path.join(__dirname, "/public")
    const itemNumber = req.params?.itemNumber || ""
    let itemNumberPrefix = ""

    if (req.params?.type) {
        itemNumberPrefix = `${req.params.type}/`
    }

    if (itemNumber === "") BFFLogger.warn("no itemNumber provided")
    fs.readFile(`${publicPath}/container.html`, "utf8", (err, html) => {
        if (!err) {
            req.html = html || ""
            const htmlReplacements: StringMap = {
                SITEURL: env.DEV_URL_OVERRIDE ? env.DEV_URL_OVERRIDE : (req.headers["x-monorepo-siteurl"] as string),
                ITEM_NUMBER: `${itemNumberPrefix}${itemNumber}`,
            }

            Object.keys(htmlReplacements).forEach(key => {
                const value = htmlReplacements[key]
                req.html = req.html!.replace(new RegExp(`__${escapeStringRegexp(key)}__`, "g"), value)
            })
            res.status(200).send(req.html)
        } else {
            res.status(500).send("Error parsing container.html")
        }
    })
}

export default containerMiddleware