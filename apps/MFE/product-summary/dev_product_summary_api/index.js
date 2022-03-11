/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")

const morgan = require("morgan")

const apiData = require("../__mocks__/productSummaryApi.json")
const suitData = require("../__mocks__/suitSummaryApi.json")
const sofaData = require("../__mocks__/sofaSummaryApi.json")
const personalisedProductData = require("../__mocks__/personalisedProductSummaryApi.json")
const madeToMeasureData = require("../__mocks__/madeToMeasureSummaryApi.json")
const acceptanceTestApiData = require("../__mocks__/acceptanceTestsApi.js")
const internationalAcceptanceTestApiData = require("../__mocks__/internationalAcceptanceTestsApi.js")
const app = express()

const port = 3030

app.use(morgan("dev"))

app.get("/:realm/:territory/:language/:version/products/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
    res.setHeader("last-modified", "test-last-modified")
    res.setHeader(
        "edge-cache-tag",
        `dev-product-${req.params.itemNumber}, dev-price-DE, dev-reviews-${req.params.itemNumber}`,
    )

    const personalisedItemNumber = "128638"

    if (req.params.itemNumber.includes(personalisedItemNumber))
        res.send({...personalisedProductData, itemNumber: req.params.itemNumber})
    if (req.params.itemNumber === acceptanceTestApiData.testProductItemNumber) res.send(acceptanceTestApiData.apiData)
    if (req.params.itemNumber === internationalAcceptanceTestApiData.testProductItemNumber)
        return res.send(internationalAcceptanceTestApiData.apiData)
    if (req.params?.itemNumber === "113364") {
        const made2MeasureData = {...madeToMeasureData}
        made2MeasureData.title = "Joules Black Loxley Waterproof Padded Technical Raincoat"
        return res.send(made2MeasureData)
    }
    const response = {...apiData}
    response.itemNumber = req.params.itemNumber
    if (req.params.itemNumber == "X111111")
        response.title = "A Very long product title that is very long and will wrap over two lines if needed "
    else response.title = "a product Title"
    res.send(response)
})

app.get("/:realm/:territory/:language/:version/:type/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
    res.setHeader("last-modified", "test-last-modified")

    if (req.params?.type.includes("suit")) {
        res.send({...suitData, id: req.params.itemNumber})
    } else if (req.params?.type.includes("sofa")) {
        res.send({...sofaData, itemNumber: req.params.itemNumber})
    } else {
        res.send({...apiData, itemNumber: req.params.itemNumber})
    }
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
