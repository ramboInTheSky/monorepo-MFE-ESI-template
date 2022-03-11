import {TestDataSwitcher} from "../cypress/modules/filter"

export const amidoHeaders = TestDataSwitcher(
    ["postdeploy"],
    {
        "x-monorepo-language": "en",
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
        "x-set-caching": "false",
    },
    {
        "x-monorepo-language": "en",
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
        "test-with-local-esi": true,
    },
)
