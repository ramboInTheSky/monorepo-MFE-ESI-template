/* eslint-disable */

/* istanbul ignore file */
import app from "./server"

if (module.hot) {
    module.hot.accept("./", () => {
        console.log("Server reloading...")
    })
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`React SSR App is running: http://localhost:${process.env.PORT || 3000}`)
})
