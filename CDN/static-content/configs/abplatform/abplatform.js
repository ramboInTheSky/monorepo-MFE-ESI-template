/* eslint-disable */
"use strict";

var Next = Next || {};

Next.modernisedABPlatform = function () {

    if (Next.ABPlatform) {
        return
    }

    var _ = {
        Settings: null,
        Domain: null,
        Config: {
            PersistentCookieKey: "ABPersistent",
            SessionCookieKey: "ABSession",
            Platforms: ["a", "b", "c", "d"],
            PersistentCookieExpiryDays: 30,
            QueryStringRedirectKey: "dp"
        },
        Vars: {
            originalRequest: null,
            domainRequested: null,
            platformRequested: null,
            persistentCookie: null,
            sessionCookie: null,
            divertPercentage: null,
            persistentCookieName: null,
            sessionCookieName: null,
            mobileUserAgent: null,
            Init: function () {

                this.originalRequest = location.href;
                this.domainRequested = _.Settings.isLocalHost ? location.hostname + ":" + location.port : location.hostname;

                this.mobileUserAgent = false;

                if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent))
                    this.mobileUserAgent = true;

                this.persistentCookieName = _.Config.PersistentCookieKey + "_" + _.Settings.primary;
                this.sessionCookieName = _.Config.SessionCookieKey + "_" + _.Settings.primary;

                this.platformRequested = _.GetPlatformForSubDomain(this.domainRequested);

                this.persistentCookie = _.Cookie.Persistent.Get();
                this.sessionCookie = _.Cookie.Session.Get();
                this.divertPercentage = _.Settings.divertPercentage;
            }
        },
        Init: function (settings, domain) {
            if (settings
                && domain) {

                _.Settings = settings;
                _.Domain = domain;
                _.Vars.Init();
                _.Main.Init();

            }
            else {
                throw "ABPlatform: Config Settings or Domain not found";
            }
        },
        Main: {
            Init: function () {

                var c = true;
                if (c) { c = _.Main.ValidateCurrentSubDomain(); }
                if (c) { c = _.Main.QueryStringRedirect(); }
                if (c) { c = _.Main.ABConfigOff(); }
                if (c) { c = _.Main.ABConfigOn(); }

            },
            ValidateCurrentSubDomain: function () {
                //Ensure current subdomain is a part of the AB Platform Settings
                return (_.Vars.platformRequested
                    && _.Vars.platformRequested.length);
            },
            QueryStringRedirect: function () {
                //Override platform if redirect querystring exists
                var qs = _.Helpers.GetQueryStringValue(_.Config.QueryStringRedirectKey);

                if (qs
                    && _.Config.Platforms.indexOf(qs) >= 0) {

                    //Create cookies
                    _.Cookie.Persistent.Create(qs);
                    _.Cookie.Session.Create(qs);

                    _.ChangeURL(qs);
                    return false;
                }

                return true;
            },
            ABConfigOff: function () {
                if (!_.Settings.ABCTesting) {

                    if (!_.Cookie.Session.IsValid()) {
                        _.RedirectToPrimaryPlatform();
                    }
                    else {
                        //Session cookie hasn't expired. Update session cookie so that drain period is reset
                        _.Cookie.Session.Create(_.Vars.sessionCookie.platform);
                        //Redirect to session cookie
                        _.ChangeURL(_.Vars.sessionCookie.platform);
                    }
                    return false;
                }
                return true;
            },
            ABConfigOn: function () {
                if (_.Settings.ABCTesting) {
                    if (!_.Vars.persistentCookie && _.Settings.DevicePreference === "Both"
                        || !_.Vars.persistentCookie && !_.Vars.mobileUserAgent && _.Settings.DevicePreference === "Desktop"
                        || !_.Vars.persistentCookie && _.Vars.mobileUserAgent && _.Settings.DevicePreference === "Mobile") {
                        //Persistent cookie doesn't exist
                        //Call DecidePlatform to randomly choose a platform for the user
                        _.DecidePlatform();
                    }
                    else {
                        if (_.Cookie.Session.IsValid()) {
                            //Session cookie is still valid (exists and hasn't expired according to recorded timestamps)
                            //Therefore redirect to session cookie platform if not already on it
                            //Update session cookie so that the drain period is reset
                            _.Cookie.Session.Create(_.Vars.sessionCookie.platform);
                            _.ChangeURL(_.Vars.sessionCookie.platform);
                        }
                        else {
                            //Session cookie has expired.
                            //Check whether the persistent cookie's version is up to date
                            if (_.Cookie.Persistent.IsVersionNumberUpToDate()) {
                                _.Cookie.Session.Create(_.Vars.persistentCookie.platform);
                                _.ChangeURL(_.Vars.persistentCookie.platform);
                            }
                            else if (_.Settings.DevicePreference === "Both"
                                || !_.Vars.mobileUserAgent && _.Settings.DevicePreference === "Desktop"
                                || _.Vars.mobileUserAgent && _.Settings.DevicePreference === "Mobile") {
                                _.DecidePlatform();
                            }
                        }
                    }
                    return false;
                }
                return true;
            }
        },
        Cookie: {
            Persistent: {
                Create: function (platform) {
                    var expires;

                    if (_.Config.PersistentCookieExpiryDays) {
                        var date = new Date();
                        date.setTime(date.getTime() + (_.Config.PersistentCookieExpiryDays * 24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toGMTString();
                    }
                    else expires = "";

                    var cookieValue = platform + "|" + _.Settings.versionNumber;

                    document.cookie = _.Vars.persistentCookieName + "=" + cookieValue + expires + ";domain=" + _.Domain + "; " + "path=/";
                },
                Get: function () {
                    var cookie = new Array();
                    cookie = document.cookie.split('; ');
                    var cookieValue;
                    var cValue;

                    for (var i = 0; i < cookie.length; i++) {
                        cValue = new Array();
                        cValue = cookie[i].split('=');

                        if (cValue[0] === _.Vars.persistentCookieName) {
                            cookieValue = cValue[1];
                        }
                    }

                    if (cookieValue) {
                        var cookieValueArray = cookieValue.split('|');
                        return {
                            platform: cookieValueArray[0],
                            version: cookieValueArray[1]
                        };
                    }
                    else {
                        return null;
                    }
                },
                IsVersionNumberUpToDate: function () {
                    return (_.Vars.persistentCookie
                        && _.Settings.versionNumber <= _.Vars.persistentCookie.version);
                }
            },
            Session: {
                Create: function (platform) {
                    _.Vars.sessionCookie = _.Cookie.Session.Get();

                    var activeTimestamp = (new Date().getTime());
                    var lastTimestamp;

                    if (platform !== _.Config.Platforms[0]) {

                        if (!_.Settings.ABCTesting) {

                            if (_.Vars.sessionCookie
                                && _.Vars.sessionCookie.activeTimestamp) {
                                activeTimestamp = _.Vars.sessionCookie.activeTimestamp;
                            }

                            lastTimestamp = (new Date().getTime());

                        }

                    }

                    var cookieValue = encodeURIComponent(platform)
                        + ((activeTimestamp) ? "|" + activeTimestamp : "")
                        + ((lastTimestamp) ? "|" + lastTimestamp : "");

                    var cookieString = (!_.Settings.isLocalHost ? encodeURIComponent(_.Vars.sessionCookieName) : _.Vars.sessionCookieName) + "=" + cookieValue + "; ";

                    cookieString += "domain=" + _.Domain + "; " + "path=/";
                    document.cookie = cookieString;
                },
                Get: function () {
                    var cookie = new Array();
                    var cookieValue;
                    cookie = document.cookie.split('; ');
                    for (var i = 0; i < cookie.length; i++) {
                        var cValue = new Array();
                        cValue = cookie[i].split('=');
                        if (cValue[0] === _.Vars.sessionCookieName) {
                            cookieValue = decodeURIComponent(cValue[1]);
                        }
                    }

                    if (cookieValue) {
                        var cookieValueArray = cookieValue.split('|');
                        return {
                            platform: cookieValueArray[0],
                            activeTimestamp: cookieValueArray[1],
                            lastTimestamp: (cookieValueArray.length >= 3) ? cookieValueArray[2] : cookieValueArray[1]
                        };
                    }
                    else {
                        return null;
                    }
                },
                IsValid: function () {
                    return (_.Vars.sessionCookie                                                                                                                    //Session cookie exists             
                        && ((((new Date().getTime()) - _.Vars.sessionCookie.lastTimestamp) / 1000) < _.Settings.DrainPeriod)                                    //LastTimeStamp isn't older than Drain Period
                        && (_.Settings.ABCTesting || ((((new Date().getTime()) - _.Vars.sessionCookie.activeTimestamp) / 1000) < _.Settings.DrainCutoffPeriod)) //ABCTesting is enabled, or ActiveTimeStamp isn't older than Drain Cut Off Period
                    );
                }
            }
        },
        RedirectToPrimaryPlatform: function () {

            var primaryPlatform = _.Config.Platforms[0];

            if (!_.Vars.persistentCookie
                || _.Vars.persistentCookie.platform !== primaryPlatform) {
                _.Cookie.Persistent.Create(primaryPlatform);
            }

            _.Cookie.Session.Create(primaryPlatform);

            _.ChangeURL(primaryPlatform);

        },
        ChangeURL: function (platform) {

            if (_.Vars.platformRequested !== platform) {

                var redirectUrl = window.location.protocol
                    + "//"
                    + _.GetSubDomainForPlatform(platform)
                    + ((window.location.pathname) ? window.location.pathname : "")
                    + ((window.location.search) ? window.location.search : "")
                    + ((window.location.hash) ? window.location.hash : "");

                window.location.replace(redirectUrl);
            }
        },
        DecidePlatform: function () {
            if (typeof _.Settings.EnhancedPlatformFeatureEnabled !== "undefined" && _.Settings.EnhancedPlatformFeatureEnabled) {
                var enableCPlatform = _.Settings.enableCPlatform;
                var enableDPlatform = _.Settings.enableDPlatform;
                if (!enableCPlatform && !enableDPlatform) {
                    enableCPlatform = true;
                }
                _.DecidePlatformAbcd(_.Settings.divertPercentagePerPlatform, enableCPlatform, enableDPlatform);
            } else {
                _.DecidePlatformAbc();
            }
        },
        DecidePlatformAbc: function () {
            var primaryBoundary = (100 - _.Settings.divertPercentage);
            var secondaryBoundary = (100 - (_.Settings.divertPercentage / 2));
            var platformDecider = (Math.random() * 100);
            var platform;

            if (Math.random() == Math.random()) {
                platform = _.Config.Platforms[0];
            } else {
                if (platformDecider > secondaryBoundary) {
                    platform = _.Config.Platforms[2];
                } else if (platformDecider > primaryBoundary) {
                    platform = _.Config.Platforms[1];
                } else {
                    platform = _.Config.Platforms[0];
                }
            }

            _.Cookie.Persistent.Create(platform);
            _.Cookie.Session.Create(platform);

            _.ChangeURL(platform);
        },
        DecidePlatformAbcd: function (divertPercentagePerPlatform, enableCPlatform, enableDPlatform) {
            var primaryBoundary = 100 - divertPercentagePerPlatform;
            var secondaryBoundary = primaryBoundary - divertPercentagePerPlatform;
            var tertiaryBoundary = secondaryBoundary - divertPercentagePerPlatform;

            var platformDecider = (Math.random() * 100);

            var platform = (Math.random() == Math.random())
                ? _.Config.Platforms[0] // bot detected, use A platform
                : (platformDecider > primaryBoundary && (enableCPlatform || enableDPlatform))
                    ? _.Config.Platforms[1]
                    : (platformDecider > secondaryBoundary && platformDecider <= primaryBoundary && enableCPlatform)
                        ? _.Config.Platforms[2]
                        : (platformDecider > tertiaryBoundary && platformDecider <= secondaryBoundary && enableDPlatform)
                            ? _.Config.Platforms[3]
                            : _.Config.Platforms[0];

            _.Cookie.Persistent.Create(platform);
            _.Cookie.Session.Create(platform);

            _.ChangeURL(platform);
        },
        GetSubDomainForPlatform: function (platform) {
            var subdomain;
            switch (platform) {
                case _.Config.Platforms[0]:
                    subdomain = _.Settings.primary;
                    break;
                case _.Config.Platforms[1]:
                    subdomain = _.Settings.secondary;
                    break;
                case _.Config.Platforms[2]:
                    subdomain = _.Settings.tertiary;
                    break;
                case _.Config.Platforms[3]:
                    subdomain = _.Settings.quaternary;
                    break;
            }
            return subdomain;
        },
        GetPlatformForSubDomain: function (subdomain) {
            var platform;
            switch (subdomain) {
                case _.Settings.primary:
                    platform = _.Config.Platforms[0];
                    break;
                case _.Settings.secondary:
                    platform = _.Config.Platforms[1];
                    break;
                case _.Settings.tertiary:
                    platform = _.Config.Platforms[2];
                    break;
                case _.Settings.quaternary:
                    platform = _.Config.Platforms[3];
                    break;
            }
            return platform;
        },
        Helpers: {
            GetQueryStringValue: function (key) {
                key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results == null ? null
                    : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        }
    };

    return {
        Init: _.Init,
        RedirectToPrimaryPlatform: _.RedirectToPrimaryPlatform
    };
}();

if (!Next.ABPlatform) {
    Next.modernisedABPlatform.Init(ABCPlatformConfigSettings, ABPlatformCookie);
}