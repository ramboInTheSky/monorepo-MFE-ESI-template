/* eslint-disable prefer-template */
/* istanbul ignore file */
const express = require("express")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")

const app = express()

const port = 3339

app.use(morgan("dev"))

app.use(express.static(__dirname + "/public"))

app.get("/:realm/:territory/:language/:version/search-banners/:url", (req, res) => {
    const realm = req.params.realm

    if (req.params.territory === "mx") {
        return res.status(204).send("No Content")
    }

    const requestUrl = req.params.url

    const dir = "./dev_search_banner_server/public/templates"
    let template = `${dir}/imageCtasAndCopy.html`

    const css = {
        amido: "searchBanner.css",
    }

    if (!!requestUrl) {
        /* amido realm */
        //This is just test responses to test various scenarios / templates
        //No Content Response
        if (requestUrl.includes("boys")) {
            return res.status(204).send("No Content")
        }

        //Not Found Response
        if (requestUrl.includes("girls")) {
            return res.status(404).send("Not Found")
        }

        //CTA's Template Response
        if (requestUrl.includes("sportswear")) {
            template = `${dir}/ctas.html`
        }

        //CTA's and Copy Template Response
        if (requestUrl.includes("boots")) {
            template = `${dir}/ctasAndCopy.html`
        }

        //CTA's, Copy & Strip Template Response
        if (requestUrl.includes("department-homeware")) {
            template = `${dir}/ctasCopyAndStrip.html`
            //For testing purposes
            // css = "alternateSearchBanner.css"
        }

        //Roundels & Copy Template Response
        if (requestUrl.includes("productaffiliation-footwear")) {
            template = `${dir}/roundelsCopy.html`
        }

        //Roundels
        if (requestUrl.includes("gender-women")) {
            template = `${dir}/roundels.html`
        }

        //Schoolwear - CTA's, Copy & Strip Template Response
        if (requestUrl.includes("schoolwear")) {
            template = `${dir}/schoolwearCtasCopyAndStrip.html`
        }

        //Beauty - Image & Copy Template Response
        if (requestUrl.includes("beauty")) {
            template = `${dir}/imageAndCopy.html`
        }

        //Lingerie - Copy, Roundels, Title, Cta's and Strip Template Response
        if (requestUrl.includes("lingerie")) {
            template = `${dir}/lingerie.html`
        }
    }

    const bannerHtml = fs.readFileSync(path.resolve(template), "utf8")

    const response = {
        content: bannerHtml,
        styleSheet: css[realm],
    }

    return res.send(response)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
