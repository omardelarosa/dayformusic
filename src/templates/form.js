var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5\"><img alt=\"File Icons\" width=\"300\" src=\"img/common/file-icons.png\" class=\"pure-img-responsive\"/></div><div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-3-5\"><h2 class=\"content-head is-center\">Sign Up</h2><div class=\"l-box-lrg pure-u-1 pure-u-md-2-5\"><form action=\"#\" class=\"pure-form pure-form-stacked\"><fieldset><label for=\"first_name\">Your First Name</label><input id=\"first_name\" type=\"text\" placeholder=\"Your First Name\"/><label for=\"last_name\">Your Last Name</label><input id=\"last_name\" type=\"text\" placeholder=\"Your Last Name\"/><label for=\"email\">Your Email</label><input id=\"email\" type=\"email\" placeholder=\"Your Email\"/><label for=\"score_threshold\">Your Minimum Score Threshold</label><input id=\"password\" type=\"text\" placeholder=\"0.0 to 10.0 -- this is the lowest scoring review you wish to be notified about\"/><button type=\"submit\" class=\"pure-button\">Subscribe</button></fieldset></form></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;