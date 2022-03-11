/* eslint-disable @typescript-eslint/camelcase */
import {publishSiteDetailsEvent} from ".."

interface SiteDetailsObj{
    siteUrl: string
    currencyCode: string 
    fullTerritoryName: string
    territory: string | string[] | undefined;
    language: string | string[] | undefined;
    siteLayout: string | string[] | undefined;
}

export const handleSiteDetails = ({siteLayout, territory, language, siteUrl, fullTerritoryName, currencyCode}: SiteDetailsObj) => {
    publishSiteDetailsEvent({
        device_type: siteLayout,
        site_layout: siteLayout,
        site_country: territory,
        site_language: language,
        domain_name: siteUrl,
        channel_country: fullTerritoryName,
        channel_country_code: territory,
        channel_currency_code: currencyCode,
    })
}