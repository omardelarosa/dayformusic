var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<a class=\"year-button pure-button\">{{year}}</a>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;