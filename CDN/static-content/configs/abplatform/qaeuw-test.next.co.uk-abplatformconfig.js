var ABPlatformCookie = ".amido.com"

var ABCPlatformConfigSettings = {
    primary: "qaeuw-test.amido.com",
    secondary: "qaeuw-test2.amido.com",
    tertiary: "qaeuw-test3.amido.com",
    quaternary: "qaeuw-test4.amido.com",
    versionNumber: "01",
    DrainPeriod: 3600, // seconds
    DrainCutoffPeriod: 14400, // seconds
    divertPercentage: 95, // this setting is ignored when EnhancedPlatformFeatureEnabled= true
    ABCTesting: false,
    EnhancedPlatformFeatureEnabled: true,
    divertPercentagePerPlatform: 20,
    enableCPlatform: true,
    enableDPlatform: true, // if neither C nor D is enabled here then enableCPlatform will be considered 'true'
    DevicePreference: "Both",
    isLocalHost: false,
}
