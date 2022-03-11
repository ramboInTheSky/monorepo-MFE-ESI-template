import env from "../../config/env"

export const formatCdnPath = (icon: string): string => `${env.REACT_APP_BLOB_STORAGE_PATH.replace(/\/$/, "")}${icon}`

export const formatCdnPathWithVariant = (icon: string, realm: string, variant: string): string => {
    const assetName = icon.split("/").pop()
    const iconPath = `/icons/header/${realm}/${variant}/${assetName}`
    return formatCdnPath(iconPath)
}
