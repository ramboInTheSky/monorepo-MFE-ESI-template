import {
    getWindow,
    getDocumentScrollTop,
    removeDocumentScrollListener,
    addDocumentScrollListener,
    isSomewhatInViewport,
    isAboveViewport,
    isBelowViewport,
    IS_BROWSER,
} from ".."

jest.mock("..", () => ({
    getWindow: jest.fn(() => ({})),
    IS_BROWSER: jest.fn(() => true),
    isAboveViewport: jest.fn(),
    isBelowViewport: jest.fn(),
    isSomewhatInViewport: jest.fn(),
    getDocumentScrollTop: jest.fn(),
    addDocumentScrollListener: jest.fn(),
    removeDocumentScrollListener: jest.fn(),
}))

function mockListener(fn: jest.Mock) {
    const api = {
        listener: () => null,
    }
    fn.mockImplementation(listener => {
        api.listener = listener
    })
    return api
}

export function mockGetWindow(value: any = window) {
    ;(getWindow as jest.Mock).mockReturnValue(value)
}

export function mockGetDocumentScrollTop(value: number) {
    ;(getDocumentScrollTop as jest.Mock).mockReturnValue(value)
}

export function mockRemoveDocumentScrollListener() {
    return mockListener(removeDocumentScrollListener as jest.Mock)
}

export function mockAddDocumentScrollListener() {
    return mockListener(addDocumentScrollListener as jest.Mock)
}

export function mockIsSomewhatInViewport(result: boolean) {
    ;(isSomewhatInViewport as jest.Mock).mockReturnValue(result)
}

export function mockIsAboveViewport(result: boolean) {
    ;(isAboveViewport as jest.Mock).mockReturnValue(result)
}

export function mockIsBelowViewport(result: boolean) {
    ;(isBelowViewport as jest.Mock).mockReturnValue(result)
}

export function mockIsBrowser(result: boolean) {
    ;(IS_BROWSER as jest.Mock).mockReturnValue(result)
}
