// This file is written in ES5 since it's not transpiled by Babel.
// This file does the following:
// 1. Sets Node environment variable
// 2. Registers babel for transpiling our code for testing
// 3. Disables Webpack-specific features that Mocha doesn't understand.
// 4. Requires jsdom so we can test via an in-memory DOM in Node
// 5. Sets up global vars that mimic a browser.

/* eslint-disable no-var*/

/* This setting assures the .babelrc dev config (which includes
 hot module reloading code) doesn't apply for tests.
 But also, we don't want to set it to production here for
 two reasons:
 1. You won't see any PropType validation warnings when
 code is running in prod mode.
 2. Tests will not display detailed error messages
 when running against production version code
 */
process.env.NODE_ENV = 'test';
process.env.BASE_APP = 'http://localhost:3001/';
process.env.SPOTIFY_WEB_API_AUTH_HOST ='https://accounts.spotify.com/';
process.env.SPOTIFY_WEB_API_HOST = 'https://api.spotify.com/v1/';
process.env.CLIENT_ID = '4a1a2468c80f4ea09ed416f81c0fadf9';
process.env.CLIENT_SECRET = '1a15fe6ce40a4367b02662f1fdbe9f08';

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')();

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = function () {return null;};
require.extensions['.png'] = function () {return null;};
require.extensions['.jpg'] = function () {return null;};

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document', 'localStorage'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
  exposedProperties.push(property);
  global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.localStorage = { };

documentRef = document;  //eslint-disable-line no-undef
