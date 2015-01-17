var jade = require('jade');
function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<h2 class=\"content-head is-center\">Daily Music Score Average</h2><div class=\"pure-g\"><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-rocket\"></i></h3><div class=\"albums pure-g\"></div></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-rocket\"></i>2014</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-mobile\"></i>2013</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-th-large\"></i>2012</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div><div class=\"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4\"><h3 class=\"content-subhead\"><i class=\"fa fa-check-square-o\"></i>2011</h3><p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p></div></div>");;return buf.join("");
}

/**
 * Export module
 */

module.exports = template;