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

  var self = this;

  // initialize
  this.day = opts.day;
  this.day.averages = new Averages();
  this.day.reviewers = new Reviewers();
  this.day.artists = new Artists();

  this.main_view = new HomeView.Body({
    day: this.day,
  });

  // TODO: pack this all up into a single query
  // this.day.fetch()
  // .done(function(data){
  //   self.day.trigger('daySet');
  //   self.day.averages.add()
  //     .done(function(data) {
  //       self.setAveragesByYear();
  //       self.day.trigger('yearsSet');
  //       console.log("YEARS SET")
  //     });
  // })

  $.ajax({
    url: '/charts/bundle'
  }).done(function(data){
    self.day.add(data["latest"]);
    self.day.trigger('daySet');
    self.day.averages.add(data["averages"]);
    self.setAveragesByYear();
    self.day.trigger('yearsSet');
    self.day.artists.add(data["artists"]);
    self.day.trigger('artistsSet');
    self.day.reviewers.add(data["reviewers"]);
    self.day.trigger('reviewersSet');
  });

  this.main_view.render();

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