import {formatPrice} from "@monorepo/utils"
import {SofaSummaryApiContract} from "models/searchApi/sofa"
import {SummaryData} from "../../models/ProductSummary"
import titleFormatter from "../productTitleFormatter"
import getImageCdnUrl from "../getImageCdnUrl"
import {SettingsSdkKeys} from "../../config/settings"
import filterFits from "../filterFits"
import {
    ProductType,
    SuitType,
    SofaType,
    SOFA_COLOUR_CHIP_PREFIX,
    COLOUR_CHIP_PREFIX,
    IMAGE_EXTENSION,
    LG_IMAGE_PATH,
} from "../../config/constants"
import {isApiSuitSummaryData, isApiSofaSummaryData} from "../../models/searchApi/typeGuards"
import {ProductSummaryApiContract} from "../../models/searchApi/product"
import {SuitSummaryApiContract} from "../../models/searchApi/suit"

const mapProductSummaryApiToDuckState = (
    apiData: ProductSummaryApiContract | SuitSummaryApiContract | SofaSummaryApiContract,
    configuration: any,
    siteUrl: string,
    realm: string,
): SummaryData => {
    const imageCdnUrl = getImageCdnUrl(configuration)
    const locale = `${configuration[SettingsSdkKeys.Language].Value}-${configuration[SettingsSdkKeys.Territory].Value}`
    const commonSummaryProperties = {
        title: titleFormatter(apiData.title),
        id: apiData.itemNumber,
        brand: apiData.brand ?? null,
        department: apiData.department ?? null,
        fit: apiData.fit ?? null,
        baseUrl: siteUrl,
        imageCdnUrl: imageCdnUrl.rootUrl,
        productImageUrlPart: imageCdnUrl.productUrlPart,
        showNewIn: false,
        saleSash: configuration[SettingsSdkKeys.saleSash]?.Value ?? null,
        saleSashPosition: configuration[SettingsSdkKeys.saleSashPosition]?.Value ?? null,
    } as SummaryData

    let response: SummaryData
    const {rootUrl, productUrlPart} = imageCdnUrl
    if (isApiSuitSummaryData(apiData)) {
        response = {
            ...commonSummaryProperties,
            type: SuitType,
            currencyCode: apiData.currencyCode,
            colourways: apiData.colourways.map((colourway, index) => {
                const colourwayData = {
                    id: colourway.itemNumber,
                    url: colourway.url,
                    selected: index === 0,
                    fits: filterFits(colourway.fits),
                    colour: colourway.colour,
                    title: colourway.title,
                    overallStarRating: colourway.overallStarRating ?? 0,
                    colourChipImage: `${rootUrl}/${COLOUR_CHIP_PREFIX}/${colourway.itemNumber}${IMAGE_EXTENSION}`,
                    mainImage: `${rootUrl}/${productUrlPart}/${LG_IMAGE_PATH}/${colourway.itemNumber}${IMAGE_EXTENSION}`,
                    price: formatPrice(
                        colourway.itemPrice.minPrice,
                        colourway.itemPrice.maxPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    wasPrice:
                        colourway.itemPrice.wasMinPrice && colourway.itemPrice.wasMaxPrice
                            ? formatPrice(
                                  colourway.itemPrice.wasMinPrice,
                                  colourway.itemPrice.wasMaxPrice,
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    salePrice:
                        colourway.itemPrice.saleMinPrice && colourway.itemPrice.saleMaxPrice
                            ? formatPrice(
                                  colourway.itemPrice.saleMinPrice,
                                  colourway.itemPrice.saleMaxPrice,
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    minPrice: formatPrice(
                        colourway.itemPrice.minPrice,
                        colourway.itemPrice.minPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    associatedColourway: {
                        type: colourway.associatedColourway.type,
                        price: formatPrice(
                            colourway.associatedColourway.itemPrice.minPrice,
                            colourway.associatedColourway.itemPrice.maxPrice,
                            apiData.currencyCode,
                            locale,
                            realm,
                        ),
                        wasPrice:
                            colourway.associatedColourway.itemPrice.wasMinPrice &&
                            colourway.associatedColourway.itemPrice.wasMaxPrice
                                ? formatPrice(
                                      colourway.associatedColourway.itemPrice.wasMinPrice,
                                      colourway.associatedColourway.itemPrice.wasMaxPrice,
                                      apiData.currencyCode,
                                      locale,
                                      realm,
                                  )
                                : null,
                        salePrice:
                            colourway.associatedColourway.itemPrice.saleMinPrice &&
                            colourway.associatedColourway.itemPrice.saleMaxPrice
                                ? formatPrice(
                                      colourway.associatedColourway.itemPrice.saleMinPrice,
                                      colourway.associatedColourway.itemPrice.saleMaxPrice,
                                      apiData.currencyCode,
                                      locale,
                                      realm,
                                  )
                                : null,
                    },
                    suitPrice: formatPrice(
                        colourway.associatedColourway.itemPrice.minPrice + colourway.itemPrice.minPrice,
                        colourway.associatedColourway.itemPrice.maxPrice + colourway.itemPrice.maxPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    wasSuitPrice:
                        (colourway.associatedColourway.itemPrice.wasMinPrice || colourway.itemPrice.wasMinPrice) &&
                        (colourway.associatedColourway.itemPrice.wasMaxPrice || colourway.itemPrice.wasMaxPrice)
                            ? formatPrice(
                                  (colourway.associatedColourway.itemPrice.wasMinPrice ||
                                      colourway.associatedColourway.itemPrice.minPrice) +
                                      (colourway.itemPrice.wasMinPrice || colourway.itemPrice.minPrice),
                                  (colourway.associatedColourway.itemPrice.wasMaxPrice ||
                                      colourway.associatedColourway.itemPrice.maxPrice) +
                                      (colourway.itemPrice.wasMaxPrice || colourway.itemPrice.maxPrice),
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    saleSuitPrice:
                        (colourway.associatedColourway.itemPrice.saleMinPrice || colourway.itemPrice.saleMinPrice) &&
                        (colourway.associatedColourway.itemPrice.saleMaxPrice || colourway.itemPrice.saleMaxPrice)
                            ? formatPrice(
                                  (colourway.associatedColourway.itemPrice.saleMinPrice ||
                                      colourway.associatedColourway.itemPrice.minPrice) +
                                      (colourway.itemPrice.saleMinPrice || colourway.itemPrice.minPrice),
                                  (colourway.associatedColourway.itemPrice.saleMaxPrice ||
                                      colourway.associatedColourway.itemPrice.maxPrice) +
                                      (colourway.itemPrice.saleMaxPrice || colourway.itemPrice.maxPrice),
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    personalisedType: colourway.personalisedType ? colourway.personalisedType : "",
                }
                return colourwayData
            }),
        }
    } else if (isApiSofaSummaryData(apiData)) {
        response = {
            ...commonSummaryProperties,
            type: SofaType,
            currencyCode: apiData.currencyCode,
            colourways: apiData.colourways.map((colourway, index) => {
                const colourwayData = {
                    id: colourway.itemNumber,
                    url: colourway.url,
                    selected: index === 0,
                    fits: filterFits(colourway.fits),
                    colour: colourway.colour,
                    title: colourway.colour,
                    overallStarRating: colourway.overallStarRating ?? 0,
                    mainImage: `${rootUrl}/${productUrlPart}/${LG_IMAGE_PATH}/${colourway.mainImage}`,
                    colourChipImage: `${rootUrl}/${SOFA_COLOUR_CHIP_PREFIX}/${colourway.colourChipImage}`,
                    price: formatPrice(
                        colourway.itemPrice.minPrice,
                        colourway.itemPrice.maxPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    wasPrice:
                        colourway.itemPrice.wasMinPrice && colourway.itemPrice.wasMaxPrice
                            ? formatPrice(
                                  colourway.itemPrice.wasMinPrice,
                                  colourway.itemPrice.wasMaxPrice,
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    salePrice:
                        colourway.itemPrice.saleMinPrice && colourway.itemPrice.saleMaxPrice
                            ? formatPrice(
                                  colourway.itemPrice.saleMinPrice,
                                  colourway.itemPrice.saleMaxPrice,
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    minPrice: formatPrice(
                        colourway.itemPrice.minPrice,
                        colourway.itemPrice.minPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    personalisedType: colourway.personalisedType ? colourway.personalisedType : "",
                }
                return colourwayData
            }),
        }
    } else {
        response = {
            ...commonSummaryProperties,
            type: ProductType,
            currencyCode: apiData.currencyCode,
            colourways: apiData.colourways.map((colourway, index) => {
                const colourwayData = {
                    id: colourway.itemNumber,
                    url: colourway.url,
                    selected: index === 0,
                    fits: filterFits(colourway.fits),
                    colour: colourway.colour,
                    title: colourway.title,
                    overallStarRating: colourway.overallStarRating ?? 0,
                    colourChipImage: `${rootUrl}/${COLOUR_CHIP_PREFIX}/${colourway.itemNumber}${IMAGE_EXTENSION}`,
                    mainImage: `${rootUrl}/${productUrlPart}/${LG_IMAGE_PATH}/${colourway.itemNumber}${IMAGE_EXTENSION}`,
                    price: formatPrice(
                        colourway.itemPrice.minPrice,
                        colourway.itemPrice.maxPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    wasPrice:
                        colourway.itemPrice.wasMinPrice && colourway.itemPrice.wasMaxPrice
                            ? formatPrice(
                                  colourway.itemPrice.wasMinPrice,
                                  colourway.itemPrice.wasMaxPrice,
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    salePrice:
                        colourway.itemPrice.saleMinPrice && colourway.itemPrice.saleMaxPrice
                            ? formatPrice(
                                  colourway.itemPrice.saleMinPrice,
                                  colourway.itemPrice.saleMaxPrice,
                                  apiData.currencyCode,
                                  locale,
                                  realm,
                              )
                            : null,
                    minPrice: formatPrice(
                        colourway.itemPrice.minPrice,
                        colourway.itemPrice.minPrice,
                        apiData.currencyCode,
                        locale,
                        realm,
                    ),
                    personalisedType: colourway.personalisedType ? colourway.personalisedType : "",
                }
                return colourwayData
            }),
        }
    }

    return response
}

export default mapProductSummaryApiToDuckState
