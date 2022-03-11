export enum SupportedCopyrightTypes {
    Copyright = "Copyright",
    DesktopToggle = "DesktopToggle",
    MobileToggle = "MobileToggle",
}

export enum DeviceType {
    Desktop = "Desktop",
    Mobile = "Mobile",
}

export const deviceSwitcherUtils = {
    regex: "=([^;]+)",
    cookieKey: "AmidoDeviceType",
}
