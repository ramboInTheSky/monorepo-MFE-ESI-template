/* eslint-disable import/no-extraneous-dependencies */
import express, {Router} from "express"
import cors from "../../middleware/cors"

export const Update = (req: any, res: any) => {
    if (req.body.Attempt === 2) {
        res.status(200)
    } else {
        res.status(500)
    }
    res.send("OK")
}

export default (router: Router) => {
    router.post("/CountryRedirect/Update",cors, express.json(), Update)
}

/* istanbul ignore file */
