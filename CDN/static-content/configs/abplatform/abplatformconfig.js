var ABPlatformCookie = "ab.localhost";

var ABCPlatformConfigSettings = {
    primary: "test.ab.localhost:3333",
    secondary: "test2.ab.localhost:3333",
    tertiary: "test3.ab.localhost:3333",
    quaternary: "test4.ab.localhost:3333",
    versionNumber: "65",
    DrainPeriod: 3600, // seconds
    DrainCutoffPeriod: 14400, // seconds
    divertPercentage: 95, // this setting is ignored when EnhancedPlatformFeatureEnabled= true
    ABCTesting: true,
    EnhancedPlatformFeatureEnabled: true,
    divertPercentagePerPlatform: 20,
    enableCPlatform: true,
    enableDPlatform: true, // if neither C nor D is enabled here then enableCPlatform will be considered 'true'
    DevicePreference: "Both",
    isLocalHost: true
}