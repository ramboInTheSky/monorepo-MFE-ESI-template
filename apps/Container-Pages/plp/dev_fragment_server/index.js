/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")
const cookieParser = require("cookie-parser")
// const env = require("../../config/env")
const app = express()

const port = 3011
// const dev = process.env.NODE_ENV && process.env.NODE_ENV === "development"

app.use(cookieParser())

app.get("/product-summary/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // Note that we are wrapping with an anchor tag in order to be able to
    // test clicking on an item and being taken to a separate page, and then
    // navigating back to the previous page
    res.send(`
        <a href="/search">
            <div style="height: 400px; background: lightgray; margin-bottom: 20px;">{ESI:"ESI"} - ${req.params.itemNumber}</div>
        </a>
    `)
})

app.get("/product-summary/suit/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // Note that we are wrapping with an anchor tag in order to be able to
    // test clicking on an item and being taken to a separate page, and then
    // navigating back to the previous page
    res.send(`
        <a href="/search">
            <div style="height: 400px; background: lightgray; margin-bottom: 20px;">SUIT {ESI:"ESI"} - ${req.params.itemNumber}</div>
        </a>
    `)
})

app.get("/product-summary/sofa/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // Note that we are wrapping with an anchor tag in order to be able to
    // test clicking on an item and being taken to a separate page, and then
    // navigating back to the previous page
    res.send(`
        <a href="/search">
            <div style="height: 400px; background: lightgray; margin-bottom: 20px;">SOFA {ESI:"ESI"} - ${req.params.itemNumber}</div>
        </a>
    `)
})

app.get("/product-summary/product/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // Note that we are wrapping with an anchor tag in order to be able to
    // test clicking on an item and being taken to a separate page, and then
    // navigating back to the previous page
    res.send(`
        <a href="/search">
            <div style="height: 400px; background: lightgray; margin-bottom: 20px;">PRODUCT {ESI:"ESI"} - ${req.params.itemNumber}</div>
        </a>
    `)
})

app.get("/product-summary/:type/:itemNumber", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // Note that we are wrapping with an anchor tag in order to be able to
    // test clicking on an item and being taken to a separate page, and then
    // navigating back to the previous page
    res.send(`
        <a href="/search">
            <div style="height: 400px; background: lightgray; margin-bottom: 20px;">{ESI:"ESI"} - ${req.params.itemNumber}</div>
        </a>
    `)
})

app.get("*", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    res.send(`
        <div style="height: 35px; background: lightgray;">{ESI:"ESI"}</div>
    `)
})

app.listen(port, () => {
    console.log(`mock product summary server started at http://localhost:${port}`)
})
