var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<span class=\"year-button\">{{year}}</span>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;