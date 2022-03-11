/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")

const morgan = require("morgan")

const MOCKS_DIR = "__mocks__"

const app = express()

const port = 3020

app.use(morgan("dev"))

app.get("/favourite", (_req, res) => {
    res.json({})
})

app.get("/CountryRedirect/Update", (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json; charset=UTF-8")
        res.send(200)
    } catch (error) {
        console.log(error)
        throw error
    }
})

app.get("/NX/CountryRedirect", (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json; charset=UTF-8")
        if (req.query.ipaddress) {
            const data = {
                ISOCountryCode: "SA",
                ISOCountryName: "Saudi Arabia",
                RedirectUrl: "",
            }
            res.send(data)
        } else {
            const data = {
                ISOCountryCode: null,
                ISOCountryName: null,
                RedirectUrl: "",
            }
            res.send(data)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
})

app.get("/:realm/:territory/:language/v1/headers/Default", (req, res) => {
    try {
        res.setHeader("Content-Type", "application/json; charset=UTF-8")
        const realm = req.params.realm.trim().toLowerCase() || "amido"
        data = require(`../${MOCKS_DIR}/${realm}.json`)
        res.send(data)
    } catch (error) {
        console.log(error)
        throw error
    }
})
app.get(
    "/autocomplete?term=shirt&accountId=6042&domainKey=amido&authKey=vyzz50jis1i9dbxj&uid2=undefined",
    (req, res) => {
        res.send({
            responseHeader: {zkConnected: true, status: 0, QTime: 0},
            response: {
                q: "shi",
                suggestions: [
                    {q: "shirt dress", dq: "shirt dress"},
                    {q: "shirt", dq: "shirt"},
                    {q: "shift dress", dq: "shift dress"},
                    {q: "white t shirt", dq: "white t shirt"},
                    {q: "t shirt", dq: "t shirt"},
                    {q: "long sleeve t shirt", dq: "long sleeve t shirt"},
                    {q: "denim shirt", dq: "denim shirt"},
                    {q: "white shirt", dq: "white shirt"},
                    {q: "blue shirt", dq: "blue shirt"},
                    {q: "polo shirt", dq: "polo shirt"},
                ],
                numFound: 21,
                products: [
                    {
                        sale_price: 28,
                        url: "https://www.amido.com/style/st578614/339915?_br_psugg_q=shirt+dress#339915",
                        pid: "339915",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/339915.jpg",
                        title: "blue animal shirt dress",
                    },
                    {
                        sale_price: 48,
                        url: "https://www.amido.com/style/st463714/276135?_br_psugg_q=shirt+dress#276135",
                        pid: "276135",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/276135.jpg",
                        title: "purple paisley belted maxi shirt dress",
                    },
                    {
                        sale_price: 16,
                        url: "https://www.amido.com/style/st478337/982586?_br_psugg_q=shirt+dress#982586",
                        pid: "982586",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/982586.jpg",
                        title: "tan palm midi shirt dress",
                    },
                    {
                        sale_price: 38,
                        url: "https://www.amido.com/g61136s13/767587?_br_psugg_q=shirt+dress#767587",
                        pid: "767587",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/767587.jpg",
                        title: "black utility dress",
                    },
                    {
                        sale_price: 23,
                        url: "https://www.amido.com/style/st488544?_br_psugg_q=shirt+dress#662073",
                        pid: "662073",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/662073.jpg",
                        title: "blue tencel™ utility t-shirt dress",
                    },
                    {
                        sale_price: 14,
                        url: "https://www.amido.com/style/st391258/148864?_br_psugg_q=shirt+dress#148864",
                        pid: "148864",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/148864.jpg",
                        title: "red shirt dress",
                    },
                    {
                        sale_price: 25,
                        url: "https://www.amido.com/style/esr43117?_br_psugg_q=shirt+dress#R43117",
                        pid: "R43117",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/R43117.jpg",
                        title: "missguided frill cuff dalmatian shirt dress",
                    },
                    {
                        sale_price: 28,
                        url: "https://www.amido.com/style/st515736/403640?_br_psugg_q=shirt+dress#403640",
                        pid: "403640",
                        thumb_image:
                            "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/403640.jpg",
                        title: "red geo print midi shirt dress",
                    },
                ],
            },
        })
    },
)
app.get("/autocomplete?term=shi&accountId=6291&domainKey=fabled&authKey=&uid2=undefined", (req, res) => {
    res.send({
        responseHeader: {zkConnected: true, status: 0, QTime: 0},
        response: {
            q: "shi",
            suggestions: [
                {q: "shirt dress", dq: "shirt dress"},
                {q: "shirt", dq: "shirt"},
                {q: "shift dress", dq: "shift dress"},
                {q: "white t shirt", dq: "white t shirt"},
                {q: "t shirt", dq: "t shirt"},
                {q: "long sleeve t shirt", dq: "long sleeve t shirt"},
                {q: "denim shirt", dq: "denim shirt"},
                {q: "white shirt", dq: "white shirt"},
                {q: "blue shirt", dq: "blue shirt"},
                {q: "polo shirt", dq: "polo shirt"},
            ],
            numFound: 21,
            products: [
                {
                    sale_price: 28,
                    url: "https://www.amido.com/style/st578614/339915?_br_psugg_q=shirt+dress#339915",
                    pid: "339915",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/339915.jpg",
                    title: "blue animal shirt dress",
                },
                {
                    sale_price: 48,
                    url: "https://www.amido.com/style/st463714/276135?_br_psugg_q=shirt+dress#276135",
                    pid: "276135",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/276135.jpg",
                    title: "purple paisley belted maxi shirt dress",
                },
                {
                    sale_price: 16,
                    url: "https://www.amido.com/style/st478337/982586?_br_psugg_q=shirt+dress#982586",
                    pid: "982586",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/982586.jpg",
                    title: "tan palm midi shirt dress",
                },
                {
                    sale_price: 38,
                    url: "https://www.amido.com/g61136s13/767587?_br_psugg_q=shirt+dress#767587",
                    pid: "767587",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/767587.jpg",
                    title: "black utility dress",
                },
                {
                    sale_price: 23,
                    url: "https://www.amido.com/style/st488544?_br_psugg_q=shirt+dress#662073",
                    pid: "662073",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/662073.jpg",
                    title: "blue tencel™ utility t-shirt dress",
                },
                {
                    sale_price: 14,
                    url: "https://www.amido.com/style/st391258/148864?_br_psugg_q=shirt+dress#148864",
                    pid: "148864",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/148864.jpg",
                    title: "red shirt dress",
                },
                {
                    sale_price: 25,
                    url: "https://www.amido.com/style/esr43117?_br_psugg_q=shirt+dress#R43117",
                    pid: "R43117",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/R43117.jpg",
                    title: "missguided frill cuff dalmatian shirt dress",
                },
                {
                    sale_price: 28,
                    url: "https://www.amido.com/style/st515736/403640?_br_psugg_q=shirt+dress#403640",
                    pid: "403640",
                    thumb_image:
                        "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/403640.jpg",
                    title: "red geo print midi shirt dress",
                },
            ],
        },
    })
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
