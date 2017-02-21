if (process.env.CURRENT_FILE) {
  console.log('CURRENT_FILE', process.env.CURRENT_FILE);
}

process.env.jsdom = true;

require('ts-node/register');

var jsdom = require('jsdom')

var document = jsdom.jsdom('<!doctype html><html><head><title>Mocha Testing Page</title></head><body></body></html>');

var window = document.defaultView;

global.document = document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;
global.Node = window.Node;


require('core-js/es6');
require('core-js/es6/promise');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/jasmine-patch');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

global.window = window;


var fs = require('fs');

require.extensions['.json'] = function (module, filename) {
  module.exports = JSON.parse(fs.readFileSync(filename, 'utf8'));
};

require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.scss'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.css'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
