const removeCurrencyAndSpaces = (price: string) => {
    const pricePattern = /\d+|-|,|\./g
    return (price.match(pricePattern) ?? []).join("")
}

export default removeCurrencyAndSpaces
