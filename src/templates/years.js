var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<h2 class=\"content-head is-center\">Daily Music Score Average</h2><div class=\"pure-g\"><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-rocket\"></i>Get Started Quickly</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-mobile\"></i>Responsive Layouts</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-th-large\"></i>Modular</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-check-square-o\"></i>Plays Nice</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;