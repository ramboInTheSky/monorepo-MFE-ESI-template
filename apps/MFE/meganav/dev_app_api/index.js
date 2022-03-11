/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")
const morgan = require("morgan")
const app = express()
const port = 3050
app.use(morgan("dev"))

app.get("/:realm/:territory/:language/:version/primary-items/Home", (req, res) => {
    const data = require(`./stubs/${req.params.realm}/gb.json`)
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
    res.send(data)
})

app.get("/:realm/:territory/:language/:version/seo-content/:page/:department/:m?/:n?", (req, res) => {
    const data = require(`./stubs/amido/seo.json`)
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
    res.send(data)
})

app.get("/:realm/:territory/:language/:version/primary-items/:page/secondary-items/:department", (req, res) => {
    let department = req.params.department.toLowerCase()
    department = department.replace(" ", "-")
    const jsonFileName = `${department}-secondary-nav.json`
    let data
    try {
        data = require(`./stubs/${req.params.realm.toLowerCase()}/${jsonFileName}`)
    } catch (e) {
        data = require(`./stubs/${req.params.realm.toLowerCase()}/men-secondary-nav.json`)
    }
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
    res.send(data)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
