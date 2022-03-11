var ABPlatformCookie = ".amido.com"

var ABCPlatformConfigSettings = {
    primary: "ci-test.amido.com",
    secondary: "ci-test2.amido.com",
    tertiary: "ci-test3.amido.com",
    quaternary: "ci-test4.amido.com",
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
