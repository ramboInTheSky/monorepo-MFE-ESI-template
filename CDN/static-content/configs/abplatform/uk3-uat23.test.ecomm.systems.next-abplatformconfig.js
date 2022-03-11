var ABPlatformCookie = ".test.ecomm.systems.next"

var ABCPlatformConfigSettings = {
    primary: "uk-uat23.test.ecomm.systems.next",
    secondary: "uk2-uat23.test.ecomm.systems.next",
    tertiary: "uk3-uat23.test.ecomm.systems.next",
    quaternary: "uk4-uat23.test.ecomm.systems.next",
    versionNumber: "01",
    DrainPeriod: 3600, // seconds
    DrainCutoffPeriod: 14400, // seconds
    divertPercentage: 95, // this setting is ignored when EnhancedPlatformFeatureEnabled= true
    ABCTesting: false,
    EnhancedPlatformFeatureEnabled: true,
    divertPercentagePerPlatform: 20,
    enableCPlatform: false,
    enableDPlatform: true, // if neither C nor D is enabled here then enableCPlatform will be considered 'true'
    DevicePreference: "Both",
    isLocalHost: false,
}
