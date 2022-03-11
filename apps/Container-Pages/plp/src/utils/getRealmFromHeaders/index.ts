import {IncomingHttpHeaders} from "http"

const getRealmFromHeaders = (headers: IncomingHttpHeaders) => `${headers["x-monorepo-realm"]}`

export default getRealmFromHeaders
