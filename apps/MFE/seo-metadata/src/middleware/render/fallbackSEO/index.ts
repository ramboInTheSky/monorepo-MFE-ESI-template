import {Response} from "express"

const fallbackSeo = (res: Response) => {
    res.status(200)
    // x-monorepo-override-seo is used in Akamai to make a fallback when using ESI try attempt/except
    res.set({"x-monorepo-override-seo": "false", "Content-Length": 0, "Content-Type": "text/html"})
    return res.send().end()
}

export default fallbackSeo
