/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")

const morgan = require("morgan")

const apiData = require("../__mocks__/reviewStarsApi.json")
const app = express()

const port = 3037

app.use(morgan("dev"))

app.get("/:realm/:territory/:language/:version/products/:itemNumber/star-rating", (req, res) => {
    try {
        const itemNumber = parseInt(req.params.itemNumber)
        if (itemNumber < 1000) {
            throw new Error("No product found for this id!")
        }
        res.setHeader("Content-Type", "application/json; charset=UTF-8")
        res.send(apiData[itemNumber])
    } catch (error) {
        console.log(error)
        throw error
    }
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
