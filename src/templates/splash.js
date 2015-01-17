var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"splash\"><h1>{{date}}</h1><p class=\"gauge-big\">Loading ...</p></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;