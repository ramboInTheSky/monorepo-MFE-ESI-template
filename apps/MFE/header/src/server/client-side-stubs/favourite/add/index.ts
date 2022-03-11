/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import cors from "../../../middleware/cors"

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const AddFavourite = async (_req: any, res: any) => {
    try {
        const response = await import("./response.json")

        await timeout(1000)
        res.send(response)
    
    } catch (err) {
        res.status(500).end(err)
    }
}

export default (router: Router) => {
    router.options("/favourite", cors)
    router.post("/favourite",cors, AddFavourite)
}

/* istanbul ignore file */
