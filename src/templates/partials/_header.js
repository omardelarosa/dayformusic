var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"home-menu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed\"><a href=\"#\" class=\"pure-menu-heading\">Day For Music</a><ul><li class=\"pure-menu-selected\"><a href=\"#day\">Today</a></li><li><a href=\"#years\">Yesterday</a></li><li><a href=\"#subscribe\">Subscribe</a></li></ul></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;