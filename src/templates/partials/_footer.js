var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"footer l-box is-center\">View the source of this layout to learn more. Made with love by the YUI Team.</div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;