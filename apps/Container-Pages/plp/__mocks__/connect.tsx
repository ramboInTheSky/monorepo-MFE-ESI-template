import React from "react"
import {Provider} from "react-redux"
import {render} from "@testing-library/react"
import {mockState, mockConfigureStore} from "./mockStore"

interface AnyObject {
    [key: string]: any
}

interface MockComponentProps {
    propsRef: {current: any}
    props: AnyObject
}

const MockComponent = jest.fn(({propsRef, ...props}: MockComponentProps) => {
    // eslint-disable-next-line no-param-reassign
    propsRef.current = props
    return null
}) as any

export function renderConnect(connect: Function, state: AnyObject = {}, otherProps: Record<any, any> = {}) {
    const props = React.createRef()
    const store = mockConfigureStore({...mockState, ...state})
    const ConnectedMock = connect(MockComponent)
    render(
        <Provider store={store}>
            <ConnectedMock {...otherProps} propsRef={props} />
        </Provider>,
    )
    return props.current
}

export function createMockStateForTabbedFilters(searchState: Record<any, any> = {}) {
    return {
        ...mockState,
        tabbedFilters: {
            ...mockState.tabbedFilters,
            ...searchState,
        },
    }
}
