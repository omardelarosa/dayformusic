var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5\"><img alt=\"File Icons\" width=\"300\" src=\"img/common/file-icons.png\" class=\"pure-img-responsive\"/></div><div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-3-5\"><h2 class=\"content-head is-center\">Sign Up</h2><div class=\"l-box-lrg pure-u-1 pure-u-md-2-5\"><form class=\"pure-form pure-form-stacked\"><fieldset><label for=\"name\">Your Name</label><input id=\"name\" type=\"text\" placeholder=\"Your Name\"/><label for=\"email\">Your Email</label><input id=\"email\" type=\"email\" placeholder=\"Your Email\"/><label for=\"password\">Your Password</label><input id=\"password\" type=\"password\" placeholder=\"Your Password\"/><button type=\"submit\" class=\"pure-button\">Sign Up</button></fieldset></form></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;