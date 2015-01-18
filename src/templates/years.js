var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<h2 class=\"content-head is-center\">Daily Music Score Average</h2><div class=\"pure-g\"><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-rocket\"></i></h3><div class=\"albums pure-g\"></div></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 years\"><h3>Daily Averages by Year<div class=\"pure-u-lg-1-1 years-buttons\"></div><div class=\"pure-u-lg-1-1 years-chart\"></div></h3></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;