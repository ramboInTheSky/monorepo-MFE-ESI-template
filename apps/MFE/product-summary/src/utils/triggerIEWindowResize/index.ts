type IEUIEvent = UIEvent & {initUIEvent: Function}

export function triggerIEWindowResize() {
    const evt = window.document.createEvent("UIEvents") as IEUIEvent
    evt.initUIEvent("resize", true, false, window, 0)
    window.dispatchEvent(evt)
}
