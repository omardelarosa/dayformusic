var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"home-menu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed\"><a href=\"#\" class=\"pure-menu-heading\">Pitchfork Metrics</a><ul class=\"pure-u-1-3\"><li class=\"pure-u-1-3 pure-menu another-day-menu\"><input type=\"text\" class=\"date-field pure-u-1-1\"/></li><li class=\"pure-menu pure-menu-selected pure-u-1-3\"><a href=\"#\" class=\"latest-link pure-u-1-1\">Latest</a></li><li class=\"pure-menu\"><a href=\"#subscribe\" class=\"pure-u-1-1\">Subscribe</a></li></ul></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;