import {FONTS, ThemeColor} from "@monorepo/themes"
import {env as runtimeEnv} from "process"
import env from "../../../config/env"
import urls from "../../../config/urls"
import {version} from "../../../../package.json"
import {BFFLogger} from "../../core/BFFLogger"
import {formatCdnPath} from "../../../utils/getCdnUrl"
import splashIcons from "../../../config/splash-icons/icons.json"

const {DEVELOPMENT, REACT_APP_MEGANAV_ASSETS_PATH, REACT_APP_MEGANAV_BASEURL, REACT_APP_BLOB_STORAGE_PATH} = env

const meganavEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    REACT_APP_MEGANAV_BASEURL && useDevEsi ? REACT_APP_MEGANAV_BASEURL : SITEURL

const fontPreloadBuilder = (theme: ThemeColor) => {
    const stringBuilder =
        (filename: string) =>
        (formats: string[]): string => {
            return formats
                .map(
                    format =>
                        `<link rel="preload" as="font" href="${REACT_APP_BLOB_STORAGE_PATH}/fonts/${filename}.${format}" type="font/${format}" crossorigin="anonymous"/>`,
                )
                .join("\n")
        }
    const primaryFontBuilder = Object.keys(theme.font.primary)
        .map(
            type =>
                theme.font.primary[type].filename &&
                stringBuilder(theme.font.primary[type].filename)(theme.font.primary[type].formats),
        )
        .join("\n")

    const secondaryFontBuilder = Object.keys(theme.font.secondary)
        .map(
            type =>
                theme.font.secondary[type].filename &&
                stringBuilder(theme.font.secondary[type].filename)(theme.font.secondary[type].formats),
        )
        .join("\n")

    return primaryFontBuilder + secondaryFontBuilder
}

export const PRELOAD = (
    SITEURL,
    theme: ThemeColor,
    versionTheme: string,
    useDevEsi: boolean,
    enableMonetateSDK: boolean,
    accountMonetateSDK: string,
    enableGoogleAnalyticsSDK: boolean,
    account: string,
    environment: string,
    analyticsData,
    enableQueueIt: boolean,
    realm: string,
    bookmarkTitle: string,
    enableucmSDK: boolean,
    dataDomainScriptGuid: string,
    autoLanguageDetection: boolean,
    enableABPlatformTesting: boolean,
    abConfigUrl: string,
) => {
    let stringifiedTheme
    const url = new URL(SITEURL)
    const siteurl = `${url.protocol}//${url.host}`
    try {
        stringifiedTheme = JSON.stringify(theme)
    } catch (err) {
        BFFLogger.error(err)
    }
    return `
        ${enableGoogleAnalyticsSDK ? googleAnalyticsInitialise(account, environment, analyticsData, siteurl) : ""}
        ${enableMonetateSDK ? monetateInitialise(accountMonetateSDK) : ""}
        ${enableucmSDK ? ucmInitialise(dataDomainScriptGuid, autoLanguageDetection) : ""}
        ${enableQueueIt ? QueueIt : ""}
        ${fontPreloadBuilder(theme)}
        <link rel="preload" as="script" href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/header${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX || ""}/js/2.${version}.chunk.js" />
        <link rel="preload" as="script" href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/header${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX || ""}/js/main.${version}.chunk.js" />
        ${BOOKMARK_TITLE(bookmarkTitle)}
        ${SPLASH_SCREEN_HTML(realm)}
        <esi:include src="${
            meganavEsiBaseUrl(SITEURL, useDevEsi) + REACT_APP_MEGANAV_ASSETS_PATH
        }/dependencies/preload" onerror="continue" />
        <noscript id="jss-insertion-point"></noscript>
        <script name="themeColours">
            window.themeColours = window.themeColours || {};
            window.themeColours${`["${versionTheme}"]`} = ${stringifiedTheme}
        </script>
        ${FONTS(theme, `${REACT_APP_BLOB_STORAGE_PATH}/fonts`, "#platform_modernisation_header")}
        ${APPINSIGHTS_SCRIPT}
        ${enableABPlatformTesting ? abPlatformTestingInitialise(abConfigUrl) : ""}
    `
}

const googleAnalyticsInitialise = (
    _account: string,
    _environment: string,
    {siteLayout, siteCountry, siteLanguage},
    siteUrl,
) => `

<script nomodule type="text/javascript">

console.log("IE11 Closest polyfill loaded")

if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }
  
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
  
      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
  </script>

<script src="${env.REACT_APP_BLOB_STORAGE_PATH}/gtm-sdk/gtm.js" ></script>
<script type="text/javascript"> 

    if (window.document.getElementById("platform_modernisation") || (window.platmodflags && window.platmodflags.gtmDataLayerEvents) && GoogleAnalyticsNext) {
         GoogleAnalyticsNext.Setup({
            siteLayout: "${siteLayout || ""}", 
            siteCountry: "${siteCountry}", 
            siteLanguage: "${siteLanguage}",
            siteUrl: "${siteUrl}",
        })
    }  

</script>
`
const QueueIt = `
<script type="text/javascript" src="${urls.queueIt.clientUrl}"></script>
<script data-queueit-c="next" type="text/javascript" src="${urls.queueIt.configLoader}"></script>
`

const ucmInitialise = (dataDomainScriptGuid: string, autoLanguageDetection: boolean) => `
<script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript"
        data-document-language="${autoLanguageDetection.toString()}"
        charset="UTF-8" data-domain-script="${dataDomainScriptGuid}">
</script>
<script type="text/javascript">
    function OptanonWrapper() { }
</script>
`

const monetateInitialise = (accountMonetateSDK: string) => `
<script type="text/javascript">var monetateT = new Date().getTime();</script>
<script type="text/javascript" src=${accountMonetateSDK}></script>
<script src="${env.REACT_APP_BLOB_STORAGE_PATH}/monetate-sdk/monetate.js" ></script>
`

const abPlatformTestingInitialise = (abConfigUrl: string) => `
<script src="${env.REACT_APP_BLOB_STORAGE_PATH}${abConfigUrl}" type="text/javascript"></script>
<script src="${env.REACT_APP_BLOB_STORAGE_PATH}${urls.abPlatformTesting.configsPath}${urls.abPlatformTesting.baseFile}" type="text/javascript"></script>
`

export const PRELOAD_VENDOR = (
    SITEURL,
    theme: ThemeColor,
    versionTheme,
    useDevEsi: boolean,
    enableMonetateSDK: boolean,
    accountMonetateSDK: string,
    enableGoogleAnalyticsSDK: boolean,
    account: string,
    environment: string,
    analyticsData,
    enableQueueIt,
    realm: string,
    bookmarkTitle: string,
    enableucmSDK: boolean,
    dataDomainScriptGuid: string,
    autoLanguageDetection: boolean,
    enableABPlatformTesting: boolean,
    abConfigUrl: string,
) => `
        <link rel="preload" as="script" href="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
        <link rel="preload" as="script" href="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
<script nomodule src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/core-js/3.18.3/core.min.js"></script>
${PRELOAD(
    SITEURL,
    theme,
    versionTheme,
    useDevEsi,
    enableMonetateSDK,
    accountMonetateSDK,
    enableGoogleAnalyticsSDK,
    account,
    environment,
    analyticsData,
    enableQueueIt,
    realm,
    bookmarkTitle,
    enableucmSDK,
    dataDomainScriptGuid,
    autoLanguageDetection,
    enableABPlatformTesting,
    abConfigUrl,
)}
    `

export const BUNDLE = (initialSiteUrl, useDevEsi: boolean) => {
    const url = new URL(initialSiteUrl)
    const siteurl = `${url.protocol}//${url.host}`
    return `
        <script src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${env.REACT_APP_BLOB_STORAGE_PATH}/header${
        runtimeEnv.REACT_APP_SERVE_PATH_PREFIX || ""
    }/js/2.${version}.chunk.js" ></script>
        <script src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${env.REACT_APP_BLOB_STORAGE_PATH}/header${
        runtimeEnv.REACT_APP_SERVE_PATH_PREFIX || ""
    }/js/main.${version}.chunk.js" ></script>
        <esi:include src="${
            meganavEsiBaseUrl(initialSiteUrl, useDevEsi) + REACT_APP_MEGANAV_ASSETS_PATH
        }/dependencies/bundle" onerror="continue" />
    `
}

export const BUNDLE_VENDOR = (SITEURL, useDevEsi: boolean) => `
        <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
        <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
        ${BUNDLE(SITEURL, useDevEsi)}
    `

export const ESI_MUI_CSS = (SITEURL: string, useDevEsi: boolean) =>
    DEVELOPMENT
        ? ""
        : `
        <esi:include src="${
            meganavEsiBaseUrl(SITEURL, useDevEsi) + REACT_APP_MEGANAV_ASSETS_PATH
        }/baselinecss/materialui" onerror="continue" />
    `

export const ESI_CUSTOM_CSS = (SITEURL: string, useDevEsi: boolean) =>
    DEVELOPMENT
        ? ""
        : `
            <esi:include src="${
                meganavEsiBaseUrl(SITEURL, useDevEsi) + REACT_APP_MEGANAV_ASSETS_PATH
            }/baselinecss/custom" onerror="continue" />
        `

export const APPINSIGHTS_SCRIPT = `<script type="text/javascript">
        !function(T,l,y){var S=T.location,k="script",D="instrumentationKey",C="ingestionendpoint",I="disableExceptionTracking",E="ai.device.",b="toLowerCase",w="crossOrigin",N="POST",e="appInsightsSDK",t=y.name||"appInsights";(y.name||T[e])&&(T[e]=t);var n=T[t]||function(d){var g=!1,f=!1,m={initialize:!0,queue:[],sv:"5",version:2,config:d};function v(e,t){var n={},a="Browser";return n[E+"id"]=a[b](),n[E+"type"]=a,n["ai.operation.name"]=S&&S.pathname||"_unknown_",n["ai.internal.sdkVersion"]="javascript:snippet_"+(m.sv||m.version),{time:function(){var e=new Date;function t(e){var t=""+e;return 1===t.length&&(t="0"+t),t}return e.getUTCFullYear()+"-"+t(1+e.getUTCMonth())+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())+"."+((e.getUTCMilliseconds()/1e3).toFixed(3)+"").slice(2,5)+"Z"}(),iKey:e,name:"Microsoft.ApplicationInsights."+e.replace(/-/g,"")+"."+t,sampleRate:100,tags:n,data:{baseData:{ver:2}}}}var h=d.url||y.src;if(h){function a(e){var t,n,a,i,r,o,s,c,u,p,l;g=!0,m.queue=[],f||(f=!0,t=h,s=function(){var e={},t=d.connectionString;if(t)for(var n=t.split(";"),a=0;a<n.length;a++){var i=n[a].split("=");2===i.length&&(e[i[0][b]()]=i[1])}if(!e[C]){var r=e.endpointsuffix,o=r?e.location:null;e[C]="https://"+(o?o+".":"")+"dc."+(r||"services.visualstudio.com")}return e}(),c=s[D]||d[D]||"",u=s[C],p=u?u+"/v2/track":d.endpointUrl,(l=[]).push((n="SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details)",a=t,i=p,(o=(r=v(c,"Exception")).data).baseType="ExceptionData",o.baseData.exceptions=[{typeName:"SDKLoadFailed",message:n.replace(/./g,"-"),hasFullStack:!1,stack:n+" Snippet failed to load ["+a+"] -- Telemetry is disabled Help Link: https://go.microsoft.com/fwlink/?linkid=2128109 Host: "+(S&&S.pathname||"_unknown_")+" Endpoint: "+i,parsedStack:[]}],r)),l.push(function(e,t,n,a){var i=v(c,"Message"),r=i.data;r.baseType="MessageData";var o=r.baseData;return o.message='AI (Internal): 99 message:"'+("SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details) ("+n+")").replace(/"/g,"")+'"',o.properties={endpoint:a},i}(0,0,t,p)),function(e,t){if(JSON){var n=T.fetch;if(n&&!y.useXhr)n(t,{method:N,body:JSON.stringify(e),mode:"cors"});else if(XMLHttpRequest){var a=new XMLHttpRequest;a.open(N,t),a.setRequestHeader("Content-type","application/json"),a.send(JSON.stringify(e))}}}(l,p))}function i(e,t){f||setTimeout(function(){!t&&m.core||a()},500)}var e=function(){var n=l.createElement(k);n.src=h;var e=y[w];return!e&&""!==e||"undefined"==n[w]||(n[w]=e),n.onload=i,n.onerror=a,n.onreadystatechange=function(e,t){"loaded"!==n.readyState&&"complete"!==n.readyState||i(0,t)},n}();y.ld<0?l.getElementsByTagName("head")[0].appendChild(e):setTimeout(function(){l.getElementsByTagName(k)[0].parentNode.appendChild(e)},y.ld||0)}try{m.cookie=l.cookie}catch(p){}function t(e){for(;e.length;)!function(t){m[t]=function(){var e=arguments;g||m.queue.push(function(){m[t].apply(m,e)})}}(e.pop())}var n="track",r="TrackPage",o="TrackEvent";t([n+"Event",n+"PageView",n+"Exception",n+"Trace",n+"DependencyData",n+"Metric",n+"PageViewPerformance","start"+r,"stop"+r,"start"+o,"stop"+o,"addTelemetryInitializer","setAuthenticatedUserContext","clearAuthenticatedUserContext","flush"]),m.SeverityLevel={Verbose:0,Information:1,Warning:2,Error:3,Critical:4};var s=(d.extensionConfig||{}).ApplicationInsightsAnalytics||{};if(!0!==d[I]&&!0!==s[I]){var c="onerror";t(["_"+c]);var u=T[c];T[c]=function(e,t,n,a,i){var r=u&&u(e,t,n,a,i);return!0!==r&&m["_"+c]({message:e,url:t,lineNumber:n,columnNumber:a,error:i}),r},d.autoExceptionInstrumented=!0}return m}(y.cfg);function a(){y.onInit&&y.onInit(n)}(T[t]=n).queue&&0===n.queue.length?(n.queue.push(a),n.trackPageView({})):a()}(window,document,{
        src: "https://js.monitor.azure.com/scripts/b/ai.2.min.js", 
        ld: 3000, // Defines the load delay (in ms) before attempting to load the sdk. -1 = block page load and add to head. (default) = 0ms load after timeout,
        useXhr: 1, // Use XHR instead of fetch to report failures (if available),
        crossOrigin: "anonymous", // When supplied this will add the provided value as the cross origin attribute on the script tag
        // onInit: null, 
        cfg: { // Application Insights Configuration
            instrumentationKey: "${env.REACT_APP_APPINSIGHTS_KEY}"
        }});</script>`

export const SPLASH_SCREEN_HTML = (realm: string): string => {
    let text = ""
    Object.keys(splashIcons.icons).forEach(icon => {
        const {name} = splashIcons.icons[icon]

        name.forEach(iconName => {
            text += `<link rel="${splashIcons.rel}" sizes="${icon}" href="${formatCdnPath(
                `${splashIcons.path}/${realm}/shared/splashicons/${iconName}`,
            )}" /> `
        })
    })
    return text
}
export const BOOKMARK_TITLE = (title: string): string => `
    <meta name="apple-mobile-web-app-title" content="${title}"/>
    <meta name="application-name" content="${title}"/>
`
