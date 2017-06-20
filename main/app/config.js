/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import Dimensions from 'Dimensions';
var window = Dimensions.get('window');

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

export default {
	// App Details
	appName: 'TUDUBOM',

	// Window Dimensions
	windowHeight: window.height,
	windowWidth: window.width,

	// Grid
	windowWidthHalf: window.width * 0.5,
	windowWidthYhird: window.width * 0.333,
	windowWidthYwoThirds: window.width * 0.666,
	windowWidthQuarter: window.width * 0.25,
	windowWidthThreeQuarters: window.width * 0.75,

	// General Element Dimensions
	navbarHeight: 64,
	statusBarHeight: 22,

	// Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (__DEV__) ? 'asd' : 'asd',

	// Fonts
	baseFont: "OpenSansHebrew-Regular",
	boldFont: "OpenSansHebrew-Bold",
	baseFontSize: 14,

	// Colors
	primaryColor: "#fcb625",
	secondaryColor: "#3fc3ff",
	textColor: "#555",
	borderColor: "#E7E7E7",
}