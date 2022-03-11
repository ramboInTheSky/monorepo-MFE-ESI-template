/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")
const morgan = require("morgan")

const apiRedirect = require("../__mocks__/searchApiRedirect.json")
const apiDataPage1 = require("../__mocks__/searchApi.page1.json")
const apiDataPage2 = require("../__mocks__/searchApi.page2.json")
const apiDataPage3 = require("../__mocks__/searchApi.page3.json")
const apiDataPage4 = require("../__mocks__/searchApi.page4.json")
const apiDataNoResults = require("../__mocks__/searchApiNoResults.json")
const apiDataFiltered = require("../__mocks__/searchApiFiltered.json")
const searchApiRelaxedQuery = require("../__mocks__/searchApiRelaxedQuery.json")
const smartSearchApiData = require("../__mocks__/smartSearchApi.json")

const app = express()

const port = 3090

app.use(morgan("dev"))

app.get("/:realm/:territory/:language/:version/item-numbers", (req, res) => {
    if (req.query.criteria.includes("smart-search")) {
        smartSearchHandling(req, res)
        return
    }

    defaultSearchHandling(req, res)
})

app.listen(port, () => {
    console.log(`search stub server started at http://localhost:${port}`)
})

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function defaultSearchHandling(req, res) {
    try {
        const apiDataStart = {
            0: clone(apiDataPage1),
            24: clone(apiDataPage2),
            48: clone(apiDataPage3),
            72: clone(apiDataPage4),
        }

        if (req.query.searchTerm) {
            apiDataStart[0].title = req.query.searchTerm
            apiDataStart[24].title = req.query.searchTerm
            apiDataStart[48].title = req.query.searchTerm
            apiDataStart[72].title = req.query.searchTerm
        }

        if (req.query.type === "Category" && req.query.criteria.includes("/shop/gender-women")) {
            apiDataStart[0].title = "Women"
            apiDataStart[24].title = "Women"
            apiDataStart[48].title = "Women"
            apiDataStart[72].title = "Women"
        }

        if (req.query.type === "Category" && req.query.criteria.includes("/shop/test-category")) {
            apiDataStart[0].title = "Test"
            apiDataStart[24].title = "Test"
            apiDataStart[48].title = "Test"
            apiDataStart[72].title = "Test"
        }

        if (req.query.searchTerm === "drass") {
            apiDataStart[0].title = "Dress"
            apiDataStart[0].autoCorrectQuery = "Dress"
            apiDataStart[24].title = "Dress"
            apiDataStart[24].autoCorrectQuery = "Dress"
            apiDataStart[48].title = "Dress"
            apiDataStart[48].autoCorrectQuery = "Dress"
            apiDataStart[72].title = "Dress"
            apiDataStart[72].autoCorrectQuery = "Dress"
        }

        res.setHeader("Content-Type", "application/json; charset=UTF-8")
        let start = req.query.start ?? "0"
        if (Number(start) > 72) start = "0"

        if (req.query && req.query.criteria && req.query.criteria.includes("size:1x2022")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "size")
            if (index > -1) {
                response.filters[index].options[0].s = true
            }
            res.send(response)
            return
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("curve")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "sizetype")
            if (index > -1) {
                response.filters[1].options.splice(1)
                response.filters[index].options.splice(1)
                response.filters[index].options[0].s = true
            }
            res.send(response)
            return
        }

        if (req.query.criteria.toString().includes("REDIRECT_ERROR_PAGE")) {
            throw new Error()
        }

        if (req.query.criteria.toString().includes("NO-RESULTS")) {
            res.send(apiDataNoResults)
            return
        }
        if (req.query.criteria.toString().includes("REDIRECT")) {
            res.send(apiRedirect)
            return
        }
        if (req.query.criteria.toString().includes("FILTER_SELECTION")) {
            res.send(apiDataPage3)
            return
        }
        if (req.query.criteria.toString().includes("ONE-RESULT")) {
            const oneResultData = {...apiDataStart[start]}
            oneResultData.items.splice(1)
            oneResultData.items[0].itemNumber = "910837"
            res.send(oneResultData)
            return
        }

        if (req.query.criteria.toString().includes("NO_ESI")) {
            res.send(apiDataPage3)
            return
        }
        if (req.query.pagesize === "48") {
            const data = {
                ...apiDataStart[start],
                items: [...apiDataStart[start].items, ...apiDataStart[Number(start) * 2].items],
            }
            res.send(data)
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("newin")) {
            const response = clone(apiDataFiltered)
            response.filters[0].options[0].s = true
            res.send(response)

            return
        }

        if (
            req.query &&
            req.query.criteria &&
            req.query.criteria.includes("mens%20old%20jeans%20red") &&
            !req.query.criteria.includes("brand:amido")
        ) {
            const response = clone(searchApiRelaxedQuery)
            res.send(response)

            return
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("gender:women")) {
            res.send(clone(apiDataFiltered))
            return
        }

        // select gender-older-girls to see returned one option only - hiding the gender filter
        if (req.query && req.query.criteria && req.query.criteria.includes("gender:oldergirls")) {
            const response = clone(apiDataFiltered)
            const index = response.filters.findIndex(filter => filter.name === "gender")
            if (index > -1) {
                response.filters[index].options.splice(0, 1)
                response.filters[index].options[0].s = true
            }
            res.send(response)
            return
        }

        if (
            req.query &&
            req.query.criteria &&
            req.query.criteria.includes("brand:amido") &&
            req.query.criteria.includes("category:jacket")
        ) {
            const response = clone(apiDataFiltered)
            const indexCat = response.filters.findIndex(filter => filter.name === "category")
            if (indexCat > -1) {
                response.filters[indexCat].options.splice(5, 1)
                response.filters[indexCat].options[0].s = true
            }

            const indexGender = response.filters.findIndex(filter => filter.name === "brand")
            if (indexGender > -1) {
                response.filters[genderIndex].options[2].s = true
            }
            res.send(response)
            return
        }

        // select gender-men to see only one option for sleeve
        if (req.query && req.query.criteria && req.query.criteria.includes("gender:men")) {
            const response = {...apiDataStart[start]}
            const genderIndex = response.filters.findIndex(filter => filter.name === "gender")
            const sleeveIndex = response.filters.findIndex(filter => filter.name === "sleeve")
            if (genderIndex > -1) {
                response.filters[genderIndex].options[2].s = true
                response.filters[sleeveIndex].options.splice(1)
            }
            res.send(response)
            return
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("category:jackets")) {
            const response = clone(apiDataFiltered)
            const index = response.filters.findIndex(filter => filter.name === "category")
            if (index > -1) {
                response.filters[index].options.splice(5, 1)
                response.filters[index].options[0].s = true
            }
            res.send(response)
            return
        }

        // select personalised-name to see only one option for personalised
        if (req.query && req.query.criteria && req.query.criteria.includes("personalised:name")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "personalised")
            if (index > -1) {
                response.filters[index].options.splice(1)
                response.filters[index].options[0].s = true
            }
            res.send(response)
            return
        }

        // select deliverby-post to see only one option for deliverby
        if (req.query && req.query.criteria && req.query.criteria.includes("deliverby:post")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "deliverby")
            if (index > -1) {
                response.filters[index].options.splice(1)
                response.filters[index].options[0].s = true
            }
            res.send(response)
            return
        }
        // select size:12+tall for filter model test
        if (req.query && req.query.criteria && req.query.criteria.includes("size:12 tall")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "size")
            if (index > -1) {
                response.filters[index].options[12].s = true
            }
            res.send(response)
            return
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("department-homeware")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "department")
            if (index > -1) {
                response.filters[index].options[0].s = true
            }
            res.send(response)
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("category-shelves")) {
            const response = clone(apiDataFiltered)
            const index = response.filters.findIndex(filter => filter.name === "category")
            if (index > -1) {
                response.filters[index].options[8].s = true
            }
            res.send(response)
            return
        }

        // The following 3 blocks are for the cases where there are multiple categories selected, and we need all of them selected, so we're triggering the return and res.send at the end
        if (req.query && req.query.criteria && req.query.criteria.includes("colour-black")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "colour")
            if (index > -1) {
                response.filters[index].options[0].s = true
            }
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("designfeature-hooded")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "designfeature")
            if (index > -1) {
                response.filters[index].options[0].s = true
            }
        }

        if (req.query && req.query.criteria && req.query.criteria.includes("length-short")) {
            const response = {...apiDataStart[start]}
            const index = response.filters.findIndex(filter => filter.name === "length")
            if (index > -1) {
                response.filters[index].options[0].s = true
            }

            res.send(response)
            return
        }

        res.send(apiDataStart[start])
    } catch (error) {
        console.log(error)
        throw error
    }
}

/***
 * Identical to the real search API behaviour
 *
 * @remarks
 * This handler mimics the search API by filtering [items] by start and pagesize
 * Please do not add additional logic that is specific to a particular test
 */
function smartSearchHandling(req, res) {
    const apiData = clone(smartSearchApiData)

    const pageSize = parseInt(req.query.pagesize)
    const start = parseInt(req.query.start)
    const end = start + pageSize

    apiData.items = apiData.items.filter((_item, index) => {
        return index >= start && index < end
    })

    apiData.pagination.pageSize = pageSize
    apiData.pagination.startItem = start
    apiData.totalResults = smartSearchApiData.items.length

    res.send(apiData)
}
