import {IncomingHttpHeaders} from "http"

export type RequestState = {
    headers: IncomingHttpHeaders
    isEnglishLang: boolean
}
