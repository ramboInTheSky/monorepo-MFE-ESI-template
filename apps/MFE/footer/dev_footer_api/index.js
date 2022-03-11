/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")

const morgan = require("morgan")

const app = express()

const port = 3040

app.use(morgan("dev"))

app.get("/*/:realm/:territory/:language/:version/footers/Default", (req, res) => {
    const data = require(`./stubs/${req.params.realm}/${req.params.territory}.json`)
    data.title = `Title: ${req.params.pid}`
    res.setHeader("Content-Type", "application/json; charset=UTF-8")

    res.send(data)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
