export class GoogleAnalyticsAccount {
    account = ""
    environmentKeys = new EnvironmentKeys()
}

class EnvironmentKeys {
    dev = ""
    uat = ""
    conv = ""
    live = ""
}

export class GoogleAnalyticsData {
    uk = new GoogleAnalyticsAccount()
    international = new GoogleAnalyticsAccount()
}
