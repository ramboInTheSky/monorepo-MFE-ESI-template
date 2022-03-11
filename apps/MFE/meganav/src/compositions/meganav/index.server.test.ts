import BFFLogger from "../../server/core/BFFLogger"
import {getServerSideProps} from "./index.server"
import {getPrimaryNavDataThunk} from "../../ducks/primary-nav"
import mockStore from "../../../__mocks__/mockStore"

jest.mock("../../server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))
jest.mock("../../ducks/primary-nav", () => ({
    getPrimaryNavDataThunk: jest.fn(store => {
        if (store.error) throw new Error("ERROR")

        return {}
    }),
    setPrimaryNavIndex: jest.fn(() => () => null),
}))
describe("When the meganav getServerSideProps function is called ", () => {
    let props: any

    beforeAll(async () => {
        props = await getServerSideProps({params: {}}, {}, mockStore)
    })
    it("should call GetPrimaryNavData", () => {
        expect(getPrimaryNavDataThunk).toHaveBeenCalledWith({...mockStore})
    })

    it("should return data from the API", () => {
        expect(props).toBeTruthy()
    })
    it("should return correct values", () => {
        expect(props).toEqual({})
    })
})

describe("When the meganav getServerSideProps throws an error ", () => {
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