export const getRegExValue = (valueIn: any, name: string, pattern: string) => {
    const re = new RegExp(name + pattern)
    const value = re.exec(valueIn)
    return value ? unescape(value[1]) : null
}
