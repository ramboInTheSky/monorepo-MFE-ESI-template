/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import cors from "../../../middleware/cors"

export const GetFavourite = async (_req: any, res: any) => {
    try {
        // we are using this now for easy modification
        // instead of depending on the server for the same stubs
        const response = await import("./response.json")

        res.send(response)
    } catch (err) {
        res.status(500).end(err)
    }
}

export default (router: Router) => {
    router.get("/favourite", cors,GetFavourite)
}

/* istanbul ignore file */
