import {SecondaryNav} from "../src/models/secondary-nav"

const secondaryNavMockData: SecondaryNav = {
    id: "3df60188-7db2-433c-b6c2-7b5034538fb2",
    title: "GIRLS",
    target: "/girls",
    viewType: "secondary-navigation",
    realm: "amido",
    territory: "GB",
    language: "en",
    items: [
        {
            title: "GIRLS",
            type: "tab",
            items: [
                {
                    title: "Column 1",
                    type: "column",
                    items: [
                        {
                            title: "",
                            type: "category",
                            icon: null,
                            items: [
                                {
                                    title: "New In",
                                    type: "link",
                                    icon: null,
                                    target: "/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls/feat-newin",
                                    linkColour: "",
                                    fontWeight: "",
                                    fontFamily: null,
                                },
                            ],
                            linkColour: "",
                            fontWeight: "",
                            fontFamily: null,
                        },
                    ],
                },
            ],
            missions: null,
        },
        {
            title: "exclude wide tab",
            type: "tab",
            items: [],
            missions: null,
            excludeFrom: ["WideView"],
        },
        {
            title: "exclude narrow tab",
            type: "tab",
            items: [],
            missions: null,
            excludeFrom: ["NarrowView"],
        },
    ],
    banner: null,
}

export default secondaryNavMockData
