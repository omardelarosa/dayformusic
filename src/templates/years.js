var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"content\"><h2 class=\"content-head is-center\">Excepteur sint occaecat cupidatat.</h2><div class=\"pure-g\"><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-rocket\"></i>Get Started Quickly</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-mobile\"></i>Responsive Layouts</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-th-large\"></i>Modular</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-check-square-o\"></i>Plays Nice</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div></div></div><div class=\"ribbon l-box-lrg pure-g\"><div class=\"l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5\"><img alt=\"File Icons\" width=\"300\" src=\"img/common/file-icons.png\" class=\"pure-img-responsive\"/></div><div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-3-5\"><h2 class=\"content-head content-head-ribbon\">Laboris nisi ut aliquip.</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor.</p></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;