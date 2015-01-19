var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"home-menu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed\"><a href=\"#\" class=\"pure-menu-heading\">Pitchfork Metrics</a><ul class=\"pure-u-lg-1-1\"><li class=\"pure-menu pure-menu-selected pure-u-lg-1-6\"><a href=\"#\" class=\"latest-link\">Latest</a></li><li class=\"pure-u-lg-1-6 pure-menu another-day-menu\"><input type=\"text\" placeholder=\"ex. 2013-04-01\" class=\"date-field\"/></li><li class=\"pure-menu\"><a href=\"#subscribe\" class=\"pure-u-lg-1-6\">Subscribe</a></li></ul></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;