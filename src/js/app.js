var $ = require("jquery");
var Backbone = require('backbone');
var HomeView = require('./views/home');
var bodyTemplate = require('../templates/body');
var Day = require('./collections/day');
var Averages = require('./collections/averages');
var Artists = require('./collections/artists');
var Reviewers = require('./collections/reviewers');
_ = require('lodash');

Backbone.$ = $;

function App (opts) {

  var data = window.__dataBundle;
  debugger
  // initialize
  this.day = opts.day;
  this.day.averages = new Averages();
  this.day.reviewers = new Reviewers();
  this.day.artists = new Artists();

  this.main_view = new HomeView.Body({
    day: this.day,
  });

  this.main_view.render();
  
  // preloaded object, generated nightly
  this.day.hasLoaded = true;
  this.day.add(data["latest"]);
  this.day.trigger('daySet');
  this.day.averages.add(data["averages"]);
  this.setAveragesByYear();
  this.day.trigger('yearsSet');
  this.day.artists.add(data["artists"]);
  this.day.trigger('artistsSet');
  this.day.reviewers.add(data["reviewers"]);
  this.day.trigger('reviewersSet');
  // note, this is just a normal array
  this.day.artistsList = data["artistsList"].map(function(e){ return e._id; });
  this.day.trigger('artistsListSet');

}

App.prototype.setAveragesByYear = function() {
  if (!this.day || !this.day.averages) { return {}; }
  var years = this.day.averages.groupBy(function(a){
    return a.attributes._id.slice(0, 4);
  });
  this.day.years = years;
  this.day.descendingYears = _.sortBy(Object.keys(this.day.years), function(y){ return parseInt(y); }).reverse();

  return years;
};

module.exports = App;
