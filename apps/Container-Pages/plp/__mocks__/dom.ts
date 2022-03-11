export function createElementWithChildren(totalChildren: number, amendChild?: (child: HTMLElement, i: number) => any) {
    const container = document.createElement("div")
    for (let i = 0; i < totalChildren; i += 1) {
        const child = document.createElement("div")
        jest.spyOn(child, "getBoundingClientRect")
        child.appendChild(document.createTextNode(`child ${i + 1}`))
        if (amendChild) amendChild(child, i)
        container.appendChild(child)
    }
    return container
}

export function mockWindowLocation(props = {}) {
    const {location} = window

    delete (window as any).location
    ;(window as any).location = {...location, ...props}

    const restore = () => {
        ;(window as any).location = location
    }

    return restore
}

export function mockWindowScrollTo() {
    const {scrollTo} = window
    delete (window as any).scrollTo
    window.scrollTo = jest.fn()
    return () => {
        window.scrollTo = scrollTo
    }
}
