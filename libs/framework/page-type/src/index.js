'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PAGE_TYPES = Object.freeze({
    '/': 'homePage',
    '/boys': 'boysLandingPage',
    '/branded': 'brandedLandingPage',
    '/brands/all': 'atozBrands',
    '/brands/beauty': 'atozBrands',
    '/brands/boys': 'atozBrands',
    '/brands/fragrances': 'atozBrands',
    '/brands/girls': 'atozBrands',
    '/brands/homeware': 'atozBrands',
    '/brands/lipsy': 'atozBrands',
    '/brands/men': 'atozBrands',
    '/brands/sports': 'atozBrands',
    '/brands/women': 'atozBrands',
    '/credit-account': 'creditAccount',
    '/clearance': 'clearance',
    '/delivery-service': 'deliveryInformation',
    '/error': 'error',
    '/evouchers': 'eVouchers',
    '/favourites': 'favouritesListPage',
    '/girls': 'girlsLandingPage',
    '/help': 'help',
    '/help/contact-us': 'contactUs',
    '/homeware': 'homewareLandingPage',
    '/lipsy': 'lipsyLandingPage',
    '/logout': 'accountLoggedout',
    '/men': 'menLandingPage',
    '/privacy': 'privacy',
    '/privacypolicy': 'cookiesAndPrivacyPolicy',
    '/quickshop': 'quickshop',
    '/search': 'searchResults',
    '/secure/checkout/complete': 'checkoutOrderConfirmation',
    '/secure/checkout/delivery': 'checkoutDeliveryOptions',
    '/secure/checkout/delivery/intlChangeLocalShop': 'InternationalLocalShopSearch',
    '/secure/checkout/legal/creditagreement': 'checkoutCreditSignUpSECCICreditAgreement',
    '/secure/checkout/legal/importantinformation': 'checkoutCreditSignUpSECCIImportantInformation',
    '/secure/checkout/legal/precontractagreement': 'checkoutCreditSignUpSECCIPreContractAgreement',
    '/secure/checkout/payment': 'checkoutWaysToPay',
    '/secure/checkout/payment/card': 'checkoutCardPaymentCheckout',
    '/secure/checkout/payment/giftcard': 'checkoutGiftCardEvoucherPayment',
    '/secure/checkout/payment/securitycheck': 'checkoutOnePennyAuth',
    '/shop': 'productListPage',
    '/shoppingbag': 'shoppingBag',
    '/site-map': 'sitemap',
    '/stores': 'storeLocator',
    '/terms': 'termsAndConditions',
    '/women': 'womenLandingPage',
});

var getMvcPageType = function () { var _a; return (_a = window === null || window === void 0 ? void 0 : window.platmodflags) === null || _a === void 0 ? void 0 : _a.gtmPageType; };

var getPageType = function (siteUrl) {
    var url = window.location.href;
    var urlToTest = url.replace(siteUrl, "");
    var existingPageType = PAGE_TYPES[urlToTest];
    if (existingPageType) {
        return existingPageType;
    }
    switch (true) {
        case url === siteUrl:
            return "homePage";
        case urlToTest.includes("/sale/search") || urlToTest.includes("/clearance/search"):
            return "sale";
        case urlToTest.includes("/secure/checkout/delivery/home") || urlToTest.includes("/secure/checkout/delivery/choosehomeaddress"):
            return "checkoutHomeDelivery";
        case urlToTest.includes("/secure/checkout/delivery/store") || urlToTest.includes("/storesearch"):
            return "checkoutStoreCollection";
        case urlToTest.includes("/secure/checkout/delivery/dpdhome"):
            return "checkoutDpdHome";
        default: {
            var foundMatch = Object.entries(PAGE_TYPES).find(function (_a) {
                var match = _a[0];
                return match !== "/" && urlToTest.includes(match);
            });
            if (foundMatch) {
                return foundMatch[1];
            }
        }
    }
    return getMvcPageType();
};

exports.getPageType = getPageType;
