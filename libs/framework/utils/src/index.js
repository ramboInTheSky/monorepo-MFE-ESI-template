"use strict"

Object.defineProperty(exports, "__esModule", {value: true})

var logger = require("@monorepo/core-logger")

function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e}
}

var logger__default = /*#__PURE__*/ _interopDefaultLegacy(logger)

var replaceText = function (string, replaceValue, regex) {
    return string.replace(regex, replaceValue)
}
var formatTextTestIds = function (string) {
    var regex = / /gi
    var replaceValue = "-"
    return string.replace(regex, replaceValue).toLocaleLowerCase()
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function () {
    __assign =
        Object.assign ||
        function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i]
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
            }
            return t
        }
    return __assign.apply(this, arguments)
}

var getCustomHeader = function (headers, customHeader) {
    var _a
    return (_a = {}), (_a[customHeader] = headers[customHeader]), _a
}
var getSettingsHeaders = function (headers) {
    validateHeaders(headers, "getSettingsHeaders")
    return __assign(
        __assign(
            __assign(
                {},
                headers["x-monorepo-persona"] && {
                    "x-monorepo-persona": headers["x-monorepo-persona"],
                },
            ),
            headers["x-monorepo-time-machine-date"] && {
                "x-monorepo-time-machine-date": headers["x-monorepo-time-machine-date"],
            },
        ),
        {
            "x-monorepo-language": headers["x-monorepo-language"],
            "x-monorepo-realm": headers["x-monorepo-realm"],
            "x-monorepo-territory": headers["x-monorepo-territory"],
            "x-monorepo-correlation-id": headers["x-monorepo-correlation-id"],
            "x-monorepo-viewport-size": headers["x-monorepo-viewport-size"] || "",
            "x-monorepo-siteurl": headers["x-monorepo-siteurl"] || "",
        },
    )
}
var getSettingsHeadersAsObject = function (headers) {
    validateHeaders(headers, "getSettingsHeadersAsObject")
    return {
        language: headers["x-monorepo-language"],
        realm: headers["x-monorepo-realm"],
        territory: headers["x-monorepo-territory"],
        viewportSize: headers["x-monorepo-viewport-size"] || "",
        persona: headers["x-monorepo-persona"] || undefined,
        timeMachine: headers["x-monorepo-time-machine-date"] || undefined,
    }
}
var validateHeaders = function (headers, caller) {
    if (
        !headers ||
        !headers["x-monorepo-language"] ||
        !headers["x-monorepo-realm"] ||
        !headers["x-monorepo-territory"] ||
        !headers["x-monorepo-correlation-id"]
    )
        throw new Error(caller + " called with no headers")
}

var realms = {
    amido: {
        ae: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ar: {
                currencies: {
                    id: "",
                },
            },
        },
        am: {
            en: {
                currencies: {
                    id: "124",
                },
            },
        },
        ar: {
            en: {
                currencies: {
                    id: "107",
                },
            },
        },
        at: {
            en: {
                currencies: {
                    id: "95",
                },
            },
            de: {
                currencies: {
                    id: "11",
                },
            },
        },
        au: {
            en: {
                currencies: {
                    id: "",
                },
            },
        },
        az: {
            en: {
                currencies: {
                    id: "121",
                },
            },
            ru: {
                currencies: {
                    id: "",
                },
            },
        },
        be: {
            en: {
                currencies: {
                    id: "",
                },
            },
            fr: {
                currencies: {
                    id: "",
                },
            },
        },
        bg: {
            en: {
                currencies: {
                    id: "14",
                },
            },
            bg: {
                currencies: {
                    id: "77",
                },
            },
        },
        bh: {
            en: {
                currencies: {
                    id: "106",
                },
            },
            ar: {
                currencies: {
                    id: "77",
                },
            },
        },
        br: {
            en: {
                currencies: {
                    id: "106",
                },
            },
        },
        by: {
            en: {
                currencies: {
                    id: "123",
                },
            },
            ru: {
                currencies: {
                    id: "",
                },
            },
        },
        ca: {
            en: {
                currencies: {
                    id: "15",
                },
            },
            fr: {
                currencies: {
                    id: "16",
                },
            },
        },
        ch: {
            en: {
                currencies: {
                    id: "60",
                },
            },
            de: {
                currencies: {
                    id: "59",
                },
            },
        },
        cl: {
            en: {
                currencies: {
                    id: "104",
                },
            },
        },
        cy: {
            en: {
                currencies: {
                    id: "97",
                },
            },
        },
        cz: {
            en: {
                currencies: {
                    id: "19",
                },
            },
            cs: {
                currencies: {
                    id: "18",
                },
            },
        },
        de: {
            en: {
                currencies: {
                    id: "",
                },
            },
            de: {
                currencies: {
                    id: "",
                },
            },
        },
        dk: {
            en: {
                currencies: {
                    id: "20",
                },
            },
            da: {
                currencies: {
                    id: "80",
                },
            },
        },
        ee: {
            en: {
                currencies: {
                    id: "119",
                },
            },
            ru: {
                currencies: {
                    id: "118",
                },
            },
        },
        eg: {
            en: {
                currencies: {
                    id: "21",
                },
            },
            ar: {
                currencies: {
                    id: "22",
                },
            },
        },
        es: {
            en: {
                currencies: {
                    id: "91",
                },
            },
            es: {
                currencies: {
                    id: "1",
                },
            },
        },
        fi: {
            en: {
                currencies: {
                    id: "98",
                },
            },
        },
        fr: {
            en: {
                currencies: {
                    id: "90",
                },
            },
            fr: {
                currencies: {
                    id: "89",
                },
            },
        },
        gb: {
            en: {
                currencies: {
                    id: "",
                },
            },
        },
        ge: {
            en: {
                currencies: {
                    id: "125",
                },
            },
        },
        gi: {
            en: {
                currencies: {
                    id: "99",
                },
            },
        },
        gr: {
            en: {
                currencies: {
                    id: "96",
                },
            },
            el: {
                currencies: {
                    id: "81",
                },
            },
        },
        hk: {
            en: {
                currencies: {
                    id: "",
                },
            },
            zh: {
                currencies: {
                    id: "",
                },
            },
        },
        hr: {
            en: {
                currencies: {
                    id: "17",
                },
            },
        },
        hu: {
            en: {
                currencies: {
                    id: "79",
                },
            },
            hu: {
                currencies: {
                    id: "75",
                },
            },
        },
        id: {
            en: {
                currencies: {
                    id: "110",
                },
            },
        },
        ie: {
            en: {
                currencies: {
                    id: "",
                },
            },
        },
        il: {
            en: {
                currencies: {
                    id: "",
                },
            },
            he: {
                currencies: {
                    id: "",
                },
            },
        },
        in: {
            en: {
                currencies: {
                    id: "26",
                },
            },
        },
        is: {
            en: {
                currencies: {
                    id: "101",
                },
            },
        },
        it: {
            en: {
                currencies: {
                    id: "94",
                },
            },
            it: {
                currencies: {
                    id: "6",
                },
            },
        },
        jp: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ja: {
                currencies: {
                    id: "",
                },
            },
        },
        kr: {
            en: {
                currencies: {
                    id: "73",
                },
            },
            ko: {
                currencies: {
                    id: "76",
                },
            },
        },
        kw: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ar: {
                currencies: {
                    id: "",
                },
            },
        },
        kz: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ru: {
                currencies: {
                    id: "",
                },
            },
        },
        lb: {
            en: {
                currencies: {
                    id: "36",
                },
            },
            ar: {
                currencies: {
                    id: "36",
                },
            },
        },
        lt: {
            en: {
                currencies: {
                    id: "117",
                },
            },
            ru: {
                currencies: {
                    id: "116",
                },
            },
        },
        lu: {
            en: {
                currencies: {
                    id: "93",
                },
            },
            fr: {
                currencies: {
                    id: "92",
                },
            },
        },
        lv: {
            en: {
                currencies: {
                    id: "115",
                },
            },
            ru: {
                currencies: {
                    id: "114",
                },
            },
        },
        mt: {
            en: {
                currencies: {
                    id: "",
                },
            },
        },
        mx: {
            en: {
                currencies: {
                    id: "103",
                },
            },
        },
        my: {
            en: {
                currencies: {
                    id: "37",
                },
            },
            ms: {
                currencies: {
                    id: "82",
                },
            },
        },
        nl: {
            en: {
                currencies: {
                    id: "",
                },
            },
            nl: {
                currencies: {
                    id: "",
                },
            },
        },
        no: {
            en: {
                currencies: {
                    id: "40",
                },
            },
        },
        nz: {
            en: {
                currencies: {
                    id: "69",
                },
            },
        },
        om: {
            en: {
                currencies: {
                    id: "42",
                },
            },
            ar: {
                currencies: {
                    id: "41",
                },
            },
        },
        pe: {
            en: {
                currencies: {
                    id: "105",
                },
            },
        },
        ph: {
            en: {
                currencies: {
                    id: "111",
                },
            },
        },
        pk: {
            en: {
                currencies: {
                    id: "108",
                },
            },
            fr: {
                currencies: {
                    id: "89",
                },
            },
        },
        pl: {
            en: {
                currencies: {
                    id: "",
                },
            },
            pl: {
                currencies: {
                    id: "",
                },
            },
        },
        pt: {
            en: {
                currencies: {
                    id: "100",
                },
            },
            fr: {
                currencies: {
                    id: "89",
                },
            },
        },
        qa: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ar: {
                currencies: {
                    id: "",
                },
            },
        },
        ro: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ro: {
                currencies: {
                    id: "",
                },
            },
        },
        rs: {
            en: {
                currencies: {
                    id: "72",
                },
            },
        },
        ru: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ru: {
                currencies: {
                    id: "",
                },
            },
        },
        sa: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ar: {
                currencies: {
                    id: "",
                },
            },
        },
        se: {
            en: {
                currencies: {
                    id: "74",
                },
            },
            sv: {
                currencies: {
                    id: "74",
                },
            },
        },
        sg: {
            en: {
                currencies: {
                    id: "53",
                },
            },
        },
        si: {
            en: {
                currencies: {
                    id: "113",
                },
            },
            sl: {
                currencies: {
                    id: "56",
                },
            },
        },
        sk: {
            en: {
                currencies: {
                    id: "",
                },
            },
            sk: {
                currencies: {
                    id: "",
                },
            },
        },
        th: {
            en: {
                currencies: {
                    id: "109",
                },
            },
        },
        tr: {
            en: {
                currencies: {
                    id: "63",
                },
            },
        },
        tw: {
            en: {
                currencies: {
                    id: "62",
                },
            },
            zh: {
                currencies: {
                    id: "61",
                },
            },
        },
        ua: {
            en: {
                currencies: {
                    id: "",
                },
            },
            ru: {
                currencies: {
                    id: "",
                },
            },
        },
        us: {
            en: {
                currencies: {
                    id: "",
                },
            },
        },
        za: {
            en: {
                currencies: {
                    id: "57",
                },
            },
        },
    },
}
var currencies = {
    1: {
        currencySymbol: "€",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    6: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    11: {
        currencySymbol: "€",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    14: {
        currencySymbol: "BGN",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    15: {
        currencySymbol: "CA$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    16: {
        currencySymbol: "CA$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    17: {
        currencySymbol: "HRK",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    18: {
        currencySymbol: "Kč",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    19: {
        currencySymbol: "Kč",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    20: {
        currencySymbol: "DKK",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    21: {
        currencySymbol: "EGP",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    22: {
        currencySymbol: "ج.م",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    26: {
        currencySymbol: "INR",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    36: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    37: {
        currencySymbol: "MYR",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    40: {
        currencySymbol: "kr",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    41: {
        currencySymbol: "ر.ع",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    42: {
        currencySymbol: "OMR",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    53: {
        currencySymbol: "SGD",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    56: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    57: {
        currencySymbol: "R",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    59: {
        currencySymbol: "CHF",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: ",",
        groupSeparatorSymbol: ".",
        showNumOfDecimalDigits: null,
    },
    60: {
        currencySymbol: "CHF",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    61: {
        currencySymbol: "NT$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    62: {
        currencySymbol: "NT$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    63: {
        currencySymbol: "TRY",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    69: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    72: {
        currencySymbol: "RSD",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    73: {
        currencySymbol: "KRW",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    74: {
        currencySymbol: "kr",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: " ",
        showNumOfDecimalDigits: null,
    },
    75: {
        currencySymbol: "Ft",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    76: {
        currencySymbol: "KRW",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    77: {
        currencySymbol: "BGN",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    79: {
        currencySymbol: "Ft",
        spaceRequired: true,
        position: "right",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    80: {
        currencySymbol: "DKK",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    81: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    82: {
        currencySymbol: "MYR",
        spaceRequired: true,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: 2,
    },
    89: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    90: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    91: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    92: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    93: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    94: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    95: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    96: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    97: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    98: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    99: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    100: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    101: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    103: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    104: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    105: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    106: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    107: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    108: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    109: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    110: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    111: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    113: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    114: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    115: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    116: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    117: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
    118: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    119: {
        currencySymbol: "€",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    121: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    123: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    124: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: null,
        groupSeparatorSymbol: null,
        showNumOfDecimalDigits: null,
    },
    125: {
        currencySymbol: "$",
        spaceRequired: false,
        position: "left",
        decimalSeparatorSymbol: ".",
        groupSeparatorSymbol: ",",
        showNumOfDecimalDigits: null,
    },
}
var config = {
    realms: realms,
    currencies: currencies,
}

var LEFT_ALIGN = "left"
var RIGHT_ALIGN = "right"
var DEFAULT_MIN_DIGITS = 2
var TYPE_CURRENCY = "currency"
var TYPE_LITERAL = "literal"
var TYPE_GROUP = "group"
var TYPE_DECIMAL = "decimal"
if (typeof Intl !== "object") {
    var expectedValue = "node_modules/full-icu"
    if (!process.env.NODE_ICU_DATA || process.env.NODE_ICU_DATA !== expectedValue) {
        throw new Error(
            "NODE_ICU_DATA environment variable is not set, or not set to the correct value of " + expectedValue,
        )
    }
    var err = new Error("Intl is not available. Please install the full-icu module.")
    logger__default["default"].error(err)
    throw err
}
var formatPrice = function (minPrice, maxPrice, currency, locale, realm) {
    return minPrice === maxPrice
        ? formatNumber(minPrice, currency, locale, realm)
        : formatNumber(minPrice, currency, locale, realm) + " - " + formatNumber(maxPrice, currency, locale, realm)
}
var getCurrencyConfig = function (realm, locale) {
    var _a, _b, _c, _d
    var splitLocale = locale === null || locale === void 0 ? void 0 : locale.toLocaleLowerCase().split("-")
    var territory = splitLocale[1]
    var language = splitLocale[0]
    var getId =
        (_d =
            (_c =
                (_b = (_a = config.realms[realm]) === null || _a === void 0 ? void 0 : _a[territory]) === null ||
                _b === void 0
                    ? void 0
                    : _b[language]) === null || _c === void 0
                ? void 0
                : _c.currencies) === null || _d === void 0
            ? void 0
            : _d.id
    return config.currencies[getId]
}
var getConfiguredCurrency = function (price, locale, configuredCurrency) {
    var currencySymbol = configuredCurrency.currencySymbol,
        spaceRequired = configuredCurrency.spaceRequired,
        position = configuredCurrency.position,
        showNumOfDecimalDigits = configuredCurrency.showNumOfDecimalDigits,
        decimalSeparatorSymbol = configuredCurrency.decimalSeparatorSymbol,
        groupSeparatorSymbol = configuredCurrency.groupSeparatorSymbol
    var formattedPrice
    var requiredSpacing = spaceRequired ? " " : ""
    var numberFormatOptions = {
        style: "decimal",
        minimumFractionDigits:
            showNumOfDecimalDigits !== null && showNumOfDecimalDigits !== void 0
                ? showNumOfDecimalDigits
                : DEFAULT_MIN_DIGITS,
        useGrouping: true,
    }
    if (price % 1 === 0) {
        numberFormatOptions.minimumFractionDigits = 0
        numberFormatOptions.maximumFractionDigits = 0
    }
    var configPrice = new Intl.NumberFormat(locale, numberFormatOptions)
    if (configPrice.resolvedOptions().numberingSystem === "latn") {
        var displayedPrice = configPrice.format(price)
        if (groupSeparatorSymbol || decimalSeparatorSymbol) {
            displayedPrice = configPrice
                .formatToParts(price)
                .map(function (_a) {
                    var type = _a.type,
                        value = _a.value
                    if (groupSeparatorSymbol && type === TYPE_GROUP) {
                        value = groupSeparatorSymbol
                    }
                    if (decimalSeparatorSymbol && type === TYPE_DECIMAL) {
                        value = decimalSeparatorSymbol
                    }
                    return value
                })
                .reduce(function (string, part) {
                    return "" + string + part
                })
        }
        switch (position) {
            case LEFT_ALIGN:
                formattedPrice = "" + currencySymbol + requiredSpacing + displayedPrice
                break
            case RIGHT_ALIGN:
                formattedPrice = "" + displayedPrice + requiredSpacing + currencySymbol
                break
            default:
                formattedPrice = "" + currencySymbol + requiredSpacing + displayedPrice
                break
        }
    } else {
        var latinCharacterNumberFormat = new Intl.NumberFormat(
            locale + "-u-nu-latn",
            numberFormatOptions,
        ).formatToParts(price)
        var numberOnlyLatinCharacterPrice = latinCharacterNumberFormat
            .map(function (part) {
                if (part.type !== TYPE_CURRENCY && part.type !== TYPE_LITERAL) return part.value
                return ""
            })
            .join("")
        switch (position) {
            case LEFT_ALIGN:
                formattedPrice = "" + currencySymbol + requiredSpacing + numberOnlyLatinCharacterPrice
                break
            case RIGHT_ALIGN:
                formattedPrice = "" + numberOnlyLatinCharacterPrice + requiredSpacing + currencySymbol
                break
            default:
                formattedPrice = "" + currencySymbol + requiredSpacing + numberOnlyLatinCharacterPrice
                break
        }
    }
    return formattedPrice
}
var getCurrency = function (price, currency, locale) {
    var numberFormatOptions = {
        style: "currency",
        currency: currency,
    }
    if (price % 1 === 0) {
        numberFormatOptions.minimumFractionDigits = 0
        numberFormatOptions.maximumFractionDigits = 0
    }
    var localeNumberFormat = new Intl.NumberFormat("" + locale, numberFormatOptions)
    if (localeNumberFormat.resolvedOptions().numberingSystem === "latn") return localeNumberFormat.format(price)
    var latinCharacterNumberFormat = new Intl.NumberFormat(locale + "-u-nu-latn", numberFormatOptions)
    if (typeof latinCharacterNumberFormat.formatToParts !== "function") return latinCharacterNumberFormat.format(price)
    var latinCharacterNumber = latinCharacterNumberFormat.formatToParts(price)
    var numberOnlyLatinCharacterPrice = latinCharacterNumber
        .map(function (part) {
            if (part.type !== TYPE_CURRENCY && part.type !== TYPE_LITERAL) return part.value
            return ""
        })
        .join("")
    var currencyPattern = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).formatToParts(1)
    var formattedPrice = ""
    currencyPattern.forEach(function (part) {
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
var formatNumber = function (price, currency, locale, realm) {
    var configuredCurrency = getCurrencyConfig(realm, locale)
    if (configuredCurrency) return getConfiguredCurrency(price, locale, configuredCurrency)
    return getCurrency(price, currency, locale)
}

exports.formatPrice = formatPrice
exports.formatTextTestIds = formatTextTestIds
exports.getCustomHeader = getCustomHeader
exports.getSettingsHeaders = getSettingsHeaders
exports.getSettingsHeadersAsObject = getSettingsHeadersAsObject
exports.replaceText = replaceText
