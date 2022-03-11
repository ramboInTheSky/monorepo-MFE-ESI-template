import env from "../../config/env"
/*  
     Split the criteria url by using // as a split arguement 
     (so it will catch the protocol regardless of http/https, and then rejoin just in case the criteria has // somewhere else inside of it) 
*/
export const httpUrlTrimmer = (urlToTrim: string) => {
    let url = urlToTrim
    if (url.includes("http")) {
        url = url
            .split("//")
            .slice(1)
            .join("//")
    }
    return url
}

export const urlSanitiser = (urlToSanitise: string) => {
    let url = urlToSanitise
    const prefix = env.REACT_APP_SERVE_PATH_PREFIX
    const encodedPrefix = encodeURIComponent(env.REACT_APP_SERVE_PATH_PREFIX)
    if (url?.includes(prefix)) {
        url = [...url.split(prefix)].join("")
    }
    if (url?.includes(encodedPrefix)) {
        url = [...url.split(encodedPrefix)].join("")
    }
    return url
}
