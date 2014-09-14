var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"header\">header goes hereee</div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;