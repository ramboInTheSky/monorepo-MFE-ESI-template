'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Rx = require('rxjs');
var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _a;
var hasOwnProp = {}.hasOwnProperty;
if (typeof window !== "undefined") {
    window.subjects = (_a = window.subjects) !== null && _a !== void 0 ? _a : {
        setupEvent: function (eventName) {
            if (!window.subjects[eventName]) {
                window.subjects[eventName] = new Rx.ReplaySubject(1);
            }
        }
    };
}
var Emitter = (function () {
    function Emitter() {
    }
    Object.defineProperty(Emitter, "Instance", {
        get: function () {
            if (!this.instance)
                this.instance = new this();
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    Emitter.prototype.createName = function (name) {
        return "$ " + name;
    };
    Emitter.prototype.emit = function (name, data) {
        var fnName = this.createName(name);
        window.subjects[fnName] || (window.subjects[fnName] = new Rx.ReplaySubject(1));
        window.subjects[fnName].next(data);
    };
    Emitter.prototype.listen = function (name, handler) {
        var fnName = this.createName(name);
        window.subjects[fnName] || (window.subjects[fnName] = new Rx.ReplaySubject(1));
        return window.subjects[fnName].subscribe(handler);
    };
    Emitter.prototype.dispose = function () {
        var subjects = window.subjects;
        for (var prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }
        window.subjects = {};
    };
    return Emitter;
}());
var Emitter$1 = Emitter.Instance;

var CommonESB = (function () {
    function CommonESB() {
        this.subscriptions = {};
    }
    CommonESB.prototype.PublishData = function (event, data) {
        Emitter$1.emit(event, data);
    };
    CommonESB.prototype.SubscribeToEvent = function (event, cb) {
        var subscription = Emitter$1.listen(event, cb);
        if (event in this.subscriptions)
            throw new Error("A subscription already exists for event: " + event);
        this.subscriptions[event] = subscription;
        return {
            subscription: subscription,
        };
    };
    CommonESB.prototype.UnsubscribeAll = function () {
        var _this = this;
        try {
            Object.keys(this.subscriptions).forEach(function (key) {
                _this.subscriptions[key].unsubscribe();
                delete _this.subscriptions[key];
            });
        }
        catch (_a) {
            throw new Error("An error occurred unsubscribing from event");
        }
    };
    return CommonESB;
}());

var Events;
(function (Events) {
    Events["SEARCH"] = "SEARCH";
    Events["GET_BAG"] = "GET_BAG";
    Events["SHOPPING_BAG_GET"] = "SHOPPING_BAG_GET";
    Events["SHOPPING_BAG_GET_CALLBACK"] = "SHOPPING_BAG_GET_CALLBACK";
    Events["SHOPPING_BAG_REMOVE"] = "SHOPPING_BAG_REMOVE";
    Events["SHOPPING_BAG_REMOVE_CALLBACK"] = "SHOPPING_BAG_REMOVE_CALLBACK";
    Events["SHOPPING_BAG_ADD"] = "SHOPPING_BAG_ADD";
    Events["SHOPPING_BAG_ADD_CALLBACK"] = "SHOPPING_BAG_ADD_CALLBACK";
    Events["SHOPPING_BAG_ADD_CIST"] = "SHOPPING_BAG_ADD_CIST";
    Events["SHOPPING_BAG_ADD_CIST_CALLBACK"] = "SHOPPING_BAG_ADD_CIST_CALLBACK";
    Events["SHOPPING_BAG_ADD_MULTIPLE"] = "SHOPPING_BAG_ADD_MULTIPLE";
    Events["SHOPPING_BAG_ADD_MULTIPLE_CALLBACK"] = "SHOPPING_BAG_ADD_MULTIPLE_CALLBACK";
    Events["SHOPPING_BAG_ADD_WARRANTY"] = "SHOPPING_BAG_ADD_WARRANTY";
    Events["SHOPPING_BAG_ADD_WARRANTY_CALLBACK"] = "SHOPPING_BAG_ADD_WARRANTY_CALLBACK";
    Events["SHOPPING_BAG_ADD_LINKED_ITEM"] = "SHOPPING_BAG_ADD_LINKED_ITEM";
    Events["SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK"] = "SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK";
    Events["SHOPPING_BAG_UPDATE_SIZE"] = "SHOPPING_BAG_UPDATE_SIZE";
    Events["SHOPPING_BAG_UPDATE_SIZE_CALLBACK"] = "SHOPPING_BAG_UPDATE_SIZE_CALLBACK";
    Events["SHOPPING_BAG_UPDATE_QUANTITY"] = "SHOPPING_BAG_UPDATE_QUANTITY";
    Events["SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK"] = "SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK";
    Events["SHOPPING_BAG_ADD_VOUCHER"] = "SHOPPING_BAG_ADD_VOUCHER";
    Events["SHOPPING_BAG_ADD_VOUCHER_CALLBACK"] = "SHOPPING_BAG_ADD_VOUCHER_CALLBACK";
    Events["SHOPPING_BAG_ADD_EVOUCHER"] = "SHOPPING_BAG_ADD_EVOUCHER";
    Events["SHOPPING_BAG_ADD_EVOUCHER_CALLBACK"] = "SHOPPING_BAG_ADD_EVOUCHER_CALLBACK";
    Events["FAVOURITES_GET"] = "FAVOURITES_GET";
    Events["FAVOURITES_GET_CALLBACK"] = "FAVOURITES_GET_CALLBACK";
    Events["FAVOURITES_ADD"] = "FAVOURITES_ADD";
    Events["FAVOURITES_ADD_CALLBACK"] = "FAVOURITES_ADD_CALLBACK";
    Events["FAVOURITES_REMOVE"] = "FAVOURITES_REMOVE";
    Events["FAVOURITES_REMOVE_CALLBACK"] = "FAVOURITES_REMOVE_CALLBACK";
    Events["VISITOR_TOKEN_GET"] = "VISITOR_TOKEN_GET";
    Events["VISITOR_TOKEN_GET_CALLBACK"] = "VISITOR_TOKEN_GET_CALLBACK";
    Events["VISITOR_TOKEN_UPGRADE"] = "VISITOR_TOKEN_UPGRADE";
    Events["VISITOR_TOKEN_CLEAR"] = "VISITOR_TOKEN_CLEAR";
    Events["VISITOR_TOKEN_CLEAR_CALLBACK"] = "VISITOR_TOKEN_CLEAR_CALLBACK";
    Events["COUNTRY_SELECTOR_OPEN"] = "COUNTRY_SELECTOR_OPEN";
    Events["COUNTRY_SELECTOR_CLOSED"] = "COUNTRY_SELECTOR_CLOSED";
    Events["COUNTRY_SELECTOR_REDIRECT"] = "COUNTRY_SELECTOR_REDIRECT";
    Events["COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE"] = "COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE";
    Events["PRODUCT_SUMMARY_HYDRATE"] = "PRODUCT_SUMMARY_HYDRATE";
    Events["PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER"] = "PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER";
    Events["PRODUCT_SUMMARY_TRACK_PAGE"] = "PRODUCT_SUMMARY_TRACK_PAGE";
    Events["PLP_ADD_PRODUCTS_TO_MONETATE"] = "PLP_ADD_PRODUCTS_TO_MONETATE";
    Events["SEARCH_LANDING_BLOOMREACH_CATEGORY"] = "SEARCH_LANDING_BLOOMREACH_CATEGORY";
    Events["MODALS_CLOSE"] = "MODALS_CLOSE";
    Events["TRACK_EVENT"] = "TRACK_EVENT";
    Events["TRACK_SITE_DETAILS_EVENT"] = "TRACK_SITE_DETAILS_EVENT";
})(Events || (Events = {}));
var Events$1 = Events;

var SearchESB = (function (_super) {
    __extends(SearchESB, _super);
    function SearchESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchESB.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SEARCH, data);
    };
    SearchESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SEARCH, callback);
    };
    return SearchESB;
}(CommonESB));

var GetFavourites = (function (_super) {
    __extends(GetFavourites, _super);
    function GetFavourites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetFavourites.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.FAVOURITES_GET);
    };
    GetFavourites.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.FAVOURITES_GET, callback);
    };
    return GetFavourites;
}(CommonESB));
var GetFavouritesCallback = (function (_super) {
    __extends(GetFavouritesCallback, _super);
    function GetFavouritesCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetFavouritesCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.FAVOURITES_GET_CALLBACK, data);
    };
    GetFavouritesCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.FAVOURITES_GET_CALLBACK, callback);
    };
    return GetFavouritesCallback;
}(CommonESB));

var AddFavourites = (function (_super) {
    __extends(AddFavourites, _super);
    function AddFavourites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddFavourites.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.FAVOURITES_ADD, data);
    };
    AddFavourites.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.FAVOURITES_ADD, callback);
    };
    return AddFavourites;
}(CommonESB));
var AddFavouritesCallback = (function (_super) {
    __extends(AddFavouritesCallback, _super);
    function AddFavouritesCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddFavouritesCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.FAVOURITES_ADD_CALLBACK, data);
    };
    AddFavouritesCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.FAVOURITES_ADD_CALLBACK, callback);
    };
    return AddFavouritesCallback;
}(CommonESB));

var RemoveFavourites = (function (_super) {
    __extends(RemoveFavourites, _super);
    function RemoveFavourites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveFavourites.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.FAVOURITES_REMOVE, data);
    };
    RemoveFavourites.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.FAVOURITES_REMOVE, callback);
    };
    return RemoveFavourites;
}(CommonESB));
var RemoveFavouritesCallback = (function (_super) {
    __extends(RemoveFavouritesCallback, _super);
    function RemoveFavouritesCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveFavouritesCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.FAVOURITES_REMOVE_CALLBACK, data);
    };
    RemoveFavouritesCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.FAVOURITES_REMOVE_CALLBACK, callback);
    };
    return RemoveFavouritesCallback;
}(CommonESB));

var PageLandingESB = (function (_super) {
    __extends(PageLandingESB, _super);
    function PageLandingESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageLandingESB.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SEARCH_LANDING_BLOOMREACH_CATEGORY, data);
    };
    PageLandingESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SEARCH_LANDING_BLOOMREACH_CATEGORY, callback);
    };
    return PageLandingESB;
}(CommonESB));

var GetBag = (function (_super) {
    __extends(GetBag, _super);
    function GetBag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetBag.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_GET, data);
    };
    GetBag.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_GET, callback);
    };
    return GetBag;
}(CommonESB));
var GetBagCallback = (function (_super) {
    __extends(GetBagCallback, _super);
    function GetBagCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetBagCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_GET_CALLBACK, data);
    };
    GetBagCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_GET_CALLBACK, callback);
    };
    return GetBagCallback;
}(CommonESB));

var AddBag = (function (_super) {
    __extends(AddBag, _super);
    function AddBag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddBag.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD, data);
    };
    AddBag.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD, callback);
    };
    return AddBag;
}(CommonESB));
var AddBagCallback = (function (_super) {
    __extends(AddBagCallback, _super);
    function AddBagCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddBagCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_CALLBACK, data);
    };
    AddBagCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_CALLBACK, callback);
    };
    return AddBagCallback;
}(CommonESB));

var AddCistBag = (function (_super) {
    __extends(AddCistBag, _super);
    function AddCistBag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddCistBag.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_CIST, data);
    };
    AddCistBag.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_CIST, callback);
    };
    return AddCistBag;
}(CommonESB));
var AddCistBagCallback = (function (_super) {
    __extends(AddCistBagCallback, _super);
    function AddCistBagCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddCistBagCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_CIST_CALLBACK, data);
    };
    AddCistBagCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_CIST_CALLBACK, callback);
    };
    return AddCistBagCallback;
}(CommonESB));

var AddEVoucher = (function (_super) {
    __extends(AddEVoucher, _super);
    function AddEVoucher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddEVoucher.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_EVOUCHER, data);
    };
    AddEVoucher.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_EVOUCHER, callback);
    };
    return AddEVoucher;
}(CommonESB));
var AddEVoucherCallback = (function (_super) {
    __extends(AddEVoucherCallback, _super);
    function AddEVoucherCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddEVoucherCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_EVOUCHER_CALLBACK, data);
    };
    AddEVoucherCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_EVOUCHER_CALLBACK, callback);
    };
    return AddEVoucherCallback;
}(CommonESB));

var AddLinkedItem = (function (_super) {
    __extends(AddLinkedItem, _super);
    function AddLinkedItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddLinkedItem.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_LINKED_ITEM, data);
    };
    AddLinkedItem.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_LINKED_ITEM, callback);
    };
    return AddLinkedItem;
}(CommonESB));
var AddLinkedItemCallback = (function (_super) {
    __extends(AddLinkedItemCallback, _super);
    function AddLinkedItemCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddLinkedItemCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK, data);
    };
    AddLinkedItemCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK, callback);
    };
    return AddLinkedItemCallback;
}(CommonESB));

var AddMultiple = (function (_super) {
    __extends(AddMultiple, _super);
    function AddMultiple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddMultiple.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_MULTIPLE, data);
    };
    AddMultiple.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_MULTIPLE, callback);
    };
    return AddMultiple;
}(CommonESB));
var AddMultipleCallback = (function (_super) {
    __extends(AddMultipleCallback, _super);
    function AddMultipleCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddMultipleCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_MULTIPLE_CALLBACK, data);
    };
    AddMultipleCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_MULTIPLE_CALLBACK, callback);
    };
    return AddMultipleCallback;
}(CommonESB));

var AddVoucher = (function (_super) {
    __extends(AddVoucher, _super);
    function AddVoucher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddVoucher.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_VOUCHER, data);
    };
    AddVoucher.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_VOUCHER, callback);
    };
    return AddVoucher;
}(CommonESB));
var AddVoucherCallback = (function (_super) {
    __extends(AddVoucherCallback, _super);
    function AddVoucherCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddVoucherCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_VOUCHER_CALLBACK, data);
    };
    AddVoucherCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_VOUCHER_CALLBACK, callback);
    };
    return AddVoucherCallback;
}(CommonESB));

var AddWarranty = (function (_super) {
    __extends(AddWarranty, _super);
    function AddWarranty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddWarranty.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_WARRANTY, data);
    };
    AddWarranty.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_WARRANTY, callback);
    };
    return AddWarranty;
}(CommonESB));
var AddWarrantyCallback = (function (_super) {
    __extends(AddWarrantyCallback, _super);
    function AddWarrantyCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddWarrantyCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_ADD_WARRANTY_CALLBACK, data);
    };
    AddWarrantyCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_ADD_WARRANTY_CALLBACK, callback);
    };
    return AddWarrantyCallback;
}(CommonESB));

var RemoveBag = (function (_super) {
    __extends(RemoveBag, _super);
    function RemoveBag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveBag.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_REMOVE, data);
    };
    RemoveBag.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_REMOVE, callback);
    };
    return RemoveBag;
}(CommonESB));
var RemoveBagCallback = (function (_super) {
    __extends(RemoveBagCallback, _super);
    function RemoveBagCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveBagCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_REMOVE_CALLBACK, data);
    };
    RemoveBagCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_REMOVE_CALLBACK, callback);
    };
    return RemoveBagCallback;
}(CommonESB));

var UpdateQuantity = (function (_super) {
    __extends(UpdateQuantity, _super);
    function UpdateQuantity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateQuantity.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_UPDATE_QUANTITY, data);
    };
    UpdateQuantity.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_UPDATE_QUANTITY, callback);
    };
    return UpdateQuantity;
}(CommonESB));
var UpdateQuantityCallback = (function (_super) {
    __extends(UpdateQuantityCallback, _super);
    function UpdateQuantityCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateQuantityCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK, data);
    };
    UpdateQuantityCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK, callback);
    };
    return UpdateQuantityCallback;
}(CommonESB));

var UpdateSize = (function (_super) {
    __extends(UpdateSize, _super);
    function UpdateSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateSize.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_UPDATE_SIZE, data);
    };
    UpdateSize.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_UPDATE_SIZE, callback);
    };
    return UpdateSize;
}(CommonESB));
var UpdateSizeCallback = (function (_super) {
    __extends(UpdateSizeCallback, _super);
    function UpdateSizeCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateSizeCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.SHOPPING_BAG_UPDATE_SIZE_CALLBACK, data);
    };
    UpdateSizeCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.SHOPPING_BAG_UPDATE_SIZE_CALLBACK, callback);
    };
    return UpdateSizeCallback;
}(CommonESB));

var GetVisitorToken = (function (_super) {
    __extends(GetVisitorToken, _super);
    function GetVisitorToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetVisitorToken.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.VISITOR_TOKEN_GET, data);
    };
    GetVisitorToken.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.VISITOR_TOKEN_GET, callback);
    };
    return GetVisitorToken;
}(CommonESB));
var GetVisitorTokenCallback = (function (_super) {
    __extends(GetVisitorTokenCallback, _super);
    function GetVisitorTokenCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetVisitorTokenCallback.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.VISITOR_TOKEN_GET_CALLBACK, data);
    };
    GetVisitorTokenCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.VISITOR_TOKEN_GET_CALLBACK, callback);
    };
    return GetVisitorTokenCallback;
}(CommonESB));
var ClearVisitorTokenCallback = (function (_super) {
    __extends(ClearVisitorTokenCallback, _super);
    function ClearVisitorTokenCallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClearVisitorTokenCallback.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.VISITOR_TOKEN_CLEAR_CALLBACK);
    };
    ClearVisitorTokenCallback.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.VISITOR_TOKEN_CLEAR_CALLBACK, callback);
    };
    return ClearVisitorTokenCallback;
}(CommonESB));

var UpgradeVisitorToken = (function (_super) {
    __extends(UpgradeVisitorToken, _super);
    function UpgradeVisitorToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpgradeVisitorToken.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.VISITOR_TOKEN_UPGRADE, data);
    };
    UpgradeVisitorToken.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.VISITOR_TOKEN_UPGRADE, callback);
    };
    return UpgradeVisitorToken;
}(CommonESB));

var ClearVisitorToken = (function (_super) {
    __extends(ClearVisitorToken, _super);
    function ClearVisitorToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClearVisitorToken.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.VISITOR_TOKEN_CLEAR);
    };
    ClearVisitorToken.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.VISITOR_TOKEN_CLEAR, callback);
    };
    return ClearVisitorToken;
}(CommonESB));

var CountrySelectorOpenESB = (function (_super) {
    __extends(CountrySelectorOpenESB, _super);
    function CountrySelectorOpenESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountrySelectorOpenESB.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.COUNTRY_SELECTOR_OPEN, data);
    };
    CountrySelectorOpenESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.COUNTRY_SELECTOR_OPEN, callback);
    };
    return CountrySelectorOpenESB;
}(CommonESB));

var CountrySelectorClosedESB = (function (_super) {
    __extends(CountrySelectorClosedESB, _super);
    function CountrySelectorClosedESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountrySelectorClosedESB.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.COUNTRY_SELECTOR_CLOSED);
    };
    CountrySelectorClosedESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.COUNTRY_SELECTOR_CLOSED, callback);
    };
    return CountrySelectorClosedESB;
}(CommonESB));

var CountrySelectorRedirectESB = (function (_super) {
    __extends(CountrySelectorRedirectESB, _super);
    function CountrySelectorRedirectESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountrySelectorRedirectESB.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.COUNTRY_SELECTOR_REDIRECT);
    };
    CountrySelectorRedirectESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.COUNTRY_SELECTOR_REDIRECT, callback);
    };
    return CountrySelectorRedirectESB;
}(CommonESB));

var CountrySelectorRedirectToAlternativeLanguageESB = (function (_super) {
    __extends(CountrySelectorRedirectToAlternativeLanguageESB, _super);
    function CountrySelectorRedirectToAlternativeLanguageESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountrySelectorRedirectToAlternativeLanguageESB.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE);
    };
    CountrySelectorRedirectToAlternativeLanguageESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.COUNTRY_SELECTOR_REDIRECT_TO_ALTERNATIVE_LANGUAGE, callback);
    };
    return CountrySelectorRedirectToAlternativeLanguageESB;
}(CommonESB));

var HydrateProductSummaryESB = (function (_super) {
    __extends(HydrateProductSummaryESB, _super);
    function HydrateProductSummaryESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HydrateProductSummaryESB.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.PRODUCT_SUMMARY_HYDRATE);
    };
    HydrateProductSummaryESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.PRODUCT_SUMMARY_HYDRATE, callback);
    };
    return HydrateProductSummaryESB;
}(CommonESB));

var ProductSummaryToDataLayer = (function (_super) {
    __extends(ProductSummaryToDataLayer, _super);
    function ProductSummaryToDataLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductSummaryToDataLayer.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER, data);
    };
    ProductSummaryToDataLayer.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER, callback);
    };
    return ProductSummaryToDataLayer;
}(CommonESB));

var ProductSummaryTrackPage = (function (_super) {
    __extends(ProductSummaryTrackPage, _super);
    function ProductSummaryTrackPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductSummaryTrackPage.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.PRODUCT_SUMMARY_TRACK_PAGE, data);
    };
    ProductSummaryTrackPage.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.PRODUCT_SUMMARY_TRACK_PAGE, callback);
    };
    return ProductSummaryTrackPage;
}(CommonESB));

var AddProductsToMonetate = (function (_super) {
    __extends(AddProductsToMonetate, _super);
    function AddProductsToMonetate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddProductsToMonetate.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.PLP_ADD_PRODUCTS_TO_MONETATE, data);
    };
    AddProductsToMonetate.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.PLP_ADD_PRODUCTS_TO_MONETATE, callback);
    };
    return AddProductsToMonetate;
}(CommonESB));

var ModalsCloseESB = (function (_super) {
    __extends(ModalsCloseESB, _super);
    function ModalsCloseESB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalsCloseESB.prototype.publish = function () {
        _super.prototype.PublishData.call(this, Events$1.MODALS_CLOSE);
    };
    ModalsCloseESB.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.MODALS_CLOSE, callback);
    };
    return ModalsCloseESB;
}(CommonESB));

var TrackEvent = (function (_super) {
    __extends(TrackEvent, _super);
    function TrackEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrackEvent.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.TRACK_EVENT, data);
    };
    TrackEvent.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.TRACK_EVENT, callback);
    };
    return TrackEvent;
}(CommonESB));

var TrackSiteDetailsEvent = (function (_super) {
    __extends(TrackSiteDetailsEvent, _super);
    function TrackSiteDetailsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrackSiteDetailsEvent.prototype.publish = function (data) {
        _super.prototype.PublishData.call(this, Events$1.TRACK_SITE_DETAILS_EVENT, data);
    };
    TrackSiteDetailsEvent.prototype.subscribe = function (callback) {
        return _super.prototype.SubscribeToEvent.call(this, Events$1.TRACK_SITE_DETAILS_EVENT, callback);
    };
    return TrackSiteDetailsEvent;
}(CommonESB));

var useCommonObservable = function (esb, callback) {
    return react.useEffect(function () {
        var subscription = esb.subscribe(callback).subscription;
        return function () {
            subscription.unsubscribe();
        };
    }, []);
};

var useSearchObservable = function (callback) {
    return useCommonObservable(new SearchESB(), callback);
};

var useFavouritesGetCallbackObservable = function (callback) {
    return useCommonObservable(new GetFavouritesCallback(), callback);
};
var useFavouritesAddCallbackObservable = function (callback) {
    return useCommonObservable(new AddFavouritesCallback(), callback);
};
var useFavouritesRemoveCallbackObservable = function (callback) {
    return useCommonObservable(new RemoveFavouritesCallback(), callback);
};

var useShoppingBagGetCallbackObservable = function (callback) {
    return useCommonObservable(new GetBagCallback(), callback);
};
var useShoppingBagAddCallbackObservable = function (callback) {
    return useCommonObservable(new AddBagCallback(), callback);
};
var useShoppingBagAddCistCallbackObservable = function (callback) {
    return useCommonObservable(new AddCistBagCallback(), callback);
};
var useShoppingBagAddEVoucherCallbackObservable = function (callback) {
    return useCommonObservable(new AddEVoucherCallback(), callback);
};
var useShoppingBagAddLinkedItemCallbackObservable = function (callback) {
    return useCommonObservable(new AddLinkedItemCallback(), callback);
};
var useShoppingBagAddMultipleCallbackObservable = function (callback) {
    return useCommonObservable(new AddMultipleCallback(), callback);
};
var useShoppingBagAddWarrantyCallbackObservable = function (callback) {
    return useCommonObservable(new AddWarrantyCallback(), callback);
};
var useShoppingBagRemoveCallbackObservable = function (callback) {
    return useCommonObservable(new RemoveBagCallback(), callback);
};
var useShoppingBagUpdateSizeCallbackObservable = function (callback) {
    return useCommonObservable(new UpdateSizeCallback(), callback);
};
var useShoppingBagUpdateQuantityCallbackObservable = function (callback) {
    return useCommonObservable(new UpdateQuantityCallback(), callback);
};

var useCountrySelectorOpenObservable = function (callback) {
    return useCommonObservable(new CountrySelectorOpenESB(), callback);
};
var useCountrySelectorRedirectToAlternativeLanguageObservable = function (callback) {
    return useCommonObservable(new CountrySelectorRedirectToAlternativeLanguageESB(), callback);
};

var useGetVisitorTokenCallbackObservable = function (callback) {
    return useCommonObservable(new GetVisitorTokenCallback(), callback);
};
var useClearVisitorTokenCallbackObservable = function (callback) {
    return useCommonObservable(new ClearVisitorTokenCallback(), callback);
};

var useProductSummaryHydrateObservable = function (callback) {
    return useCommonObservable(new HydrateProductSummaryESB(), callback);
};

var useModalsCloseObservable = function (callback) {
    return useCommonObservable(new ModalsCloseESB(), callback);
};

exports.AddBag = AddBag;
exports.AddBagCallback = AddBagCallback;
exports.AddCistBag = AddCistBag;
exports.AddCistBagCallback = AddCistBagCallback;
exports.AddEVoucher = AddEVoucher;
exports.AddEVoucherCallback = AddEVoucherCallback;
exports.AddFavourites = AddFavourites;
exports.AddFavouritesCallback = AddFavouritesCallback;
exports.AddLinkedItem = AddLinkedItem;
exports.AddLinkedItemCallback = AddLinkedItemCallback;
exports.AddMultiple = AddMultiple;
exports.AddMultipleCallback = AddMultipleCallback;
exports.AddProductsToMonetate = AddProductsToMonetate;
exports.AddVoucher = AddVoucher;
exports.AddVoucherCallback = AddVoucherCallback;
exports.AddWarranty = AddWarranty;
exports.AddWarrantyCallback = AddWarrantyCallback;
exports.ClearVisitorToken = ClearVisitorToken;
exports.ClearVisitorTokenCallback = ClearVisitorTokenCallback;
exports.CountrySelectorClosedESB = CountrySelectorClosedESB;
exports.CountrySelectorOpenESB = CountrySelectorOpenESB;
exports.CountrySelectorRedirectESB = CountrySelectorRedirectESB;
exports.CountrySelectorRedirectToAlternativeLanguageESB = CountrySelectorRedirectToAlternativeLanguageESB;
exports.GetBag = GetBag;
exports.GetBagCallback = GetBagCallback;
exports.GetFavourites = GetFavourites;
exports.GetFavouritesCallback = GetFavouritesCallback;
exports.GetVisitorToken = GetVisitorToken;
exports.GetVisitorTokenCallback = GetVisitorTokenCallback;
exports.HydrateProductSummaryESB = HydrateProductSummaryESB;
exports.ModalsCloseESB = ModalsCloseESB;
exports.PageLandingESB = PageLandingESB;
exports.ProductSummaryToDataLayer = ProductSummaryToDataLayer;
exports.ProductSummaryTrackPage = ProductSummaryTrackPage;
exports.RemoveBag = RemoveBag;
exports.RemoveBagCallback = RemoveBagCallback;
exports.RemoveFavourites = RemoveFavourites;
exports.RemoveFavouritesCallback = RemoveFavouritesCallback;
exports.SearchESB = SearchESB;
exports.TrackEvent = TrackEvent;
exports.TrackSiteDetailsEvent = TrackSiteDetailsEvent;
exports.UpdateQuantity = UpdateQuantity;
exports.UpdateQuantityCallback = UpdateQuantityCallback;
exports.UpdateSize = UpdateSize;
exports.UpdateSizeCallback = UpdateSizeCallback;
exports.UpgradeVisitorToken = UpgradeVisitorToken;
exports.useClearVisitorTokenCallbackObservable = useClearVisitorTokenCallbackObservable;
exports.useCountrySelectorOpenObservable = useCountrySelectorOpenObservable;
exports.useCountrySelectorRedirectToAlternativeLanguageObservable = useCountrySelectorRedirectToAlternativeLanguageObservable;
exports.useFavouritesAddCallbackObservable = useFavouritesAddCallbackObservable;
exports.useFavouritesGetCallbackObservable = useFavouritesGetCallbackObservable;
exports.useFavouritesRemoveCallbackObservable = useFavouritesRemoveCallbackObservable;
exports.useGetVisitorTokenCallbackObservable = useGetVisitorTokenCallbackObservable;
exports.useModalsCloseObservable = useModalsCloseObservable;
exports.useProductSummaryHydrateObservable = useProductSummaryHydrateObservable;
exports.useSearchObservable = useSearchObservable;
exports.useShoppingBagAddCallbackObservable = useShoppingBagAddCallbackObservable;
exports.useShoppingBagAddCistCallbackObservable = useShoppingBagAddCistCallbackObservable;
exports.useShoppingBagAddEVoucherCallbackObservable = useShoppingBagAddEVoucherCallbackObservable;
exports.useShoppingBagAddLinkedItemCallbackObservable = useShoppingBagAddLinkedItemCallbackObservable;
exports.useShoppingBagAddMultipleCallbackObservable = useShoppingBagAddMultipleCallbackObservable;
exports.useShoppingBagAddWarrantyCallbackObservable = useShoppingBagAddWarrantyCallbackObservable;
exports.useShoppingBagGetCallbackObservable = useShoppingBagGetCallbackObservable;
exports.useShoppingBagRemoveCallbackObservable = useShoppingBagRemoveCallbackObservable;
exports.useShoppingBagUpdateQuantityCallbackObservable = useShoppingBagUpdateQuantityCallbackObservable;
exports.useShoppingBagUpdateSizeCallbackObservable = useShoppingBagUpdateSizeCallbackObservable;
