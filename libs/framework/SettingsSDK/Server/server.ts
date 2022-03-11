/* eslint-disable no-console */
import express from "express"
import {SettingsSDK} from "../src"

// Create a new express application instance
const app: express.Application = express()

app.use(SettingsSDK("MONOREPO.FOOTER.API", "featuresettings.json"))

app.get("/", (_req, res) => {
    res.status(res.statusCode).send(res.locals.configuration)
}).listen(3000, err => {
    if(err) throw err
    console.log('listening on port 3000')
})

// export our app
export default app
