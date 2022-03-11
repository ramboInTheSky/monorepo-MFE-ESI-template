import logger from "@monorepo/core-logger"

import config from "./config.json"

const LEFT_ALIGN = "left"
const RIGHT_ALIGN = "right"
const DEFAULT_MIN_DIGITS = 2
const TYPE_CURRENCY = "currency"
const TYPE_LITERAL = "literal"
const TYPE_GROUP = "group"
const TYPE_DECIMAL = "decimal"

if (typeof Intl !== "object") {
    const expectedValue = "node_modules/full-icu"
    if (!process.env.NODE_ICU_DATA || process.env.NODE_ICU_DATA !== expectedValue) {
        throw new Error(
            `NODE_ICU_DATA environment variable is not set, or not set to the correct value of ${expectedValue}`,
        )
    }
    const err = new Error("Intl is not available. Please install the full-icu module.")
    logger.error(err)
    throw err
}

export const formatPrice = (
    minPrice: number,
    maxPrice: number,
    currency: string,
    locale: string,
    realm: string,
) => {
    return minPrice === maxPrice
        ? formatNumber(minPrice, currency, locale,  realm)
        : `${formatNumber(minPrice, currency, locale,  realm)} - ${formatNumber(
              maxPrice,
              currency,
              locale,
              realm,
          )}`
}

const getCurrencyConfig = (realm: string, locale: string) => {
    const splitLocale = locale?.toLocaleLowerCase().split("-")
    const territory = splitLocale[1]
    const language = splitLocale[0]

    const getId = config.realms[realm]?.[territory]?.[language]?.currencies?.id
    return config.currencies[getId]
}

type ConfigCurrency = {
    currencySymbol: string
    spaceRequired: boolean
    position: string
    decimalSeparatorSymbol: string | null
    groupSeparatorSymbol: string | null
    showNumOfDecimalDigits: number | null
}

const getConfiguredCurrency = (price, locale, configuredCurrency) => {
    const {
        currencySymbol,
        spaceRequired,
        position,
        showNumOfDecimalDigits,
        decimalSeparatorSymbol,
        groupSeparatorSymbol,
    }: ConfigCurrency = configuredCurrency
    let formattedPrice

    const requiredSpacing = spaceRequired ? " " : ""

    
    // showDecimalDigits is used for header mini bag for now
    const numberFormatOptions : Intl.NumberFormatOptions = {
        style: "decimal",
        minimumFractionDigits: showNumOfDecimalDigits ?? DEFAULT_MIN_DIGITS,
        useGrouping: true,
    }
    if (price % 1 === 0) {
        numberFormatOptions.minimumFractionDigits = 0
        numberFormatOptions.maximumFractionDigits = 0
    }

    const configPrice = new Intl.NumberFormat(locale, numberFormatOptions)
    if (configPrice.resolvedOptions().numberingSystem === "latn") {
        let displayedPrice = configPrice.format(price)
        // replacing the group or decimal of the price
        if (groupSeparatorSymbol || decimalSeparatorSymbol) {
            displayedPrice = configPrice
                .formatToParts(price)
                .map(({type, value}) => {
                    if (groupSeparatorSymbol && type === TYPE_GROUP) {
                        // eslint-disable-next-line no-param-reassign
                        value = groupSeparatorSymbol
                    }

                    if (decimalSeparatorSymbol && type === TYPE_DECIMAL) {
                        // eslint-disable-next-line no-param-reassign
                        value = decimalSeparatorSymbol
                    }

                    return value
                })
                .reduce((string, part) => `${string}${part}`)
        }

        switch (position) {
            case LEFT_ALIGN:
                formattedPrice = `${currencySymbol}${requiredSpacing}${displayedPrice}`
                break
            case RIGHT_ALIGN:
                formattedPrice = `${displayedPrice}${requiredSpacing}${currencySymbol}`
                break
            default:
                formattedPrice = `${currencySymbol}${requiredSpacing}${displayedPrice}`
                break
        }
    } else {
        // Logic here is because we need the currency in latin numbers not say arabic, which by default Intl.NumberFormat will convert to
        // If you format sa-AR currency to latin characters the currency symbol is added to wrong side
        // Need to combine correctly formatted numbers, with correctly formatted currency
        const latinCharacterNumberFormat = new Intl.NumberFormat(
            `${locale}-u-nu-latn`,
            numberFormatOptions,
        ).formatToParts(price)

        const numberOnlyLatinCharacterPrice = latinCharacterNumberFormat
            .map(part => {
                if (part.type !== TYPE_CURRENCY && part.type !== TYPE_LITERAL) return part.value
                return ""
            })
            .join("")

        switch (position) {
            case LEFT_ALIGN:
                formattedPrice = `${currencySymbol}${requiredSpacing}${numberOnlyLatinCharacterPrice}`
                break
            case RIGHT_ALIGN:
                formattedPrice = `${numberOnlyLatinCharacterPrice}${requiredSpacing}${currencySymbol}`
                break
            default:
                formattedPrice = `${currencySymbol}${requiredSpacing}${numberOnlyLatinCharacterPrice}`
                break
        }
    }
    return formattedPrice
}

const getCurrency = (price, currency, locale) => {
    // Below is used for other countries apart from apart from batch one countries
    // Please see config.json to see which countries are configured
    // data from config.json is coming from MVC language config

    const numberFormatOptions: Intl.NumberFormatOptions = {
        style: "currency",
        currency,
    }
    if (price % 1 === 0) {
        numberFormatOptions.minimumFractionDigits = 0
        numberFormatOptions.maximumFractionDigits = 0
    }
    const localeNumberFormat = new Intl.NumberFormat(`${locale}`, numberFormatOptions)
    if (localeNumberFormat.resolvedOptions().numberingSystem === "latn") return localeNumberFormat.format(price)

    // Logic here is because we need the currency in latin numbers not say arabic, which by default Intl.NumberFormat will convert to
    // If you format sa-AR currency to latin characters the currency symbol is added to wrong side
    // Need to combine correctly formatted numbers, with correctly formatted currency
    const latinCharacterNumberFormat = new Intl.NumberFormat(`${locale}-u-nu-latn`, numberFormatOptions)
    if (typeof latinCharacterNumberFormat.formatToParts !== "function") return latinCharacterNumberFormat.format(price)

    const latinCharacterNumber = latinCharacterNumberFormat.formatToParts(price)

    const numberOnlyLatinCharacterPrice = latinCharacterNumber
        .map(part => {
            if (part.type !== TYPE_CURRENCY && part.type !== TYPE_LITERAL) return part.value
            return ""
        })
        .join("")

    const currencyPattern = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).formatToParts(1)

    let formattedPrice = ""
    currencyPattern.forEach(part => {
        if (part.type === "currency") {
            if (part.value.endsWith(".")) {
                formattedPrice += part.value.substring(0, part.value.length - 1)
            } else {
                formattedPrice += part.value
            }
        } else if (part.type === "literal") {
            formattedPrice += part.value
        } else {
            formattedPrice += numberOnlyLatinCharacterPrice
        }
    })

    return formattedPrice
}

const formatNumber = (price: number, currency: string, locale: string, realm: string) => {
    const configuredCurrency = getCurrencyConfig(realm, locale)
    if (configuredCurrency) return getConfiguredCurrency(price, locale, configuredCurrency)
    return getCurrency(price, currency, locale)
}
export default formatPrice
