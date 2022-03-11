'use strict';

var devices = [
	{
		device: "iphone-5",
		orientation: [
			"landscape",
			"portrait"
		],
		type: "mobile"
	},
	{
		device: "iphone-6+",
		orientation: [
			"landscape",
			"portrait"
		],
		type: "mobile"
	},
	{
		device: "ipad-2",
		orientation: [
			"landscape",
			"portrait"
		],
		type: "tablet"
	},
	{
		device: "macbook-13",
		orientation: [
			"landscape",
			"portrait"
		],
		type: "desktop"
	}
];

var gb = {
	territory: "GB",
	language: "en"
};
var saLTR = {
	language: "en",
	territory: "SA",
	siteUrl: "https://abc123.com"
};
var saRTL = {
	language: "ar",
	territory: "SA",
	siteUrl: "https://abc123.com"
};
var settings = {
	gb: gb,
	saLTR: saLTR,
	saRTL: saRTL
};

var index = {devices, settings, realmType: ""};

module.exports = index;
