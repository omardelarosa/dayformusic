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
  this.averages = new Averages();

  this.main_view = new HomeView.Body({
    day: this.day,
  });

  this.day.fetch({
    success: function(){
      self.averages.fetch({
      success: function(data) {
          console.log("AVERAGES", data);
        }
      });
    }
  });

  this.main_view.render();

}

App.prototype.getAveragesByYear = function() {
  if (!this.averages) { return {}; }
  return this.averages.groupBy(function(a){
    return a.attributes._id.slice(0, 4);
  }) 
};

module.exports = App;