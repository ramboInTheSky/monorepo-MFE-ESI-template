export const selectPriceType = (normalPrice: string, salePrice?: string | null) => {
    const price = salePrice || normalPrice

    return price
}
