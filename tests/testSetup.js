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
process.env.CLIENT_ID = 'AAAAAAA';
process.env.CLIENT_SECRET = 'BBBBBBB';

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
require('babel-register')();
const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document']; global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = { userAgent: 'node.js' };
