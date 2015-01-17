var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-rocket\">{{year}}</i></h3><p class=\"year-chart\"></p></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;