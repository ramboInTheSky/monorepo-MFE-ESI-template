// A simple function to parse query parameters and turn them into a string map.

export const parseQueryString = (rawQueryString: string): { param: string } | {} => {
    if (!rawQueryString || rawQueryString.length === 0) {
        return {}
    }

    const [,queryString] = rawQueryString.split("?")

    if (!queryString) {
        return {}
    }

    return queryString.split("&")
    .map((val) => {
        const [key, value] = val.split("=")
        return [
            decodeURIComponent(key),
            decodeURIComponent(value)
        ]
    })
    .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
    }), {})
}