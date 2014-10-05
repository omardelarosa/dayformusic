var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"content\"><h2 class=\"content-head is-center\">Sign Up</h2><div class=\"pure-g\"><div class=\"l-box-lrg pure-u-1 pure-u-md-2-5\"><form class=\"pure-form pure-form-stacked\"><fieldset><label for=\"name\">Your Name</label><input id=\"name\" type=\"text\" placeholder=\"Your Name\"/><label for=\"email\">Your Email</label><input id=\"email\" type=\"email\" placeholder=\"Your Email\"/><label for=\"password\">Your Password</label><input id=\"password\" type=\"password\" placeholder=\"Your Password\"/><button type=\"submit\" class=\"pure-button\">Sign Up</button></fieldset></form></div><div class=\"l-box-lrg pure-u-1 pure-u-md-3-5\"><h4>Subscribe</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat.</p><h4>More Information</h4><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.</p></div></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;