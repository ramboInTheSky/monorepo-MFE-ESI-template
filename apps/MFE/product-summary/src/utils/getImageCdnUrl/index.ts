import {SettingsSdkKeys} from "../../config/settings"

interface ImageCdn {
    rootUrl: string
    productUrlPart: string
}

const getImageCdnUrl = (configuration: any): ImageCdn => {
    const response: ImageCdn = {
        rootUrl: "",
        productUrlPart: "",
    }
    response.rootUrl = configuration[SettingsSdkKeys.imageCdnUrl].Value.replace(/\/$/, "")
    response.productUrlPart = configuration[SettingsSdkKeys.imageCdnUrlProduct].Value.replace(/\//g, "")

    return response
}

export default getImageCdnUrl
