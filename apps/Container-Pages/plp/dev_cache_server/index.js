/* eslint-disable prefer-template */
/* istanbul ignore file */
const morgan = require("morgan")
const express = require("express")
const proxy = require("express-http-proxy")
const ESI = require("nodesi")
const cookieParser = require("cookie-parser")

if (process.env.USE_DEV_ESI !== "true") return

const REACT_APP_APP_URL = process.env.REACT_APP_APP_URL || "http://localhost:3009"
console.log("REACT_APP_APP_URL", REACT_APP_APP_URL)

const app = express()
const esi = new ESI({
    toLog: process.console,
    cache: false,
})
const port = 3009

app.use(cookieParser())

app.get("/home", (req, res) => {
    try {
        res.setHeader("Content-Type", "text/html; charset=UTF-8")
        res.send(`<html><body><a href="http://localhost:3009/search?w=red">PLP</a></body> </html>`)
    } catch (error) {
        console.log(error)
        throw error
    }
})

app.get("/proxy/:realm/:territory/:language/:esi/:url*", (req, res, next) => {
    req.headers["x-monorepo-realm"] = req.params.realm
    req.headers["x-monorepo-territory"] = req.params.territory
    req.headers["x-monorepo-language"] = req.params.language
    req.headers["test-with-local-esi"] = req.params.esi

    if (!req.headers["x-monorepo-siteurl"]) {
        req.headers[
            "x-monorepo-siteurl"
        ] = `${REACT_APP_APP_URL}/proxy/${req.params.realm}/${req.params.territory}/${req.params.language}/${req.params.esi}/`
    }

    const pageUrl = req.url
        .replace(`/proxy/${req.params.realm}/${req.params.territory}/${req.params.language}/${req.params.esi}`, "")
        .replace(
            `%2Fproxy%2F${req.params.realm}%2F${req.params.territory}%2F${req.params.language}%2F${req.params.esi}`,
            "",
        )

    req.url = pageUrl

    return app._router.handle(req, res, next)
})

app.get("/productsummarystatic/*", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3001"))
app.get("/headerstatic/*", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3004"))
app.get("/meganavstatic/*", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3005"))
app.get("/secondary-items/*", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3005"))
app.get("/favourite", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3004"))
app.get("/favourite/*", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3004"))
app.get("/bag/*", proxy(process.env.REACT_APP_APP_URL || "http://localhost:3004"))

app.use(
    proxy("http://localhost:3000", {
        userResDecorator: (proxyRes, proxyResData, userReq) => {
            return proxyRes.headers["content-type"].includes("html") &&
                (parseInt(process.env.REACT_APP_NO_PASS_THROUGH) ||
                    (userReq.headers["test-with-local-esi"] && userReq.headers["test-with-local-esi"].includes("true")))
                ? esi.process(proxyResData.toString(), {
                      headers: {
                          cookie: userReq.headers.cookie,
                          "x-monorepo-realm": userReq.headers["x-monorepo-realm"],
                          "x-monorepo-territory": userReq.headers["x-monorepo-territory"],
                          "x-monorepo-language": userReq.headers["x-monorepo-language"],
                          "x-monorepo-correlation-id": userReq.headers["x-monorepo-correlation-id"],
                          "x-monorepo-siteurl": userReq.headers["x-monorepo-siteurl"],
                          "x-monorepo-viewport-size": userReq.headers["x-monorepo-viewport-size"],
                          "x-monorepo-persona": userReq.headers["x-monorepo-persona"],
                          "test-with-local-esi": userReq.headers["test-with-local-esi"],
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
