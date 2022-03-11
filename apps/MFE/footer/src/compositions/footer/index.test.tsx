import React from "react"
import {render} from "@testing-library/react"

import BFFLogger from "../../server/core/BFFLogger"
import mockStore, {mockState} from "../../../__mocks__/mockStore"

import {mockDateConstructor} from "../../../__mocks__/setDate"
import {getFooterDataThunk} from "../../ducks/footerdata"

import {Footer} from "."
import {getServerSideProps} from "./index.server"
import apiFooterData from "../../../__mocks__/apiFooterData"

jest.mock("../../components/RegionWrapper", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({regionType}) => {
        return <div>TEST REGION WRAPPER {regionType}</div>
    },
}))
jest.mock("../../components/Copyright/DefaultCopyright", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>DEFAULT COPYRIGHT</div>
    },
}))

jest.mock("@app/utils/axios")

jest.mock("@app/utils/setApiUrlSettings", () => {
    const mock = jest.fn()
    mock.mockReturnValue({
        realm: "testRealm",
        territory: "testTerritory",
        language: "testLanguage",
    })
    return {
        setApiUrlSettings: mock,
    }
})

jest.mock("../../ducks/footerdata", () => ({
    getFooterDataThunk: jest.fn(store => {
        if (store.error) throw new Error("ERROR")

        return {}
    }),
}))
jest.mock("../../server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

describe("Pages: Footer - ", () => {
    describe("When I try provide the data to the footer and an error has occured: ", () => {
        beforeEach(() => {
            mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
        })
        it("should show the default footer", () => {
            const {asFragment} = render(<Footer {...{data: null, textAlignment: "ltr"}} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the footer renders with regions ", () => {
        it("should show the default footer", () => {
            const {asFragment} = render(
                <Footer {...{data: apiFooterData, regions: mockState.data?.regions, textAlignment: "ltr"}} />,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the footer getServerSideProps function is called ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps({params: {}}, {}, mockStore)
        })
        it("should call GetFooterData", () => {
            expect(getFooterDataThunk).toHaveBeenCalledWith(mockStore)
        })

        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({})
        })
    })

    describe("When the footer getServerSideProps throws an error ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps({}, {}, {error: true} as any)
        })

        it("should call the error logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })

        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({})
        })
    })
})
