import {TOKEN_CANCELLATION_FLAG} from "../../config/constants"
import axios from "../axios"

let timerId: ReturnType<typeof setTimeout>
let tokenSource: ReturnType<typeof axios.CancelToken.source>

async function asyncImmediateTimeout(timeout: number) {
    clearTimeout(timerId)

    await new Promise(resolve => {
        timerId = setTimeout(resolve, timeout)
    })
}

export async function debounceAndGetCancelToken(timeout: number) {
    if (typeof tokenSource !== typeof undefined) {
        tokenSource.cancel(TOKEN_CANCELLATION_FLAG)
    }
    await asyncImmediateTimeout(timeout)
    tokenSource = axios.CancelToken.source()

    return tokenSource.token
}
