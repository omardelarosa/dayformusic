var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"home-menu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed\"><a href=\"#\" class=\"pure-menu-heading\">Pitchfork Metrics</a><ul class=\"pure-u-lg-1-1\"><li class=\"pure-menu-selected pure-u-lg-1-6\"><a href=\"#day\">Today</a></li><li class=\"pure-u-lg-1-6\"><input type=\"text\" placeholder=\"Another Day\" id=\"date-picker\" class=\"date-picker\"/><button id=\"choose-date\"></button></li><li><a href=\"#subscribe\" class=\"pure-u-lg-1-6\">Subscribe</a></li></ul></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;