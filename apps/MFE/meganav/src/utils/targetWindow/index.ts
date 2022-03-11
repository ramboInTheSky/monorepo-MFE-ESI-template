export enum targetWindowType {
    NewWindow = "_blank",
    SameWindow = "_self",
}

export const targetWindow = (openNewWindow: boolean) =>
    openNewWindow ? targetWindowType.NewWindow : targetWindowType.SameWindow
