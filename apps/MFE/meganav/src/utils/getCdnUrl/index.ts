import env from "../../config/env"

export const formatCdnPath = (icon: string): string => `${env.REACT_APP_BLOB_STORAGE_PATH.replace(/\/$/, "")}${icon}`
