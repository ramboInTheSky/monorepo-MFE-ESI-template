import {FeatureSettings} from "."

describe("Model: Feature setting", () => {
    it("should match the feature setting", () => {
        expect({
            Empire: {
                EmpireName: "MONOREPO.MEGANAV.API",
                Settings: {
                    "meganav.frontend.appCacheTTL": {
                        Value: "3600",
                    },
                    "meganav.frontend.themeVersion": {
                        Value: "v8.0.0",
                    },
                    "meganav.frontend.cache-control.max-age": {
                        Value: "3600",
                    },
                    "meganav.frontend.cache-control.default-meganav.max-age": {
                        Value: "no-store",
                    },
                    "meganav.frontend.defaultPrimaryConfig": {
                        version: "v1.0.0",
                        country: "mx",
                    },
                    "meganav.frontend.defaultSecondaryConfig": {
                        version: "v1.0.0",
                        country: "mx",
                    },
                },
                Realms: [
                    {
                        RealmName: "next",
                        Settings: {
                            "meganav.api.realmName": {
                                Value: "amido",
                            },
                            "meganav.frontend.ImagePlaceholder": {
                                EnableImagePlaceholder: true,
                            },
                        },
                        Territories: [
                            {
                                TerritoryName: "AE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "AE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "AM",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "AM",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "AR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "AR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "AT",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "de",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "de",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "AT",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "6",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "AU",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "AU",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "AZ",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "AZ",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "BE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "fr",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "fr",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "BE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "9",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "BG",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "bg",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "bg",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "BG",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "2",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "BH",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "BH",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "BR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "BR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "BY",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "BY",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "CA",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "fr",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "fr",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "CA",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "9",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "CH",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "de",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "de",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "CH",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "6",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "CL",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "CL",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "CY",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "CY",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "CZ",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "cs",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "cs",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "CZ",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "3",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "DE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "de",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "de",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "DE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "6",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "DK",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "da",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "da",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "DK",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "5",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "EE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "EE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "EG",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "EG",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "ES",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "es",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "es",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "ES",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "8",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "FI",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "FI",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "FR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "fr",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "fr",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "FR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "9",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "GB",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "GB",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "GE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "GE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "GI",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "GI",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "GR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "el",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "el",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "GR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "20",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "HK",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "zh",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "zh",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "HK",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "4",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "HR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "HR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "HU",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "hu",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "hu",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "HU",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "12",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "ID",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "ID",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "IE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "IE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "IL",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "he",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "he",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "IL",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "10",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "IN",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "IN",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "IS",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "IS",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "IT",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "it",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "it",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "IT",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "11",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "JP",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ja",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ja",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "JP",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "23",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "KR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ko",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ko",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "KR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "22",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "KW",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "KW",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "KZ",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "KZ",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "LB",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "LB",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "LT",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "LT",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "LU",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "fr",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "fr",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "LU",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "9",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "LV",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "LV",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "MT",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "MT",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "MX",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "MX",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "MY",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ms",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ms",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "MY",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "1",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "NL",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "nl",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "nl",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "NL",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "13",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "NO",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "NO",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "NZ",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "NZ",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "OM",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "OM",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "PE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "PE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "PH",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "PH",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "PK",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "PK",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "PL",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "pl",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "pl",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "PL",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "14",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "PT",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "PT",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "QA",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "QA",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "RO",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ro",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ro",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "RO",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "15",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "RS",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "RS",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "RU",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "RU",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "SA",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ar",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ar",
                                            },
                                            "meganav.api.direction": {
                                                Value: "rtl",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "SA",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "16",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "SE",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "sv",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "sv",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "SE",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "19",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "SG",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "SG",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "SI",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "sl",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "sl",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "SI",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "18",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "SK",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "sk",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "sk",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "SK",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "17",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "TH",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "TH",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "TR",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "TR",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "TW",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "zh",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "zh",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "TW",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "4",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "UA",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                    {
                                        LanguageName: "ru",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "ru",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "UA",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                        {
                                            Value: "21",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "US",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "US",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                            {
                                TerritoryName: "ZA",
                                Languages: [
                                    {
                                        LanguageName: "en",
                                        Settings: {
                                            "meganav.api.languageName": {
                                                Value: "en",
                                            },
                                            "meganav.api.direction": {
                                                Value: "ltr",
                                            },
                                        },
                                    },
                                ],
                                Settings: {
                                    "meganav.api.territoryName": {
                                        Value: "ZA",
                                    },
                                    "meganav.alternativeLanguages": [
                                        {
                                            Value: "7",
                                        },
                                    ],
                                },
                            },
                        ],
                    }
                ],
            },
            Personas: [
                {
                    PersonaName: "CustomerA",
                    Settings: {
                        "meganav.api.direction": {
                            Value: "rtl",
                        },
                        "meganav.enableMainMenu": {
                            Value: "false",
                        },
                    },
                },
            ],
        } as FeatureSettings).toMatchSnapshot()
    })
})
