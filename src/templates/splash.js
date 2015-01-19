var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"splash\"><h1 class=\"splash-subhead\">{{date}} <span class=\"caption\"></span></h1><p class=\"gauge-big\">Loading ...</p></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;