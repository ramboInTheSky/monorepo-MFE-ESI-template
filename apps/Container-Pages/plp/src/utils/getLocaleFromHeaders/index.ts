import {IncomingHttpHeaders} from "http"

const getLocaleFromHeaders = (headers: IncomingHttpHeaders) =>
    `${headers["x-monorepo-language"]}-${(headers["x-monorepo-territory"] as string).toUpperCase()}`

export default getLocaleFromHeaders
