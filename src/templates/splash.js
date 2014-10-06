var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"splash\"><h1 class=\"splash-subhead\">{{date}}</h1><h1 class=\"splash-head\">{{scoreAverage}}</h1><p class=\"splash-subhead covers\"></p><p></p></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;