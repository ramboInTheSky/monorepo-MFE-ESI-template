/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import cors from "../../../middleware/cors"
import axios from "../../../core/xhr"

export const GetBag = async (req: any, res: any) => {
    const {skipRebuild, ap} = req.query
    try {
        // we are using this now for easy modification
        // instead of depending on the server for the same stubs
        const response =
            ap === "false" && skipRebuild === "false"
                ? await import("./response.json")
                : (
                      await axios.get(
                          `https://ecmsearchamssxeun.azure-api.net/bag/get?skipRebuild=${skipRebuild}&ap=${ap}`,
                      )
                  ).data

        res.send(response)
    } catch (err) {
        res.status(500).end(err)
    }
}

export default (router: Router) => {
    router.get("/bag/get",cors, GetBag)
}

/* istanbul ignore file */
