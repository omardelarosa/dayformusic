var $ = require("jquery");
var Backbone = require('backbone');
var HomeView = require('./views/home');
var bodyTemplate = require('../templates/body');
var Day = require('./collections/day');
var Averages = require('./collections/averages');

Backbone.$ = $;

function App (opts) {

  var self = this;

  // initialize
  this.day = opts.day;
  this.day.averages = new Averages();

  this.main_view = new HomeView.Body({
    day: this.day,
  });

  this.day.fetch({
    success: function(){
      console.log("FETCHED DAY")
      self.day.averages.fetch({
      success: function(data) {
          console.log("FETCHED AVERAGES", data);
          self.setAveragesByYear();
        }
      });
    }
  });

  this.main_view.render();

}

App.prototype.setAveragesByYear = function() {
  if (!this.day || !this.day.averages) { return {}; }
  var years = this.day.averages.groupBy(function(a){
    return a.attributes._id.slice(0, 4);
  });
  this.day.years = years;
  return years;
};

module.exports = App;