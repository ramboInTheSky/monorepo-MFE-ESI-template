import * as ReduxModule from "react-redux"

export function mockUseDispatchReturnValue(func = jest.fn()) {
    return jest.spyOn(ReduxModule, "useDispatch").mockReturnValue(func)
}
