/* eslint-disable prefer-template */
/* istanbul ignore file */
const morgan = require("morgan")
const express = require("express")
const proxy = require("express-http-proxy")
const ESI = require("nodesi")
const cookieParser = require("cookie-parser")

const app = express()
const esi = new ESI({
    toLog: process.console,
    cache: false,
})
const port = 3333

app.use(morgan("dev"))
app.use(cookieParser())

app.use(
    proxy("http://localhost:3002", {
        userResDecorator: (proxyRes, proxyResData, userReq) => {
            return proxyRes.headers["content-type"].includes("html")
                ? esi.process(proxyResData.toString(), {
                      headers: {
                          "x-monorepo-realm": userReq.headers["x-monorepo-realm"],
                          "x-monorepo-territory": userReq.headers["x-monorepo-territory"],
                          "x-monorepo-language": userReq.headers["x-monorepo-language"],
                          "x-monorepo-correlation-id": userReq.headers["x-monorepo-correlation-id"],
                          "x-monorepo-siteurl": userReq.headers["x-monorepo-siteurl"],
                          "Cache-Control": "no-cache",
                      },
                  })
                : proxyResData
        },
    }),
)

app.listen(port, () => {
    console.log(`ESI server started at http://localhost:${port}`)
})
