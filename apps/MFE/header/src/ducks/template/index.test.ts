import reducer, {SET_TEMPLATE, updateTemplate} from "."
import mockStore from "../../../__mocks__/mockStore"

const initialState = "default"

describe("reducers: template", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    template: "default",
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    template: "default",
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with SET_TEMPLATE", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_TEMPLATE,
                    template: "templatex",
                }),
            ).toEqual("templatex")
        })
    })

    describe("When updateTemplate called", () => {
        it(`should dispatch SET_TEMPLATE action with correct params`, () => {
            const configuration = {
                "header.frontend.template": {
                    Value: "burgerMenu",
                },
            }

            mockStore.dispatch = jest.fn()

            updateTemplate(mockStore, configuration)

            expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
            expect(mockStore.dispatch).toHaveBeenCalledWith({
                type: SET_TEMPLATE,
                template: "burgerMenu",
            })
        })

        it(`should dispatch default template when there is no configuration`, () => {
            const configuration = undefined
            mockStore.dispatch = jest.fn()
            updateTemplate(mockStore, configuration)
            expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
            expect(mockStore.dispatch).toHaveBeenCalledWith({
                type: SET_TEMPLATE,
                template: "default",
            })
        })
    })
})
