export const formatCdnPathWithVariant = (icon: string, realm: string, variant: string): string => {
    const fileName = icon.split("/").pop()
    return `/icons/footer/${realm}/${variant}/${fileName}`
}
