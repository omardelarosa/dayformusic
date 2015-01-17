var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<span class=\"album-meta-gauge\"></span><p class=\"album-meta-cover\"></p><h3 class=\"album-meta-title\">\"{{title}}\"</h3><p class=\"album-meta-artist\">by {{artist}}</p>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;