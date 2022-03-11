var ABPlatformCookie = ".amido.com"

var ABCPlatformConfigSettings = {
    primary: "sx-test.amido.com",
    secondary: "sx-test2.amido.com",
    tertiary: "sx-test3.amido.com",
    quaternary: "sx-test4.amido.com",
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
